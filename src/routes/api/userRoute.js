const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/UserController');
const AuthController = require('../../controllers/AuthController');
const authMiddleware = require('../../middleware/authMiddleware');

// Auth route
router.post('/login', AuthController.login);

// Register route
router.post('/users', UserController.create);

/** Protedcted routes */
router.get('/users', authMiddleware, UserController.getAll);
router.get('/users/:id', authMiddleware, UserController.getById);
router.put('/users/:id', authMiddleware, UserController.update);
router.delete('/users/:id', authMiddleware, UserController.delete);

module.exports = router;
