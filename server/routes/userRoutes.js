const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
// const { getUserUrls,editUserUrl, deleteUserUrl } = require('../controllers/dashboardcontroller');
// const authMiddleware = require('../middleware/authMiddleware'); // Ensure you have this middleware for authentication

// Existing auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// router.get('/urls', authMiddleware, getUserUrls);
// router.put('/url', authMiddleware, editUserUrl); // Use PUT for updating
// router.delete('/url/:urlId', authMiddleware, deleteUserUrl);

module.exports = router;
