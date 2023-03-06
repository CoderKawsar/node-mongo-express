const { ObjectId } = require("mongodb");
const { client } = require("../utils/dbConnect");

module.exports.getAllTools = async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    const query = {};
    const db = await client.db("toolsTestDB");
    const tools = await db
      .collection("tools")
      .find(query)
      .limit(+limit)
      .skip(+page * limit)
      .toArray();
    res.send({ success: true, data: tools });
  } catch (error) {
    next(error);
  }
};

module.exports.addATool = async (req, res, next) => {
  try {
    const tool = req.body;

    const db = await client.db("toolsTestDB");
    const result = await db.collection("tools").insertOne(tool);
    if (result.insertedId) {
      res.send({
        status: true,
        message: `Tool added with id: ${result.insertedId}`,
      });
    } else {
      res
        .status(400)
        .send({ success: false, message: "Something went wrong!" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getToolDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not a valid tool id" });
    }

    const query = { _id: ObjectId(id) };
    const db = await client.db("toolsTestDB");
    const foundTool = await db.collection("tools").findOne(query);
    if (foundTool) {
      res.status(200).json({ success: true, tool: foundTool });
    } else {
      res.status(200).json({
        success: false,
        message: `Couldn't find a tool with id: ${id}`,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateTool = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not a valid tool id" });
    }

    const query = { _id: ObjectId(id) };
    const db = await client.db("toolsTestDB");
    const updatedTool = await db.collection("tools").updateOne(query, {
      $set: req.body,
    });
    if (updatedTool.modifiedCount) {
      res
        .status(200)
        .json({ success: true, message: "Successfully updated the tool" });
    } else {
      res.status(200).json({
        success: false,
        message: `Couldn't update the tool of id: ${id}`,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTool = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not a valid tool id" });
    }

    const query = { _id: ObjectId(id) };
    const db = await client.db("toolsTestDB");
    const updatedTool = await db.collection("tools").deleteOne(query);
    if (updatedTool.deletedCount) {
      res
        .status(200)
        .json({ success: true, message: "Successfully deleted the tool" });
    } else {
      res.status(200).json({
        success: false,
        message: `Couldn't delete the tool of id: ${id}`,
      });
    }
  } catch (error) {
    next(error);
  }
};
