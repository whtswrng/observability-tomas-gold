import { render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import TimeWindow from "../../../../../../components/time-window";
import { TimeWindowProvider } from "../../../../../../contexts/time-window-provider";
import { HostProvider } from "../../../../contexts/host-provider";
import { CpuLoadBigNumber } from "./cpu-load-big-number";

describe("CPU Load Big Number Widget", () => {
  let server;

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe("when server responded with metrics data", () => {
    const mockedAverageFromServer = "0.37";

    beforeEach(() => {
      const handlers = [
        http.get("/api/data/v1/metrics", () => {
          return HttpResponse.json({
            metrics: [
              {
                timestamp: 1721548618141,
                load: 0.37,
              },
            ],
            avg: mockedAverageFromServer,
          });
        }),
        http.get("/api/data/v1/cpu-load-events", () => {
          // do not need events to be mocked
          return HttpResponse.json({ events: [] });
        }),
      ];

      server = setupServer(...handlers);
      server.listen();
    });

    it("should render an average number correctly", async () => {
      render(
        <MemoryRouter initialEntries={["/org/150/entities/hosts/111"]}>
          <Routes>
            <Route
              path="/org/:orgId/entities/hosts/:hostId"
              element={
                <TimeWindowProvider>
                  <TimeWindow />
                  <HostProvider>
                    <CpuLoadBigNumber />
                  </HostProvider>
                </TimeWindowProvider>
              }
            ></Route>
          </Routes>
        </MemoryRouter>
      );
      await waitFor(() => {
        const linkElement = screen.getByText(mockedAverageFromServer);
        expect(linkElement).toBeInTheDocument();
      });
    });
  });
});
