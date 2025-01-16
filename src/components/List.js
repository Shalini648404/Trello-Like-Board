/*import React from "react";
import Card from "./Card";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { AiFillDelete } from "react-icons/ai";

const List = ({ list, index, board, setBoard }) => {
  const addCard = () => {
    const newCard = { id: `card-${Date.now()}`, title: "New Card" };
    const updatedList = board.map((l) =>
      l.id === list.id ? { ...l, cards: [...l.cards, newCard] } : l
    );
    setBoard(updatedList);
  };

  const deleteList = () => {
    setBoard(board.filter((l) => l.id !== list.id));
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          className="list"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="list-header" {...provided.dragHandleProps}>
            <h3>{list.title}</h3>
            <AiFillDelete onClick={deleteList} className="delete-icon" />
          </div>
          <Droppable droppableId={list.id} type="card">
            {(provided) => (
              <div
                className="card-container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.cards.length === 0 && (
                  <div className="empty-placeholder">Drop cards here</div>
                )}
                {list.cards.map((card, index) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={index}
                    list={list}
                    board={board}
                    setBoard={setBoard}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <button className="add-card" onClick={addCard}>
            Add Card
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default List;*/

/*import React from "react";
import Card from "./Card";
import { Draggable } from "react-beautiful-dnd";
import  StrictModeDroppable  from "./StrictModeDroppable";
import { AiFillDelete } from "react-icons/ai";

const List = ({ list, index, board, setBoard }) => {
  const addCard = () => {
    const cardTitle = prompt("Enter the card title:");
    if (cardTitle) {
      const newCard = { id: `card-${Date.now()}`, title: cardTitle };
      const updatedList = board.map((l) =>
        l.id === list.id ? { ...l, cards: [...l.cards, newCard] } : l
      );
      setBoard(updatedList);
    }
  };

  const deleteList = () => {
    setBoard(board.filter((l) => l.id !== list.id));
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          className="list"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="list-header" {...provided.dragHandleProps}>
            <h3>{list.title}</h3>
            <AiFillDelete onClick={deleteList} className="delete-icon" />
          </div>
          <StrictModeDroppable droppableId={list.id} type="card">
            {(provided) => (
              <div
                className="card-container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.cards.map((card, index) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={index}
                    list={list}
                    board={board}
                    setBoard={setBoard}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
          <button className="add-card" onClick={addCard}>
            Add Card
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default List;*/

/*import React, { useState } from "react";
import Card from "./Card";
import { Draggable } from "react-beautiful-dnd";
import  StrictModeDroppable  from "./StrictModeDroppable";
import { AiFillDelete } from "react-icons/ai";

const List = ({ list, index, board, setBoard }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const handleAddCard = () => {
    if (newCardTitle.trim() !== "") {
      const newCard = { id: `card-${Date.now()}`, title: newCardTitle };
      const updatedList = board.map((l) =>
        l.id === list.id ? { ...l, cards: [...l.cards, newCard] } : l
      );
      setBoard(updatedList);
      setNewCardTitle("");
      setIsAddingCard(false);
    }
  };

  const deleteList = () => {
    setBoard(board.filter((l) => l.id !== list.id));
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          className="list"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="list-header" {...provided.dragHandleProps}>
            <h3>{list.title}</h3>
            <AiFillDelete onClick={deleteList} className="delete-icon" />
          </div>
          <StrictModeDroppable droppableId={list.id} type="card">
            {(provided) => (
              <div
                className="card-container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.cards.map((card, index) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={index}
                    list={list}
                    board={board}
                    setBoard={setBoard}
                  />
                ))}
                {provided.placeholder}

                {/* "Add Card" Input Box }
                {isAddingCard ? (
                  <div className="add-card-input">
                    <input
                      type="text"
                      placeholder="Enter card title..."
                      value={newCardTitle}
                      onChange={(e) => setNewCardTitle(e.target.value)}
                    />
                    <button onClick={handleAddCard}>Add Card</button>
                    <button onClick={() => setIsAddingCard(false)}>Cancel</button>
                  </div>
                ) : (
                  <button className="add-card" onClick={() => setIsAddingCard(true)}>
                    Add Card
                  </button>
                )}
              </div>
            )}
          </StrictModeDroppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;*/


import React, { useState } from "react";
import Card from "./Card";
import { Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "./StrictModeDroppable";
import { AiFillDelete } from "react-icons/ai";

const List = ({ list, index, board, setBoard }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(list.title);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  // Handle editing list title
  const handleTitleEdit = () => {
    if (editedTitle.trim() !== "") {
      const updatedBoard = board.map((l) =>
        l.id === list.id ? { ...l, title: editedTitle } : l
      );
      setBoard(updatedBoard);
      setIsEditingTitle(false);
    }
  };

  // Handle adding a new card
  const handleAddCard = () => {
    if (newCardTitle.trim() !== "") {
      const newCard = { id: `card-${Date.now()}`, title: newCardTitle };
      const updatedList = board.map((l) =>
        l.id === list.id ? { ...l, cards: [...l.cards, newCard] } : l
      );
      setBoard(updatedList);
      setNewCardTitle("");
      setIsAddingCard(false);
    }
  };

  // Handle deleting the list
  const deleteList = () => {
    setBoard(board.filter((l) => l.id !== list.id));
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          className="list"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="list-header" {...provided.dragHandleProps}>
            {isEditingTitle ? (
              <div className="edit-title-container">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleTitleEdit();
                    }
                  }}
                />
                <button onClick={handleTitleEdit}>Save</button>
                <button onClick={() => setIsEditingTitle(false)}>Cancel</button>
              </div>
            ) : (
              <div className="title-container">
                <h3 onClick={() => setIsEditingTitle(true)}>{list.title}</h3>
                <AiFillDelete onClick={deleteList} className="delete-icon" />
              </div>
            )}
          </div>

          <StrictModeDroppable droppableId={list.id} type="card">
            {(provided) => (
              <div
                className="card-container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.cards.map((card, index) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={index}
                    list={list}
                    board={board}
                    setBoard={setBoard}
                  />
                ))}
                {provided.placeholder}

                {/* "Add Card" Input Box */}
                {isAddingCard ? (
                  <div className="add-card-input">
                    <input
                      type="text"
                      placeholder="Enter card title..."
                      value={newCardTitle}
                      onChange={(e) => setNewCardTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddCard();
                        }
                      }}
                    />
                    <button onClick={handleAddCard}>Add Card</button>
                    <button onClick={() => setIsAddingCard(false)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-card"
                    onClick={() => setIsAddingCard(true)}
                  >
                    Add Card
                  </button>
                )}
              </div>
            )}
          </StrictModeDroppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;




