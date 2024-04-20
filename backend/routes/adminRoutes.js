const express = require('express');
const { isAdmin, auth } = require('../middleware/auth.middleware');
const { adminupdatedata, getAdmin, admindeltedata } = require('../controllers/taskController');
const router = express.Router();

router.get("/admintask",isAdmin,auth,getAdmin)
// Route to delete a task
router.patch("/admintask/:id",isAdmin,auth,adminupdatedata)
router.delete("/admintask/:id",isAdmin,auth,admindeltedata)
module.exports = router;