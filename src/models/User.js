const { client } = require('../database/connection');
const bcrypt = require('bcrypt');

class User {
    /**
     * @param {string} name - The name of the user
     * @param {string} email - The email of the user
     * @param {string} password - The password of the user
     * @param {number} age - The age of the user
     */
    constructor(name, email, password, age) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
    }

    /**
     * Save the user to the database.
     *
     * @returns {Promise} A promise that resolves to the result of the insert operation.
     */
    async save() {
        const db = client.db();
        const hashedPassword = await bcrypt.hash(this.password, 10);
        return db.collection('users').insertOne({
            name: this.name,
            email: this.email,
            password: hashedPassword,
            age: this.age
        });
    }

    /**
     * Find all users in the database.
     *
     * @returns {Promise<Array>} A promise that resolves to an array of users.
     */
    static find() {
        const db = client.db();
        return db.collection('users').find().toArray();
    }

    /**
     * Find a user by ID.
     *
     * @param {string} id - The ID of the user.
     * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not.
     */
    static findById(id) {
        const db = client.db();
        return db.collection('users').findOne({ _id: id });
    }

    /**
     * Find a user by email.
     *
     * @param {string} email - The email of the user.
     * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not.
     */
    static async findByEmail(email) {
        const db = client.db();
        return db.collection('users').findOne({ email: email });
    }

    /**
     * Update a user by ID.
     *
     * @param {string} id - The ID of the user.
     * @param {Object} data - The data to update.
     * @param {Object} options - Options for the update operation.
     * @returns {Promise<Object|null>} A promise that resolves to the updated user object if found, or null if not.
     */
    static findByIdAndUpdate(id, data, options) {
        const db = client.db();
        return db.collection('users').findOneAndUpdate(
            { _id: id },
            { $set: data },
            { returnDocument: 'after', ...options }
        );
    }

    /**
     * Delete a user by ID.
     *
     * @param {string} id - The ID of the user.
     * @returns {Promise<Object|null>} A promise that resolves to the result of the delete operation.
     */
    static findByIdAndDelete(id) {
        const db = client.db();
        return db.collection('users').findOneAndDelete({ _id: id });
    }
}

module.exports = User;
