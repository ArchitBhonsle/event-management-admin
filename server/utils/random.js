module.exports = {
  randomNumber: (min, max) => Math.floor(Math.random() * (max - min) + min),
  randomChoice: () => Math.random() < 0.5,
};
