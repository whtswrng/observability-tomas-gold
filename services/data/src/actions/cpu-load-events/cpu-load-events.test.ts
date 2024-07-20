import { addMinutes, addSeconds } from "date-fns";
import { getMetrics } from "../metrics"; // Adjust the import path as necessary
import { getCpuLoadEvents } from "./cpu-load-events"; // Adjust the import path as necessary

// Mock the getMetrics function
jest.mock("../metrics", () => ({
  getMetrics: jest.fn(),
}));

describe("getCpuLoadEvents", () => {
  const mockOrgId = "org1";
  const mockUserId = "user1";
  const mockHostId = "host1";
  const mockFromTime = 1622505600000; // Example timestamp
  const mockToTime = 1622592000000; // Example timestamp

  it("should return no events when cpu load is oscillating", async () => {
    const now = new Date();

    (getMetrics as jest.Mock).mockResolvedValue({
      metrics: [
        { timestamp: addMinutes(now, 1).getTime(), load: 1.7 },
        { timestamp: addMinutes(now, 2).getTime(), load: 0.5 },
        { timestamp: addMinutes(now, 3).getTime(), load: 1.1 },
        { timestamp: addMinutes(now, 4).getTime(), load: 0.9 },
        { timestamp: addMinutes(now, 5).getTime(), load: 1.5 },
        { timestamp: addMinutes(now, 5).getTime(), load: 0.5 },
        { timestamp: addMinutes(now, 5).getTime(), load: 1.5 },
      ],
    });

    const result = await getCpuLoadEvents(mockOrgId, mockUserId, mockHostId, mockFromTime, mockToTime);

    expect(result).toEqual({
      events: [],
    });
  });

  it("should return HEAVY_LOAD events when cpu load is higher than 1 for more than 2 minutes", async () => {
    const now = new Date();

    (getMetrics as jest.Mock).mockResolvedValue({
      metrics: [
        { timestamp: addMinutes(now, 1).getTime(), load: 0.7 },
        { timestamp: addMinutes(now, 2).getTime(), load: 1.2 },
        { timestamp: addMinutes(now, 3).getTime(), load: 1.4 },
        { timestamp: addMinutes(now, 4).getTime(), load: 1.1 },
      ],
    });

    const result = await getCpuLoadEvents(mockOrgId, mockUserId, mockHostId, mockFromTime, mockToTime);

    expect(result).toEqual({
      events: [
        {
          type: "HEAVY_LOAD",
          startTimestamp: addMinutes(now, 2).getTime(),
          hostId: mockHostId,
        },
      ],
    });
  });

  it("should return RECOVERED events when recovered after high load for more than 2 minutes", async () => {
    const now = new Date();

    (getMetrics as jest.Mock).mockResolvedValue({
      metrics: [
        { timestamp: addMinutes(now, 1).getTime(), load: 1.7 },
        { timestamp: addMinutes(now, 2).getTime(), load: 1.2 },
        { timestamp: addMinutes(now, 3).getTime(), load: 1.4 },
        { timestamp: addMinutes(now, 4).getTime(), load: 0.9 },
        { timestamp: addMinutes(now, 5).getTime(), load: 0.8 },
        { timestamp: addMinutes(now, 6).getTime(), load: 0.6 },
        { timestamp: addMinutes(now, 7).getTime(), load: 0.3 },
      ],
    });

    const result = await getCpuLoadEvents(mockOrgId, mockUserId, mockHostId, mockFromTime, mockToTime);

    expect(result).toEqual({
      events: [
        {
          type: "HEAVY_LOAD",
          startTimestamp: addMinutes(now, 1).getTime(),
          hostId: mockHostId,
        },
        {
          type: "RECOVERED",
          startTimestamp: addMinutes(now, 4).getTime(),
          hostId: mockHostId,
        },
      ],
    });
  });

  it("should switch between states succesfully during longer time period", async () => {
    const now = new Date();

    (getMetrics as jest.Mock).mockResolvedValue({
      metrics: [
        // trigger
        { timestamp: addMinutes(now, 1).getTime(), load: 1.7 },
        { timestamp: addMinutes(now, 2).getTime(), load: 1.2 },
        { timestamp: addMinutes(now, 3).getTime(), load: 1.4 },
        // trigger
        { timestamp: addMinutes(now, 4).getTime(), load: 0.9 },
        { timestamp: addMinutes(now, 5).getTime(), load: 0.8 },
        { timestamp: addMinutes(now, 6).getTime(), load: 0.6 },
        { timestamp: addMinutes(now, 7).getTime(), load: 0.3 },
        // trigger
        { timestamp: addMinutes(now, 8).getTime(), load: 1.7 },
        { timestamp: addMinutes(now, 9).getTime(), load: 1.2 },
        { timestamp: addMinutes(now, 10).getTime(), load: 1.4 },
        // trigger
        { timestamp: addMinutes(now, 11).getTime(), load: 0.9 },
        { timestamp: addMinutes(now, 12).getTime(), load: 0.8 },
        { timestamp: addMinutes(now, 13).getTime(), load: 0.6 },
        { timestamp: addMinutes(now, 14).getTime(), load: 0.3 },
      ],
    });

    const result = await getCpuLoadEvents(mockOrgId, mockUserId, mockHostId, mockFromTime, mockToTime);

    expect(result).toEqual({
      events: [
        {
          type: "HEAVY_LOAD",
          startTimestamp: addMinutes(now, 1).getTime(),
          hostId: mockHostId,
        },
        {
          type: "RECOVERED",
          startTimestamp: addMinutes(now, 4).getTime(),
          hostId: mockHostId,
        },
        {
          type: "HEAVY_LOAD",
          startTimestamp: addMinutes(now, 8).getTime(),
          hostId: mockHostId,
        },
        {
          type: "RECOVERED",
          startTimestamp: addMinutes(now, 11).getTime(),
          hostId: mockHostId,
        },
      ],
    });
  });

  it("should be able to deal with metrics in seconds", async () => {
    const now = new Date();

    (getMetrics as jest.Mock).mockResolvedValue({
      metrics: [
        // trigger
        { timestamp: addSeconds(now, 0).getTime(), load: 1.6 },
        { timestamp: addSeconds(now, 20).getTime(), load: 1.7 },
        { timestamp: addSeconds(now, 40).getTime(), load: 1.3 },
        { timestamp: addSeconds(now, 60).getTime(), load: 1.4 },
        { timestamp: addSeconds(now, 90).getTime(), load: 1.5 },
        { timestamp: addSeconds(now, 120).getTime(), load: 1.3 },
        // trigger
        { timestamp: addMinutes(now, 3).getTime(), load: 0.8 },
        { timestamp: addMinutes(now, 4).getTime(), load: 0.6 },
        { timestamp: addMinutes(now, 5).getTime(), load: 0.3 },
      ],
    });

    const result = await getCpuLoadEvents(mockOrgId, mockUserId, mockHostId, mockFromTime, mockToTime);

    expect(result).toEqual({
      events: [
        {
          type: "HEAVY_LOAD",
          startTimestamp: addSeconds(now, 0).getTime(),
          hostId: mockHostId,
        },
        {
          type: "RECOVERED",
          startTimestamp: addMinutes(now, 3).getTime(),
          hostId: mockHostId,
        },
      ],
    });
  });

  it("should handle errors thrown by getMetrics", async () => {
    (getMetrics as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(getCpuLoadEvents(mockOrgId, mockUserId, mockHostId, mockFromTime, mockToTime)).rejects.toThrow(
      "Could not retrieve metrics"
    );
  });
});
