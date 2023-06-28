/**
 * Checks if two arrays of objects `selectedRooms` are equal by comparing their properties.
 * @param {Array} arr1 - The first array of objects to compare.
 * @param {Array} arr2 - The second array of objects to compare.
 * @returns {boolean} - Returns true if the arrays are equal, otherwise returns false.
 */

function areSelectedRoomsEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArr1 = arr1.slice().sort((a, b) => a.spaceId - b.spaceId);
  const sortedArr2 = arr2.slice().sort((a, b) => a.spaceId - b.spaceId);

  for (let i = 0; i < sortedArr1.length; i++) {
    const obj1 = sortedArr1[i];
    const obj2 = sortedArr2[i];

    if (
      obj1.space !== obj2.space ||
      obj1.spaceId !== obj2.spaceId ||
      obj1.id !== obj2.id
    ) {
      return false;
    }
  }

  return true;
}

export { areSelectedRoomsEqual };
