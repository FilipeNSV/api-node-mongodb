const UserService = require('../services/UserService');
const Validations = require('../helpers/Validations');
const { generateToken } = require('../services/jwtService');

class AuthController {
    /**
     * Login/Auth.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Define validation rules
            const validationRules = {
                email: 'string|required|email',
                password: 'string|required'
            };

            // Validate request body
            const errors = Validations.checkFields(req.body, validationRules);

            if (errors.length > 0) {
                // If there are validation errors, return a 400 status with error messages
                return res.status(400).json({ errors });
            }

            // Retrieve user by email and password
            const user = await UserService.getUserByEmail(email);

            // Assuming password verification is done outside (e.g., bcrypt for hashing)
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const isMatch = await Validations.validateHash(user, password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Generate a JWT token
            const token = generateToken({ id: user._id, email: user.email });

            // Respond with token
            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

module.exports = new AuthController();
