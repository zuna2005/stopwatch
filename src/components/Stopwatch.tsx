import { useEffect, useRef, useState } from "react";
import Delete from "../assets/delete-red.svg";
import { convertTime } from "../helpers/timeConverter";

interface StopwatchProps {
  id: number;
  onDelete: (idToDelete: number) => void;
}

const Stopwatch = ({ id, onDelete }: StopwatchProps) => {
  const [started, setStarted] = useState(false);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  const intervalId = useRef<number | null>(null);
  const deleteRef = useRef(false);
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
    const prevStopwatch = localStorage.getItem(id.toString());
    if (prevStopwatch) {
      const { prevTime, prevRunning, timestamp } = JSON.parse(prevStopwatch);
      const prevFullTime = prevRunning
        ? prevTime + (Date.now() - timestamp) / 10
        : prevTime;
      setStarted(prevTime !== 0);
      setRunning(prevRunning);
      setTime(prevFullTime);
    }

    const saveState = () => {
      if (deleteRef.current) {
        localStorage.removeItem(id.toString());
        return;
      }

      const stopwatch = {
        prevTime: timeRef.current,
        prevRunning: runningRef.current,
        timestamp: Date.now(),
      };

      localStorage.setItem(id.toString(), JSON.stringify(stopwatch));
    };
    window.addEventListener("beforeunload", saveState);

    return () => window.removeEventListener("beforeunload", saveState);
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

  function handleDelete() {
    deleteRef.current = true;
    onDelete(id);
  }

  return (
    <div className="stopwatch">
      <div className="delete-btn-container">
        <img className="delete-btn" src={Delete} onClick={handleDelete} />
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
