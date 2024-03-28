const express = require('express');
const router = express.Router();

const { createUser, activation, loginUser,getUser,logout, updateUser, updateAvatar, updateUserAddresses, deleteUserAddress, updateUserPassword } = require('../controller/user');
const { isAuthenticated } = require('../middleware/auth.js');
const {upload} = require('../multer');


router.post('/create-user',upload.single('file'), createUser);
router.post('/activation',activation);
router.post("/loginUser",loginUser);
router.get("/getuser",isAuthenticated,getUser);
router.get("/logout",isAuthenticated,logout);
router.put("/update-user-info",isAuthenticated,updateUser);
router.put("/update-user-avatar",isAuthenticated,upload.single('file'),updateAvatar);
router.put("/update-user-addresses",isAuthenticated,updateUserAddresses);
router.delete("/delete-user-address/:id",isAuthenticated,deleteUserAddress)
router.put("/update-password",isAuthenticated,updateUserPassword)



module.exports = router;

