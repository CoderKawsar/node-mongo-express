let count = 0;

const viewCount = (req, res, next) => {
  count++;
  console.log(count);
  //   res.send("Middleware executed!");
  next();
};

module.exports = viewCount;
