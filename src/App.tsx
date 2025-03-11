import { useState } from "react";
import Stopwatch from "./components/Stopwatch";
import Add from "./assets/add.svg";
import Delete from "./assets/delete.svg";

function App() {
  const [stopwatches, setStopwatches] = useState<Array<number>>([]);
  const [currentId, setCurrentId] = useState(0);

  function handleAdd() {
    setStopwatches([...stopwatches, currentId]);
    setCurrentId((prev) => prev + 1);
  }

  function handleDelete(idToDelete: number) {
    setStopwatches(stopwatches.filter((id) => id != idToDelete));
  }

  function handleDeleteAll() {
    setStopwatches([]);
    setCurrentId(0);
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
