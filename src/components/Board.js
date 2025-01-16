import React, { useState } from "react";
import List from "./List";
import  StrictModeDroppable  from "./StrictModeDroppable";
import { AiOutlinePlus } from "react-icons/ai";

const Board = ({ board, setBoard }) => {
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
//Handling Add list
  const handleAddList = () => {
    if (newListTitle.trim() !== "") {
      const newList = {
        id: `list-${Date.now()}`,
        title: newListTitle,
        cards: [],
      };
      setBoard([...board, newList]);
      setNewListTitle("");
      setIsAddingList(false);
    }
  };

  return (
    <div className="board">
      <StrictModeDroppable droppableId="board" direction="horizontal" type="list">
        {(provided) => (
          <div
            className="list-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {board.map((list, index) => (
              <List
                key={list.id}
                list={list}
                index={index}
                board={board}
                setBoard={setBoard}
              />
            ))}
            {provided.placeholder}

            {/* "Add List" Input Box */}
            <div className="add-list-container">
              {isAddingList ? (
                <div className="add-list-input">
                  <input
                    type="text"
                    placeholder="Enter list title..."
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                  />
                  <button onClick={handleAddList}>Add List</button>
                  <button onClick={() => setIsAddingList(false)}>Cancel</button>
                </div>
              ) : (
                <button
                  className="add-list"
                  onClick={() => setIsAddingList(true)}
                >
                  <AiOutlinePlus /> Add List
                </button>
              )}
            </div>
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
};

export default Board;





