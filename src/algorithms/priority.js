export function priorityScheduling(processes) {
  processes.sort((a, b) => a.priority - b.priority);
  let time = 0;
  const result = [];

  for (let p of processes) {
    if (time < p.arrival) time = p.arrival;
    result.push({ name: p.name, start: time, end: time + p.burst });
    time += p.burst;
  }
  return result;
}
