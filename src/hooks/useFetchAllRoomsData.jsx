import { useState, useEffect } from "react";
import { fetchAllRooms } from "../Util/utilsApi";
import { transformArrayToObject } from "../Util/utilsApp";

function useFetchAllRooms() {
  const [rooms, setRooms] = useState({});

  useEffect(() => {
    const fetchAllRoomsData = async () => {
      try {
        const response = await fetchAllRooms();
        const roomsObject = transformArrayToObject(response);
        setRooms(roomsObject);
      } catch (error) {
        console.error("Error during data recovery:", error);
      }
    };

    fetchAllRoomsData();
  }, []);

  return rooms;
}

export default useFetchAllRooms;
