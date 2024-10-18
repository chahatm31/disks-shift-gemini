// App.js
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [disks, setDisks] = useState({
    0: [3, 2, 1], // Initial disks on the first tower
    1: [],
    2: [],
  });
  const [selectedDisk, setSelectedDisk] = useState(null);
  const [moves, setMoves] = useState(0);

  const handleClick = (towerIndex) => {
    if (selectedDisk === null) {
      // Select the top disk from the tower
      if (disks[towerIndex].length > 0) {
        setSelectedDisk({
          disk: disks[towerIndex][disks[towerIndex].length - 1],
          tower: towerIndex,
        });
      }
    } else {
      // Try to move the selected disk to the tower
      if (isValidMove(selectedDisk.tower, towerIndex)) {
        moveDisk(selectedDisk.tower, towerIndex);
        setMoves(moves + 1);
      }
      setSelectedDisk(null);
    }
  };

  const isValidMove = (fromTower, toTower) => {
    const from = disks[fromTower];
    const to = disks[toTower];
    if (to.length === 0) {
      // Can always move to an empty tower
      return true;
    } else {
      // Can only move if the top disk on the target tower is larger
      return from[from.length - 1] < to[to.length - 1];
    }
  };

  const moveDisk = (fromTower, toTower) => {
    setDisks((prevDisks) => {
      const newDisks = { ...prevDisks };
      const disk = newDisks[fromTower].pop();
      newDisks[toTower].push(disk);
      return newDisks;
    });
  };

  useEffect(() => {
    // Check if the game is won
    if (disks[2].length === 3) {
      alert(`Congratulations! You won in ${moves} moves!`);
    }
  }, [disks, moves]);

  return (
    <div className="app">
      <h1>Disks shift</h1>
      <div className="towers">
        {Object.keys(disks).map((towerIndex) => (
          <div
            key={towerIndex}
            className={`tower ${
              selectedDisk?.tower === towerIndex ? "selected" : ""
            }`}
            onClick={() => handleClick(parseInt(towerIndex, 10))}
          >
            {disks[towerIndex].map((disk) => (
              <div key={disk} className={`disk disk-${disk}`} />
            ))}
          </div>
        ))}
      </div>
      <p>Moves: {moves}</p>
    </div>
  );
}

export default App;
