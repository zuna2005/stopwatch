export const saveStopwatch = (id: number, time: number, running: boolean) => {
  const stopwatch = {
    prevTime: time,
    prevRunning: running,
    timestamp: Date.now(),
  };
  localStorage.setItem(id.toString(), JSON.stringify(stopwatch));
};

export const saveIds = (ids: Array<number>) => {
  localStorage.setItem("ids", JSON.stringify(ids));
};

export const getPrevStopwatch = (id: number) => {
  const prevStopwatch = localStorage.getItem(id.toString());
  if (prevStopwatch) {
    const { prevTime, prevRunning, timestamp } = JSON.parse(prevStopwatch);
    const prevFullTime = prevRunning
      ? prevTime + (Date.now() - timestamp) / 10
      : prevTime;
    return { prevFullTime, prevRunning };
  }
  return null;
};

export const getPrevIds = () => {
  const prevStopwatches = localStorage.getItem("ids");
  return prevStopwatches ? JSON.parse(prevStopwatches) : null;
};
