function simulateCpuHeavyTask() {
  console.log("Starting CPU heavy task...");
  const start = Date.now();
  let count = 0;

  while (Date.now() - start < 9000) {
    // Run for 5 seconds
    // Perform a CPU-intensive task
    for (let i = 0; i < 1e6; i++) {
      count += Math.sqrt(i);
    }
  }

  console.log("CPU heavy task completed.");
}

setInterval(simulateCpuHeavyTask, 5000);
