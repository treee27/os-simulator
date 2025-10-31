export function fcfs(processes) {
  let time = 0;
  const result = [];
  processes.sort((a, b) => a.arrival - b.arrival);

  for (let p of processes) {
    if (time < p.arrival) time = p.arrival;
    result.push({ name: p.name, start: time, end: time + p.burst });
    time += p.burst;
  }
  return result;
}
