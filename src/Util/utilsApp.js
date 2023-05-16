function getRoomId(rooms, roomId) {
  return rooms[roomId];
}

function extractRoomNames(dataList) {
  const roomNames = dataList.map((element) => {
    return element.data.map((data) => {
      return data.space;
    });
  });

  return roomNames;
}

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
