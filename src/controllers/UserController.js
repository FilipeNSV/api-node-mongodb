const UserService = require('../services/UserService');
const Validations = require('../helpers/Validations');

class UserController {
    /**
     * Create a new user.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async create(req, res) {
        try {
            // Define validation rules
            const validationRules = {
                name: 'Name|string|required',
                email: 'Email|string|required|email',
                password: 'Password|string|required',
                age: 'Age|numeric'
            };

            // Validate request body
            const errors = Validations.checkFields(req.body, validationRules);

            if (errors.length > 0) {
                // If there are validation errors, return a 400 status with error messages
                return res.status(400).json({ errors });
            }

            // Create user if validation passes
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Get all users.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getAll(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Get a user by ID.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getById(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Update a user by ID.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async update(req, res) {
        try {
            // Define validation rules
            const validationRules = {
                name: 'Name|string',
                email: 'Email|string|email',
                password: 'Password|string',
                age: 'Age|numeric'
            };

            // Validate request body if it contains data
            const errors = Validations.checkFields(req.body, validationRules);

            if (errors.length > 0) {
                // If there are validation errors, return a 400 status with error messages
                return res.status(400).json({ errors });
            }

            const user = await UserService.updateUser(req.params.id, req.body);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Delete a user by ID.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async delete(req, res) {
        try {
            const result = await UserService.deleteUser(req.params.id);
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
