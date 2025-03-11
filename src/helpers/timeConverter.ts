export function convertTime(time: number) {
  const seconds = (time / 100) % 60;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return (
    (hours > 0 ? formatTime(hours, false) : "") +
    formatTime(minutes, false) +
    formatTime(seconds, true)
  );
}

function formatTime(time: number, areSeconds: boolean) {
  const timeDisplay = areSeconds ? time.toFixed(2) : time.toString();
  return (time < 10 ? "0" : "") + timeDisplay + (areSeconds ? "" : ":");
}
