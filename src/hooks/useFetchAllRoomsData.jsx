/* BTIB */
import { fetchAllRooms } from "../Util/utilsApi";
import { transformArrayToObject } from "../Util/utilsApp";
/* Libs & plugins */
import { useState, useEffect } from "react";

function useFetchAllRooms() {
  const [rooms, setRooms] = useState({});

  useEffect(() => {
    async function fetchAllRoomsData() {
      try {
        const response = await fetchAllRooms();
        const roomsObject = transformArrayToObject(response);
        setRooms(roomsObject);
      } catch (error) {
        console.error("Error during data recovery:", error);
      }
    }

    fetchAllRoomsData();
  }, []);

  return rooms;
}

export default useFetchAllRooms;
