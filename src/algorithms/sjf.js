export function sjf(processes) {
  let time = 0;
  const result = [];
  const ready = [];

  processes.sort((a, b) => a.arrival - b.arrival);
  while (processes.length || ready.length) {
    while (processes.length && processes[0].arrival <= time) {
      ready.push(processes.shift());
    }
    if (ready.length === 0) {
      time = processes[0].arrival;
      continue;
    }
    ready.sort((a, b) => a.burst - b.burst);
    const current = ready.shift();
    result.push({ name: current.name, start: time, end: time + current.burst });
    time += current.burst;
  }
  return result;
}
