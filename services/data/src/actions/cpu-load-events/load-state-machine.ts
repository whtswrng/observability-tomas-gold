import { HEAVY_LOAD_THRESHOLD_IN_MINUTES, RECOVER_LOAD_THRESHOLD_IN_MINUTES } from "../../config";
import { CpuLoadMetric } from "../metrics";
import { differenceInMinutes } from "date-fns";

interface LoadState {
  handle(data: CpuLoadMetric, transitionTo: (loadState: LoadState) => void): void;
  timestamp: number | undefined;
  type: StateType;
}

enum StateType {
  Idle = "IDLE",
  HeavyLoad = "HEAVY_LOAD",
  Recovered = "RECOVERED",
}

export class LoadStateMachine {
  private currentState: LoadState = instantiateIdle(Date.now());
  private events: Array<any> = [];

  private transitionTo(newState: LoadState) {
    this.currentState = newState;
    if (newState.type === StateType.Idle) return;

    // generate event
    this.events.push({ type: newState.type, startTimestamp: newState.timestamp });
  }

  public handle(data: CpuLoadMetric) {
    this.currentState.handle(data, (newState: LoadState) => this.transitionTo(newState));
  }

  public getEvents() {
    return this.events;
  }
}

function instantiateHeavyLoad(timestamp) {
  return new ExplicitState(
    StateType.HeavyLoad,
    timestamp,
    (load) => load < 1,
    RECOVER_LOAD_THRESHOLD_IN_MINUTES,
    (timestamp) => new Recovered(timestamp)
  );
}

function instantiateIdle(timestamp) {
  return new ExplicitState(StateType.Idle, timestamp, (load) => load > 1, HEAVY_LOAD_THRESHOLD_IN_MINUTES, instantiateHeavyLoad);
}


class ExplicitState implements LoadState {
  private firstOccuredTimestamp: number | undefined;
  private isConditionActivated = false;

  constructor(
    public type: StateType,
    public timestamp: number,
    private transitionLoadCondition: (load: number) => boolean,
    private threshold: number,
    private instantiateNewState: (timestamp: number | undefined) => LoadState
  ) {}

  public handle(data: CpuLoadMetric, transitionTo: (l: LoadState) => void) {
    if (this.transitionLoadCondition(data.load)) {
      if (!this.isConditionActivated) {
        this.isConditionActivated = true;
        this.firstOccuredTimestamp = data.timestamp;
      }
      if (isAboveThreshold(this.firstOccuredTimestamp, data.timestamp, this.threshold)) {
        transitionTo(this.instantiateNewState(this.firstOccuredTimestamp));
      }
    } else {
      // need to reset if we were under heavy load/recovered but now we're not
      if (this.isConditionActivated) {
        this.isConditionActivated = false;
        this.firstOccuredTimestamp = undefined;
      }
    }
  }
}

class Recovered implements LoadState {
  public type = StateType.Recovered;
  constructor(public timestamp: number | undefined) {}
  public handle(data: CpuLoadMetric, transitionTo: (l: LoadState) => void) {
    transitionTo(instantiateIdle(data.timestamp));
  }
}

function isAboveThreshold(startTimestamp: number | undefined, endTimestamp: number, thresholdInMinutes: number): boolean {
  if(! startTimestamp) return false;
  const startDate = new Date(startTimestamp);
  const endDate = new Date(endTimestamp);
  const diffMinutes = differenceInMinutes(endDate, startDate);
  return diffMinutes >= thresholdInMinutes;
}
