export function roundRobin(processes, quantum) {
  const queue = [...processes];
  const result = [];
  let time = 0;

  while (queue.length) {
    const p = queue.shift();
    if (p.arrival > time) time = p.arrival;

    const execTime = Math.min(p.burst, quantum);
    result.push({ name: p.name, start: time, end: time + execTime });
    time += execTime;
    p.burst -= execTime;

    if (p.burst > 0) queue.push({ ...p, arrival: time });
  }

  return result;
}
