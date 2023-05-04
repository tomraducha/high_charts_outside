import axios from "axios";

const username = import.meta.env.VITE_USERNAME;
const password = import.meta.env.VITE_PASSWORD;
const authString = username + ":" + password;
const encodedAuthString = btoa(authString);

async function fetchRoomData(selectedRoomIds) {
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

async function fetchAllRoomId() {
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

    const spacesId = response.data
      .map((element) => {
        return element.spaceId !== null && element.spaceId !== undefined
          ? element.spaceId
          : null;
      })
      .filter((spaceId) => spaceId !== null);

    return spacesId;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}

async function fetchAllRooms() {
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

    const rooms = response.data
      .map((element) => {
        const space =
          element.space !== null && element.space !== undefined
            ? element.space
            : null;
        const spaceId =
          element.spaceId !== null && element.spaceId !== undefined
            ? element.spaceId
            : null;

        if (space !== null && spaceId !== null) {
          return { space, spaceId };
        } else {
          return null;
        }
      })
      .filter((room) => room !== null);
    return rooms;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}

export { fetchRoomData, fetchAllRoom, fetchAllRoomId, fetchAllRooms };
