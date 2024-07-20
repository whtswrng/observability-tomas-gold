import { subDays } from "date-fns";
import { getActiveAlerts } from './active-alerts';
import { getEntities } from '../entities';
import { CpuLoadEventType, getCpuLoadEvents } from '../cpu-load';

jest.mock('../entities', () => ({
  ...jest.requireActual('../entities'),
  getEntities: jest.fn()
}));
jest.mock('../cpu-load', () => ({
  ...jest.requireActual('../cpu-load'),
  getCpuLoadEvents: jest.fn(),
}));

describe('getActiveAlerts', () => {
  const mockGetEntities = getEntities as jest.Mock;
  const mockGetCpuLoadEvents = getCpuLoadEvents as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty notifications when there are no entities', async () => {
    mockGetEntities.mockResolvedValue([]);
    mockGetCpuLoadEvents.mockResolvedValue({events: []});

    const result = await getActiveAlerts('fake-jwt');

    expect(result.notifications).toEqual([]);
  });

  it('should return an empty notifications when there are no hosts', async () => {
    mockGetEntities.mockResolvedValue([{ id: '1', type: 'host', name: "My Pc" }]);
    mockGetCpuLoadEvents.mockResolvedValue({events: []});

    const result = await getActiveAlerts('fake-jwt');

    expect(result.notifications).toEqual([]);
  });

  it('should add an alert notification for a host with HeavyLoad event', async () => {
    const host = { id: '1', type: 'host', name: 'Test Host' };
    const cpuLoadEvent = { events: [{ type: CpuLoadEventType.HeavyLoad, startTimestamp: Date.now() }] };

    mockGetEntities.mockResolvedValue([host]);
    mockGetCpuLoadEvents.mockResolvedValue(cpuLoadEvent);

    const result = await getActiveAlerts('fake-jwt');

    expect(result.notifications).toHaveLength(1);
    expect(result.notifications[0]).toEqual({
      type: 'alert',
      message: `Host 'Test Host' is having troubles with CPU load!`,
      entity: host,
    });
  });

  it('should add a recovery notification for a host with Recovered event today', async () => {
    const host = { id: '1', type: 'host', name: 'Test Host' };
    const cpuLoadEvent = { events: [{ type: CpuLoadEventType.Recovered, startTimestamp: Date.now() }] };

    mockGetEntities.mockResolvedValue([host]);
    mockGetCpuLoadEvents.mockResolvedValue(cpuLoadEvent);
    // mockIsEventToday.mockReturnValue(true);

    const result = await getActiveAlerts('fake-jwt');

    expect(result.notifications).toHaveLength(1);
    expect(result.notifications[0]).toEqual({
      type: 'recovery',
      message: `Host 'Test Host' is no longer having issues with CPU load!`,
      entity: host,
    });
  });

  it('should omit a recovery notification for a host with Recovered event yesterday', async () => {
    const host = { id: '1', type: 'host', name: 'Test Host' };

    const now = new Date();
    const oneDayAgo = subDays(now, 1).getTime();
    const cpuLoadEvent = { events: [{ type: CpuLoadEventType.Recovered, startTimestamp: oneDayAgo }] };

    mockGetEntities.mockResolvedValue([host]);
    mockGetCpuLoadEvents.mockResolvedValue(cpuLoadEvent);

    const result = await getActiveAlerts('fake-jwt');

    expect(result.notifications).toEqual([]);
  });
});
