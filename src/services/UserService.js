const User = require('../models/User');

class UserService {
    /**
     * Create a new user.
     *
     * @param {Object} data - The data for the new user.
     * @param {string} data.name - The name of the user.
     * @param {string} data.email - The email of the user.
     * @param {string} data.password - The password of the user.
     * @param {number} data.age - The age of the user.
     * @returns {Promise<Object>} A promise that resolves to the result of the insert operation.
     */
    async createUser(data) {
        const user = new User(data.name, data.email, data.password, data.age);
        return user.save();
    }

    /**
     * Get all users.
     *
     * @returns {Promise<Array>} A promise that resolves to an array of users.
     */
    async getAllUsers() {
        return User.find();
    }

    /**
     * Get a user by ID.
     *
     * @param {string} id - The ID of the user.
     * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not.
     */
    async getUserById(id) {
        return User.findById(id);
    }

    /**
     * Get a user by email.
     *
     * @param {string} email - The email of the user.
     * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not.
     */
    async getUserByEmail(email) {
        return User.findByEmail(email);
    }

    /**
     * Update a user by ID.
     *
     * @param {string} id - The ID of the user.
     * @param {Object} data - The data to update.
     * @param {Object} [options] - Options for the update operation.
     * @param {boolean} [options.new=false] - Whether to return the updated document.
     * @returns {Promise<Object|null>} A promise that resolves to the updated user object if found, or null if not.
     */
    async updateUser(id, data, options = { new: true }) {
        return User.findByIdAndUpdate(id, data, options);
    }

    /**
     * Delete a user by ID.
     *
     * @param {string} id - The ID of the user.
     * @returns {Promise<Object|null>} A promise that resolves to the result of the delete operation.
     */
    async deleteUser(id) {
        return User.findByIdAndDelete(id);
    }
}

module.exports = new UserService();
