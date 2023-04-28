import { useEffect, useState } from "react";
import DropdownRoom from "./components/DropdownRoom";
import HighchartsFlags from "./components/HighChartsFlags/HighchartsFlags";
import axios from "axios";
import { minFloor, maxFloor, getRoomId } from "./Util/utilsApp";
import { rooms } from "./data/rooms";

function App() {
  const [data, setData] = useState([]);
  const [selectedRoomArray, setSelectedRoomArray] = useState(["Pollux"]);
  const [valuesCeilingFloor, setValuesCeilingFloor] = useState({
    ceiling: null,
    floor: null,
  });

  useEffect(() => {
    fetchData();
  }, [selectedRoomArray]);

  useEffect(() => {
    getAllValues(data);
  }, [data]);
  import.meta.env.VITE_BASE_URL;
  async function fetchData() {
    const username = import.meta.env.VITE_USERNAME;
    const password = import.meta.env.VITE_PASSWORD;
    const authString = username + ":" + password;
    const encodedAuthString = btoa(authString);

    const selectedRoomIds = selectedRoomArray.map((roomName) =>
      getRoomId(rooms, roomName)
    );

    if (selectedRoomIds.length > 0) {
      try {
        const response = await Promise.all(
          selectedRoomIds.map((roomId) =>
            axios.get(
              `https://192.168.12.146:443/v2/history/${roomId}?retrieveValues=true&period=lastYear`,
              {
                headers: {
                  mode: "cors",
                  Authorization: "Basic " + encodedAuthString,
                },
              }
            )
          )
        );
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

  function getAllValues(data) {
    const allValues = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        allValues.push(data[i][j][1]);
      }
    }
    const resultAllValues = allValues;
    const ceiling = maxFloor(resultAllValues);
    const floor = minFloor(resultAllValues);
    setValuesCeilingFloor({ ceiling, floor });
  }

  function handleSelect(option) {
    setSelectedRoomArray(option);
  }

  return (
    <div className="app">
      <DropdownRoom onSelect={handleSelect} />
      <HighchartsFlags
        data={data}
        ceiling={valuesCeilingFloor.ceiling}
        floor={valuesCeilingFloor.floor}
      />
    </div>
  );
}

export default App;
