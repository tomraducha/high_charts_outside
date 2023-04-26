import React from "react";
import Mutliselect from "multiselect-react-dropdown";

function DropdownRoom({ onSelect }) {
  const room = ["Polux", "Sirius", "Proxima", "Scuti"];

  function handleOptionSelect(selectedItems) {
    onSelect([...selectedItems]);
  }

  return (
    <div className="drop-down-room">
      <Mutliselect
        isObject={false}
        options={room}
        showCheckbox={true}
        selectedValues={[]}
        style={{
          chips: {
            background: "rgba(0, 0, 0, 0.1)",
            color: "black",
            fontSize: "1rem",
          },
        }}
        onSelect={(e) => handleOptionSelect(e)}
        onRemove={(e) => handleOptionSelect(e)}
      />
    </div>
  );
}

export default DropdownRoom;
