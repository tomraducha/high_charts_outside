import Mutliselect from "multiselect-react-dropdown";

function DropdownRoom({ onSelect, defaultSelected = [] }) {
  const room = ["Pollux", "Sirius", "Proxima", "Scuti"];

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

export default DropdownRoom;
