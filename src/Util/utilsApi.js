/* Libs & plugins */
import axios from "axios";

const username = import.meta.env.VITE_USERNAME;
const password = import.meta.env.VITE_PASSWORD;
const baseUrl = import.meta.env.VITE_BASE_URL;
const urlSuffix = import.meta.env.VITE_URL_SUFFIX;
const authString = `${username}:${password}`;
const encodedAuthString = btoa(authString);
const headers = {
  mode: "cors",
  Authorization: `Basic ${encodedAuthString}`,
};

////////////////////////////////////////////////////////////////
// Methods
////////////////////////////////////////////////////////////////

async function fetchData(url, mapFunction) {
  try {
    const response = await axios.get(url, { headers });
    return response.data.map(mapFunction).filter(Boolean);
  } catch (error) {
    console.error("Error during data recovery:", error);
  }
}

async function fetchRoomData(selectedRoomIds) {
  return await Promise.all(
    selectedRoomIds.map((roomId) =>
      axios.get(`${baseUrl}/v2/history/${roomId}?${urlSuffix}`, {
        headers,
      })
    )
  );
}

async function fetchAllRoom() {
  return await fetchData(
    `${baseUrl}/v2/history?${urlSuffix}`,
    (element) => element.space || null
  );
}

async function fetchAllRoomId() {
  return await fetchData(
    `${baseUrl}/v2/history?${urlSuffix}`,
    (element) => element.sourceId || null
  );
}

async function fetchAllRooms() {
  return await fetchData(`${baseUrl}/v2/history?${urlSuffix}`, (element) => {
    const { space = null, sourceId = null } = element;
    return space && sourceId ? { space, sourceId } : null;
  });
}

async function fetchSpaceAndIdRooms() {
  return await fetchData(`${baseUrl}/v2/history?${urlSuffix}`, (element) => {
    const { space = null, id = null } = element;
    return space && id ? { space, id } : null;
  });
}

export {
  fetchRoomData,
  fetchAllRoom,
  fetchAllRoomId,
  fetchAllRooms,
  fetchSpaceAndIdRooms,
};
