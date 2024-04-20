const Task = require("../model/taskModel");

// Controller for creating a new task

exports.createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const userID = req.body.userId;

    const userTasks = await Task.find({ userId: userID });
    console.log(userTasks);

    res.status(200).json(userTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAdmin = async (req, res) => {
  try {
    console.log(req.body.role);
    // Extract user ID from the request object

    const alltask = await Task.find();

    res.status(200).json(alltask);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

exports.adminupdatedata = async (req, res) => {
  const { id } = req.params;

  const taskid = await Task.findOne({ _id: id });
  console.log(taskid._id);

  if (taskid) {
    try {
      await Task.findByIdAndUpdate({ _id: taskid._id }, req.body);
      res.status(200).json({ msg: `${id} is updated`, data: req.body });
    } catch (error) {
      res.status(404).json(error.message);
    }
  } else {
    res.status(403).json("Permission denied");
  }
};

// Controller for updating a task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const userID = req.body.userId;

  const taskdata = await Task.findOne({ _id: id });
  const userdataId = taskdata.userId;

  if (userdataId === userID) {
    try {
      await Task.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).json(`${id} is updated`);
    } catch (error) {
      res.status(404).json("Task not found");
    }
  } else {
    res.status(403).json("Permission denied");
  }
};


exports.admindeltedata = async (req, res) => {
  const { id } = req.params;

  const taskdata = await Task.findOne({ _id: id });

  const userdataId = taskdata._id;

  if (userdataId) {
    try {
      await Task.findByIdAndDelete({ _id: userdataId });
      res.status(200).json({ msg: `${id} is deleted` });
    } catch (error) {
      res.status(404).json(error.message);
    }
  } else {
    res.status(403).json("Permission denied");
  }
};

// Controller for deleting a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const userID = req.body.userId;

  const taskdata = await Task.findOne({ _id: id });
  const userdataId = taskdata.userId;

  if (userdataId === userID) {
    try {
      await Task.findByIdAndDelete({ _id: id });
      res.status(200).json(`${id} is deleted`);
    } catch (error) {
      res.status(404).json("Task not found");
    }
  } else {
    res.status(403).json("Permission denied");
  }
};
