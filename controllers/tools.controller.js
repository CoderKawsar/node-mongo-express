let tools = [
  { id: 1, name: "Hammer" },
  { id: 2, name: "Scrue Driver" },
  { id: 3, name: "Wrench" },
];

module.exports.getAllTools = (req, res) => {
  const { limit, page } = req.query;
  res.json(tools.slice(0, limit));
};

module.exports.addATool = (req, res) => {
  tools.push(req.body);
  res.send(tools);
};

module.exports.getToolDetails = (req, res) => {
  const { id } = req.params;
  const foundTool = tools.find((tool) => tool.id == id);
  res.send(foundTool);
};

module.exports.updateTool = (req, res) => {
  const { id } = req.params;
  const newData = tools.find((tool) => tool.id == id);
  newData.id = id;
  newData.name = req.body.name;

  res.send(newData);
};

module.exports.deleteTool = (req, res) => {
  const { id } = req.params;
  tools = tools.filter((tool) => tool.id != id);

  res.send(tools);
};
