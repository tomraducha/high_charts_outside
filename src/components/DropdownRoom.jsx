import Mutliselect from "multiselect-react-dropdown";

function DropdownRoom({ onSelect }) {
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
        selectedValues={["Pollux"]}
        style={{
          chips: {
            background: "#7a7878b0",
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
