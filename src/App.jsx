import { useEffect, useState } from "react";
import DropdownRoom from "./components/DropdownRoom";
import HighchartsFlags from "./components/HighChartsFlags/HighchartsFlags";
import { getRoomId } from "./Util/utilsApp";
import Temperature from "./components/Temperature";
import ParameterButton from "./components/ParameterButton";
import { fetchRoomData } from "./Util/utilsApi";
import useFetchAllRooms from "./hooks/useFetchAllRoomsData";

function App() {
  const [data, setData] = useState([]);
  const [selectedRoomArray, setSelectedRoomArray] = useState(["Pollux"]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const rooms = useFetchAllRooms();
  console.log("🚀 ~ file: App.jsx:15 ~ App ~ rooms:", rooms);

  useEffect(() => {
    fetchData();
  }, [selectedRoomArray]);

  async function fetchData() {
    const selectedRoomIds = selectedRoomArray.map((roomId) =>
      getRoomId(rooms, roomId)
    );
    if (selectedRoomIds.length > 0) {
      try {
        const response = await fetchRoomData(selectedRoomIds);
        const dataRoom = response.map((element) => {
          return element.data[0].data;
        });
        const dataTimesValue = dataRoom.map((element) => {
          return element.map((data) => {
            return data;
          });
        });
        const resultData = dataTimesValue.map((elements) => {
          return elements.map((element) => {
            const timestamp = new Date(element.Timestamp).getTime();
            const value = element.Value;
            return [timestamp, value];
          });
        });
        setData(resultData);
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleSelectedItems(option) {
    setSelectedRoomArray(option);
  }

  return (
    <div className="app">
      <ParameterButton
        buttonPopup={buttonPopup}
        setButtonPopup={setButtonPopup}
      />
      <DropdownRoom
        onSelect={handleSelectedItems}
        defaultSelected={["Pollux"]}
        placeholder="Sélectionner des pièces"
      />
      <HighchartsFlags data={data} />
      <Temperature />
    </div>
  );
}

export default App;
