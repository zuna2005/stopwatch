import { useEffect, useState } from "react";
import Stopwatch from "./components/Stopwatch";
import Add from "./assets/add.svg";
import Delete from "./assets/delete.svg";

function App() {
  const prevStopwatches = JSON.parse(localStorage.getItem("ids") || "[]");
  const prevCurrentId = parseInt(localStorage.getItem("currentId") || "0");

  const [stopwatches, setStopwatches] =
    useState<Array<number>>(prevStopwatches);
  const [currentId, setCurrentId] = useState(prevCurrentId);

  useEffect(() => {
    localStorage.setItem("ids", JSON.stringify(stopwatches));
    localStorage.setItem("currentId", currentId.toString());
  }, [stopwatches, currentId]);

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
