/* BTIB */
import Mutliselect from "multiselect-react-dropdown";
import { fetchAllRoom } from "../util/utilsApi";
/* Libs & plugins */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function DropdownRoom({ onSelect, placeholder, defaultSelected = [] }) {
  const [room, setRoom] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAllRoom();
      setRoom(data);
    }
    fetchData();
  }, []);

  ////////////////////////////////////////////////////////////////
  // Event handlers
  ////////////////////////////////////////////////////////////////

  function handleOptionSelect(selectedItems) {
    onSelect([...selectedItems]);
  }

  ////////////////////////////////////////////////////////////////
  // JSX
  ////////////////////////////////////////////////////////////////

  return (
    <div className="drop-down-room">
      <Mutliselect
        isObject={false}
        options={room}
        showCheckbox={true}
        selectedValues={defaultSelected}
        placeholder={placeholder}
        style={{
          chips: {
            background: "rgba(46, 44, 45, 0.8)",
            color: "white",
            fontSize: "1rem",
          },
        }}
        onSelect={(e) => handleOptionSelect(e)}
        onRemove={(e) => handleOptionSelect(e)}
      />
    </div>
  );
}
DropdownRoom.propTypes = {
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  defaultSelected: PropTypes.array,
};

export default DropdownRoom;
