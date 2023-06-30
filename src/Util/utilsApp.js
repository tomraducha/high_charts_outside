/**
 * Returns the room ID for the specified room from the rooms object.
 **/
function getRoomId(rooms, roomId) {
  return rooms[roomId];
}

/**
 * Extracts and returns room names from an array of data objects.
 **/
function extractRoomNames(dataList) {
  const roomNames = dataList.map((element) => {
    return element.data.map((data) => {
      return data.space;
    });
  });

  return roomNames;
}

/**
 * Transforms an array of objects with 'space' and 'sourceId' properties
 * into a single object with 'space' as keys and 'sourceId' as values.
 **/
function transformArrayToObject(array) {
  let newObject = {};

  for (let element of array) {
    if (element.space && element.sourceId) {
      newObject[element.space] = element.sourceId;
    }
  }
  return newObject;
}

export { getRoomId, extractRoomNames, transformArrayToObject };
