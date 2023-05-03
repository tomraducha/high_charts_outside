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

async function fetchAllRoom() {
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD;
  const authString = username + ":" + password;
  const encodedAuthString = btoa(authString);

  try {
    const response = await axios.get(
      `https://192.168.12.146:443/v2/history?retrieveValues=true&period=lastYear`,
      {
        headers: {
          mode: "cors",
          Authorization: "Basic " + encodedAuthString,
        },
      }
    );

    const spaces = response.data
      .map((element) => {
        return element.space !== null && element.space !== undefined
          ? element.space
          : null;
      })
      .filter((space) => space !== null);

    return spaces;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}

export { fetchRoomData, fetchAllRoom };
