import { useEffect, useRef, useState } from "react";
import Delete from "../assets/delete-red.svg";
import { convertTime } from "../helpers/timeConverter";
import { getPrevStopwatch, saveStopwatch } from "../helpers/localStorageUtils";

interface StopwatchProps {
  id: number;
  onDelete: (idToDelete: number) => void;
}

const Stopwatch = ({ id, onDelete }: StopwatchProps) => {
  const [started, setStarted] = useState(false);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  const intervalId = useRef<number | null>(null);
  const timeRef = useRef(time);
  const runningRef = useRef(running);

  useEffect(() => {
    timeRef.current = time;
    runningRef.current = running;
  }, [time, running]);

  useEffect(() => {
    if (running)
      intervalId.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10);
    else if (intervalId.current) clearInterval(intervalId.current);

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [running]);

  useEffect(() => {
    const prevStopwatch = getPrevStopwatch(id);
    if (prevStopwatch) {
      const { prevFullTime, prevRunning } = prevStopwatch;
      setStarted(prevFullTime !== 0);
      setRunning(prevRunning);
      setTime(prevFullTime);
    }

    const handleBeforeUnload = () =>
      saveStopwatch(id, timeRef.current, runningRef.current);
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [id]);

  function handleStart() {
    setStarted(true);
    setRunning(true);
  }

  function handlePlay() {
    setRunning((prev) => !prev);
  }

  function handleClear() {
    setStarted(false);
    setRunning(false);
    setTime(0);
  }

  return (
    <div className="stopwatch">
      <div className="delete-btn-container">
        <img className="delete-btn" src={Delete} onClick={() => onDelete(id)} />
      </div>
      <h2>{convertTime(time)}</h2>
      {started ? (
        <div>
          <button className="green-btn" onClick={handlePlay}>
            {running ? "Pause" : "Resume"}
          </button>
          <button className="red-btn" onClick={handleClear}>
            Clear
          </button>
        </div>
      ) : (
        <button className="green-btn" onClick={handleStart}>
          Start
        </button>
      )}
    </div>
  );
};

export default Stopwatch;
