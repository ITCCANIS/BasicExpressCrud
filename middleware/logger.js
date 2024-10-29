function logging(req, res, next) {
  console.log("Logging...");
  //   console.log(`NODE_ENV:${process.env.NODE_ENV}`);
  next();
}
function authenticating(req, res, next) {
  console.log("Auth...");
  next();
}

module.exports = { logging, authenticating };
