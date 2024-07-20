import { HEAVY_LOAD_THRESHOLD_IN_MINUTES, RECOVER_LOAD_THRESHOLD_IN_MINUTES } from "../../config";
import { CpuLoadMetric } from "../metrics";
import { differenceInMinutes } from "date-fns";

interface LoadState {
  handle(data: CpuLoadMetric, StateConstructor: any): void;
  timestamp: number;
  type: StateType;
}

enum StateType {
  Idle = "IDLE",
  HeavyLoad = "HEAVY_LOAD",
  Recovered = "RECOVERED",
}

export class LoadStateMachine {
  private currentState: LoadState = new Idle(Date.now());
  private events: Array<any> = [];

  private transitionTo(newState: LoadState) {
    this.currentState = newState;
    if (newState.type === StateType.Idle) return;

    // generate event
    this.events.push({ type: newState.type, startTimestamp: newState.timestamp });
  }

  public handle(data: CpuLoadMetric) {
    this.currentState.handle(data, (StateConstructor) => this.transitionTo(StateConstructor));
  }

  public getEvents() {
    return this.events;
  }
}

class Idle implements LoadState {
  private firstHeavyLoadTimestamp;
  private isUnderHeavyLoad = false;
  public type = StateType.Idle;

  constructor(public timestamp: number) {}

  public handle(data: CpuLoadMetric, transitionTo) {
    if (data.load > 1) {
      if (!this.isUnderHeavyLoad) {
        this.isUnderHeavyLoad = true;
        this.firstHeavyLoadTimestamp = data.timestamp;
      }
      if (isAboveThreshold(this.firstHeavyLoadTimestamp, data.timestamp, HEAVY_LOAD_THRESHOLD_IN_MINUTES)) {
        transitionTo(new HeavyLoad(this.firstHeavyLoadTimestamp));
      }
    } else {
      // need to reset if we were under heavy load but now we're not
      if (this.isUnderHeavyLoad) {
        this.isUnderHeavyLoad = false;
        this.firstHeavyLoadTimestamp = undefined;
      }
    }
  }
}

class HeavyLoad implements LoadState {
  public type = StateType.HeavyLoad;
  private firstRecoveringTimestamp;
  private isRecovering = false;

  constructor(public timestamp: number) {}
  public handle(data: CpuLoadMetric, transitionTo) {
    if (data.load < 1) {
      if (!this.isRecovering) {
        this.isRecovering = true;
        this.firstRecoveringTimestamp = data.timestamp;
      }
      if (isAboveThreshold(this.firstRecoveringTimestamp, data.timestamp, RECOVER_LOAD_THRESHOLD_IN_MINUTES)) {
        transitionTo(new Recovered(this.firstRecoveringTimestamp));
      }
    } else {
      // need to reset if we were under heavy load but now we're not
      if (this.isRecovering) {
        this.isRecovering = false;
        this.firstRecoveringTimestamp = undefined;
      }
    }
  }
}

class Recovered implements LoadState {
  public type = StateType.Recovered;
  constructor(public timestamp: number) {}
  public handle(data: CpuLoadMetric, transitionTo) {
    transitionTo(new Idle(data.timestamp));
  }
}

function isAboveThreshold(startTimestamp: number, endTimestamp: number, thresholdInMinutes: number): boolean {
  const startDate = new Date(startTimestamp);
  const endDate = new Date(endTimestamp);
  const diffMinutes = differenceInMinutes(endDate, startDate);
  return diffMinutes >= thresholdInMinutes;
}
