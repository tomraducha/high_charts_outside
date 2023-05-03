function getRoomId(data, roomName) {
  return data[roomName];
}

function extractRoomNames(dataList) {
  const roomNames = dataList.map((element) => {
    return element.data.map((data) => {
      return data.space;
    });
  });

  return roomNames;
}

export { getRoomId, extractRoomNames };
