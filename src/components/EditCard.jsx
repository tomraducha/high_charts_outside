import Popup from "reactjs-popup";
import DropdownRoom from "./DropdownRoom";
import { rooms } from "../data/rooms";
import { useState } from "react";
import Close from "../images/Close.png";

export default function EditCard({ buttonPopup, setButtonPopup }) {
  const [selectedRooms, setSelectedRooms] = useState([]);

  function handleSelectedItems(selectedItems) {
    setSelectedRooms(
      selectedItems.map((item) => ({
        name: item,
        id: rooms[item],
      }))
    );
  }

  function handleClosePopup() {
    setSelectedRooms([]);
    setButtonPopup(false);
  }

  return (
    <Popup open={buttonPopup} onClose={handleClosePopup}>
      <div className="edit-card">
        <img src={Close} alt="close" onClick={handleClosePopup} />
        <h3>Pièces et ID sélectionnés</h3>
        <DropdownRoom
          onSelect={handleSelectedItems}
          placeholder="Sélectionner des pièces"
        />
        {selectedRooms.map((room) => (
          <div
            className="selected-room"
            key={room.id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>{room.name}</span>
            <span>{room.id}</span>
          </div>
        ))}
      </div>
    </Popup>
  );
}
