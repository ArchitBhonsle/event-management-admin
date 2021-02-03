module.exports = function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
