const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Generates a JWT token
 * @param {Object} payload - Data to be included in the token
 * @param {string} expiresIn - Token expiration time
 * @returns {string} - JWT token
 */
const generateToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Verifies a JWT token
 * @param {string} token - JWT token to be verified
 * @returns {Object} - Decoded data from the token
 */
const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
