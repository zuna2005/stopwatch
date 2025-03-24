import { useEffect, useRef, useState } from "react";
import Stopwatch from "./components/Stopwatch";
import Add from "./assets/add.svg";
import Delete from "./assets/delete.svg";

function App() {
  const [stopwatches, setStopwatches] = useState<Array<number>>([]);
  const [currentId, setCurrentId] = useState(0);

  const stopwatchesRef = useRef(stopwatches);
  const currentIdRef = useRef(currentId);

  useEffect(() => {
    stopwatchesRef.current = stopwatches;
    currentIdRef.current = currentId;
  }, [stopwatches, currentId]);

  useEffect(() => {
    const prevStopwatches = localStorage.getItem("ids");
    if (prevStopwatches) setStopwatches(JSON.parse(prevStopwatches));

    const prevCurrentId = localStorage.getItem("currentId");
    if (prevCurrentId) setCurrentId(parseInt(prevCurrentId));

    const saveState = () => {
      localStorage.setItem("ids", JSON.stringify(stopwatchesRef.current));
      localStorage.setItem("currentId", currentIdRef.current.toString());
    };
    window.addEventListener("beforeunload", saveState);
    return () => window.removeEventListener("beforeunload", saveState);
  }, []);

  function handleAdd() {
    setStopwatches((prev) => [...prev, currentId]);
    setCurrentId((prev) => prev + 1);
  }

  function handleDelete(idToDelete: number) {
    setStopwatches((prev) => prev.filter((id) => id !== idToDelete));
    localStorage.removeItem(idToDelete.toString());
  }

  function handleDeleteAll() {
    setStopwatches([]);
    setCurrentId(0);
    localStorage.clear();
  }
  return (
    <>
      <h1>Stopwatch</h1>
      <button className="green-btn" onClick={handleAdd}>
        <img src={Add} />
        Add
      </button>
      <button className="red-btn" onClick={handleDeleteAll}>
        <img src={Delete} />
        Delete all
      </button>
      <div className="stopwatches-container">
        {stopwatches.map((id) => (
          <div key={id.toString()}>
            <Stopwatch id={id} onDelete={handleDelete} />{" "}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
