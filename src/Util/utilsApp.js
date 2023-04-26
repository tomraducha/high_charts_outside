function minFloor(floor) {
  return Math.min(...floor);
}
function maxFloor(floor) {
  return Math.max(...floor);
}
function getRoomId(data, roomName) {
  return data[roomName];
}
export { minFloor, maxFloor, getRoomId };
