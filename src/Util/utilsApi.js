import axios from "axios";

async function fetchRoomData(selectedRoomIds) {
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD;
  const authString = username + ":" + password;
  const encodedAuthString = btoa(authString);

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
  return response;
}

export { fetchRoomData };
