module.exports.getRandomItems = function getRandomItems(array, numItems) {
  const shuffled = array.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numItems);
};
