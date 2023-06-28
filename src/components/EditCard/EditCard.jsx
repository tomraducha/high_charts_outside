/* BTIB */
import Close from "../../images/Close.png";
import useFetchAllRooms from "../../hooks/useFetchAllRoomsData";
import DropdownRoom from "../DropdownRoom";
import { fetchSpaceAndIdRooms } from "../../Util/utilsApi";
import { areSelectedRoomsEqual } from "./utils";
/* Libs & plugins */
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";

function EditCard({ buttonPopup, setButtonPopup }) {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [spaceAndIdRooms, setSpaceAndIdRooms] = useState([]);
  const rooms = useFetchAllRooms();

  useEffect(() => {
    const updatedSelectedRooms = addIdsToSelectedRooms(
      spaceAndIdRooms,
      selectedRooms
    );
    // avoid updating if the new values are identical to the old ones
    if (!areSelectedRoomsEqual(updatedSelectedRooms, selectedRooms)) {
      setSelectedRooms(updatedSelectedRooms);
    }
  }, [spaceAndIdRooms, selectedRooms]);

  useEffect(() => {
    async function fetchData() {
      const fetchedRooms = await fetchSpaceAndIdRooms();
      setSpaceAndIdRooms(fetchedRooms);
    }
    fetchData();
  }, []);

  ////////////////////////////////////////////////////////////////
  // Methods
  ////////////////////////////////////////////////////////////////

  function addIdsToSelectedRooms(spaceAndIdRooms, selectedRooms) {
    return selectedRooms.map((selectedRoom) => {
      const matchingRoom = spaceAndIdRooms.find(
        (room) => room.space === selectedRoom.space
      );

      if (matchingRoom) {
        return { ...selectedRoom, id: matchingRoom.id };
      }
      return selectedRoom;
    });
  }

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

  ////////////////////////////////////////////////////////////////
  // JSX
  ////////////////////////////////////////////////////////////////

  return (
    <Popup open={buttonPopup} onClose={handleClosePopup}>
      <div className="edit-card">
        <img src={Close} alt="close" onClick={handleClosePopup} />
        <h3>Sélectionnez une pièce</h3>
        <DropdownRoom
          onSelect={handleSelectedItems}
          placeholder="Sélectionner des pièces"
        />
        {selectedRooms.map((room) => (
          <div className="selected-room" key={room.spaceId}>
            <div style={{ fontWeight: "bold" }}>{room.space}:</div>
            <div>
              {room.id}/{room.spaceId}
            </div>
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

export default EditCard;
