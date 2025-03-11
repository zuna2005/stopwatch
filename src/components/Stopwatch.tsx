import { useRef, useState } from "react";
import Delete from "../assets/delete-red.svg";
import { convertTime } from "../helpers/timeConverter";

interface StopwatchProps {
  id: number;
  onDelete: (x: number) => void;
}

const Stopwatch = ({ id, onDelete }: StopwatchProps) => {
  const prevTime = localStorage.getItem(id.toString()) || "0";
  localStorage.setItem(id.toString(), prevTime);

  const [started, setStarted] = useState(prevTime !== "0");
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(parseInt(prevTime));
  const intervalId = useRef(0);

  function updateTime() {
    setTime((prev) => {
      localStorage.setItem(id.toString(), (prev + 1).toString());
      return (prev + 1);
    }); 
  }

  function handleStart() {
    setStarted(true);
    setRunning(true);
    intervalId.current = setInterval(updateTime, 10);
  }
  function handlePlay() {
    setRunning(!running);
    if (running) {
      clearInterval(intervalId.current);
    } else {
      intervalId.current = setInterval(updateTime, 10);
    }
  }
  function handleClear() {
    setStarted(false);
    setRunning(false);
    clearInterval(intervalId.current);
    setTime(0);
    localStorage.setItem(id.toString(), "0");
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
