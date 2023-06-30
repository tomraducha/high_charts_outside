/* BTIB */
import { fetchAllRooms } from "../util/utilsApi";
import { transformArrayToObject } from "../util/utilsApp";
/* Libs & plugins */
import { useState, useEffect } from "react";

function useFetchAllRooms() {
  const [rooms, setRooms] = useState({});

  useEffect(() => {
    fetchAllRoomsData();
  }, []);

  ////////////////////////////////////////////////////////////////
  // Methods
  ////////////////////////////////////////////////////////////////

  async function fetchAllRoomsData() {
    try {
      const response = await fetchAllRooms();
      const roomsObject = transformArrayToObject(response);
      setRooms(roomsObject);
    } catch (error) {
      console.error("Error during data recovery:", error);
    }
  }

  ////////////////////////////////////////////////////////////////
  // JSX
  ////////////////////////////////////////////////////////////////

  return rooms;
}

export default useFetchAllRooms;
