import { useEffect, useState } from "react";
import DropdownRoom from "./components/DropdownRoom";
import HighchartsFlags from "./components/HighChartsFlags/HighchartsFlags";
import axios from "axios";
import { getRoomId } from "./Util/utilsApp";
import { rooms } from "./data/rooms";
import Temperature from "./components/Temperature";

function App() {
  const [data, setData] = useState([]);
  const [selectedRoomArray, setSelectedRoomArray] = useState(["Pollux"]);

  useEffect(() => {
    fetchData();
  }, [selectedRoomArray]);

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

  function handleSelect(option) {
    setSelectedRoomArray(option);
  }

  return (
    <div className="app">
      <DropdownRoom onSelect={handleSelect} />
      <HighchartsFlags data={data} />
      <Temperature />
    </div>
  );
}

export default App;
