import Popup from "reactjs-popup";
import DropdownRoom from "./DropdownRoom";
import { useState } from "react";
import Close from "../images/Close.png";
import PropTypes from "prop-types";
import useFetchAllRooms from "../hooks/useFetchAllRoomsData";

export default function EditCard({ buttonPopup, setButtonPopup }) {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const rooms = useFetchAllRooms();

  function handleSelectedItems(selectedItems) {
    setSelectedRooms(
      selectedItems.map((item) => ({
        space: item,
        spaceId: rooms[item],
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
          <div className="selected-room" key={room.spaceId}>
            <span>{room.space}</span>
            <span>{room.spaceId}</span>
          </div>
        ))}
      </div>
    </Popup>
  );
}

EditCard.propTypes = {
  buttonPopup: PropTypes.bool.isRequired,
  setButtonPopup: PropTypes.func.isRequired,
};
