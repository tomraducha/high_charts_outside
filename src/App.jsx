/* BTIB */
import DropdownRoom from "./components/DropdownRoom";
import HighchartsFlags from "./components/HighChartsFlags/HighchartsFlags";
import useFetchAllRooms from "./hooks/useFetchAllRoomsData";
import { getRoomId } from "./Util/utilsApp";
import Temperature from "./components/Temperature";
import ParameterButton from "./components/ParameterButton";
import { fetchRoomData } from "./Util/utilsApi";
/* Libs & plugins */
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [selectedRoomArray, setSelectedRoomArray] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [selectedRoomIds, setSelectedRoomIds] = useState([]);
  const rooms = useFetchAllRooms();

  useEffect(() => {
    if (Object.keys(rooms).length > 0) {
      const firstRoom = Object.keys(rooms)[1];
      setSelectedRoomArray([firstRoom]);
    }
  }, [rooms]);

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

  ////////////////////////////////////////////////////////////////
  // Event handlers
  ////////////////////////////////////////////////////////////////

  function handleSelectedItems(option) {
    setSelectedRoomArray(option);
  }

  ////////////////////////////////////////////////////////////////
  // Methods
  ////////////////////////////////////////////////////////////////

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

  ////////////////////////////////////////////////////////////////
  // JSX
  ////////////////////////////////////////////////////////////////

  return (
    <div className="app">
      <ParameterButton
        buttonPopup={buttonPopup}
        setButtonPopup={setButtonPopup}
      />
      <DropdownRoom
        onSelect={handleSelectedItems}
        defaultSelected={selectedRoomArray}
        placeholder="Sélectionner des pièces"
      />
      <HighchartsFlags data={data} />
      <Temperature />
    </div>
  );
}

export default App;
