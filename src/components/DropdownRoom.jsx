import Mutliselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react";
import { fetchAllRoom } from "../Util/utilsApi";
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

  function handleOptionSelect(selectedItems) {
    onSelect([...selectedItems]);
  }

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
