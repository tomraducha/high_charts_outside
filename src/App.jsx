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
  const [selectedRoomIds, setSelectedRoomIds] = useState([]);
  const rooms = useFetchAllRooms();

  useEffect(() => {
    async function updateSelectedRoomIds() {
      const newSelectedRoomIds = await Promise.all(
        selectedRoomArray.map(async (roomId) => {
          return await getRoomId(rooms, roomId);
        })
      );
      setSelectedRoomIds(newSelectedRoomIds);
    }

    if (Object.keys(rooms).length > 0) {
      updateSelectedRoomIds();
    }
  }, [rooms, selectedRoomArray]);

  useEffect(() => {
    fetchData();
  }, [selectedRoomIds]);

  async function fetchData() {
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
