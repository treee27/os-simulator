
export function lru(pages, capacity) {
  let faults = 0;
  let frames = [];
  let history = [];

  pages.forEach((page, i) => {
    let pageFault = false;
    
    // Check if page is already in frames
    const pageIndex = frames.indexOf(page);
    
    if (pageIndex === -1) {
      // Page fault - page not in frames
      if (frames.length === capacity) {
        frames.shift(); // Remove least recently used
      }
      frames.push(page);
      faults++;
      pageFault = true;
    } else {
      // Page hit - move to most recently used position
      frames.splice(pageIndex, 1); // Remove from current position
      frames.push(page); // Add to end (most recent)
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