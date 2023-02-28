module.exports.getAllTools = (req, res) => {
  res.send("Tools found!");
};

module.exports.addATool = (req, res) => {
  res.send("A Tool added!");
};

module.exports.getToolDetails = (req, res) => {
  const { id } = req.params;
  res.send("Tool details served of id " + id);
};
