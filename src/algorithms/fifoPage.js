
export function fifo(pages, capacity) {
  let faults = 0;
  let frames = [];
  let history = [];

  pages.forEach((page, i) => {
    let pageFault = false;
    if (!frames.includes(page)) {
      if (frames.length === capacity) frames.shift();
      frames.push(page);
      faults++;
      pageFault = true;
    }
    history.push({
      step: i + 1,
      page,
      frames: [...frames],
      pageFault,
    });
  });

  return {
    faults,
    faultRate: ((faults / pages.length) * 100).toFixed(2) + "%",
    history,
  };
}