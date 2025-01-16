import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Button } from "@mui/material";
import Board from "./components/Board";
import "./App.css";

const App = () => {
  const [board, setBoard] = useState(() => {
    // Initialize from localStorage
    const savedBoard = localStorage.getItem("boardData");
    return savedBoard ? JSON.parse(savedBoard) : [];
  });

  // Persist board state in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("boardData", JSON.stringify(board));
  }, [board]);

  const resetBoard = () => {
    setBoard([]);
    localStorage.removeItem("boardData"); // Clear localStorage
  };

  const handleDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return; // Exit if dropped outside a valid destination

    if (type === "list") {
      const newBoard = Array.from(board);
      const [removed] = newBoard.splice(source.index, 1); // Remove list from source
      newBoard.splice(destination.index, 0, removed); // Insert list at destination
      setBoard(newBoard);
    } else if (type === "card") {
      const sourceList = board.find((list) => list.id === source.droppableId);
      const destList = board.find((list) => list.id === destination.droppableId);

      if (sourceList === destList) {
        // Move card within the same list
        const updatedCards = Array.from(sourceList.cards);
        const [removed] = updatedCards.splice(source.index, 1);
        updatedCards.splice(destination.index, 0, removed);

        const updatedList = { ...sourceList, cards: updatedCards };
        setBoard(
          board.map((list) => (list.id === sourceList.id ? updatedList : list))
        );
      } else {
        // Move card between lists
        const sourceCards = Array.from(sourceList.cards);
        const [removed] = sourceCards.splice(source.index, 1);
        const destCards = Array.from(destList.cards);
        destCards.splice(destination.index, 0, removed);

        const updatedBoard = board.map((list) => {
          if (list.id === sourceList.id) return { ...list, cards: sourceCards };
          if (list.id === destList.id) return { ...list, cards: destCards };
          return list;
        });

        setBoard(updatedBoard);
      }
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Trello Clone</h1>
        <Button variant="contained" color="secondary" onClick={resetBoard}>
          Reset Board
        </Button>
      </header>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Board board={board} setBoard={setBoard} />
      </DragDropContext>
    </div>
  );
};

export default App;

