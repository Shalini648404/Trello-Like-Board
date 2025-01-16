import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillDelete } from "react-icons/ai";
import { Modal, TextField, Button } from "@mui/material";

const Card = ({ card, index, list, board, setBoard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedCard, setEditedCard] = useState({ ...card });

  const deleteCard = () => {
    const updatedList = board.map((l) =>
      l.id === list.id
        ? { ...l, cards: l.cards.filter((c) => c.id !== card.id) }
        : l
    );
    setBoard(updatedList);
  };

  const updateCard = () => {
    const updatedList = board.map((l) =>
      l.id === list.id
        ? {
            ...l,
            cards: l.cards.map((c) => (c.id === card.id ? editedCard : c)),
          }
        : l
    );
    setBoard(updatedList);
    setIsModalOpen(false);
  };

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            className="card"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setIsModalOpen(true)}
          >
            <p>{card.title}</p>
            <AiFillDelete onClick={deleteCard} className="delete-icon" />
          </div>
        )}
      </Draggable>

      {/* Modal for editing card */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="card-modal">
          <TextField
            label="Title"
            value={editedCard.title}
            onChange={(e) =>
              setEditedCard((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <TextField
            label="Description"
            value={editedCard.description || ""}
            onChange={(e) =>
              setEditedCard((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            multiline
          />
          <TextField
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={editedCard.dueDate || ""}
            onChange={(e) =>
              setEditedCard((prev) => ({
                ...prev,
                dueDate: e.target.value,
              }))
            }
          />
          <Button variant="contained" onClick={updateCard}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Card;
