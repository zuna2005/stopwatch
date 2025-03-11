import { useState } from "react";
import Stopwatch from "./components/Stopwatch";
import Add from "./assets/add.svg";
import Delete from "./assets/delete.svg";

function App() {
  const prevStopwatches = localStorage.getItem("ids");
  const prevCurrentId = localStorage.getItem("currentId") || "0";
  localStorage.setItem("currentId", prevCurrentId);

  const [stopwatches, setStopwatches] = useState<Array<number>>(prevStopwatches?.split(",").map(id => parseInt(id)) || []);
  const [currentId, setCurrentId] = useState(parseInt(prevCurrentId));

  function handleAdd() {
    const newStopwatches = [...stopwatches, currentId];
    setStopwatches(newStopwatches);
    setCurrentId((prev) => prev + 1);
    localStorage.setItem("ids", newStopwatches.join(","));
    localStorage.setItem("currentId", (currentId + 1).toString());
  }

  function handleDelete(idToDelete: number) {
    const newStopwatches = stopwatches.filter((id) => id != idToDelete);
    setStopwatches(newStopwatches);
    localStorage.setItem("ids", newStopwatches.join(","));
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
