module.exports = function (req, _res, next) {
  console.log(`[${req.method.slice(0, 3)}] ~ ${req.url}`);
  next();
};
