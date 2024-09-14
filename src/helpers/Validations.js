const bcrypt = require('bcrypt');

class Validations {
    /**
     * Checks if required fields are present in the request and validates them.
     *
     * @param {Object} request - Request data.
     * @param {Object} fields - Required fields associated with custom messages.
     * @return {Array<string>} - List of error messages for missing or invalid fields.
     */
    static checkFields(request, fields) {
        const missingFields = [];

        for (const [field, rules] of Object.entries(fields)) {
            // Split rules and extract field label
            const rulesArray = rules.split('|');
            const fieldLabel = rulesArray[0] || field; // Use field name if label is not provided
            const isRequired = rulesArray.includes('required');

            // Check if the field is required and is missing or empty
            if (isRequired && (!request.hasOwnProperty(field) || request[field] === null || request[field].toString().trim() === '')) {
                missingFields.push(`${fieldLabel} is required.`);
            }

            // Additional validations based on rules
            if (request.hasOwnProperty(field) && request[field] !== null && request[field].toString().trim() !== '') {
                const value = request[field];

                // Validate string fields
                if (rulesArray.includes('string') && typeof value !== 'string') {
                    missingFields.push(`The ${fieldLabel} must be a string.`);
                }

                // Validate numeric fields
                if (rulesArray.includes('numeric') && isNaN(value)) {
                    missingFields.push(`The ${fieldLabel} must be a number.`);
                }

                // Validate email fields
                if (rulesArray.includes('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    missingFields.push(`The ${fieldLabel} must be a valid email address.`);
                }
            }
        }

        return missingFields;
    }

    // Check password against hashed password stored in the database
    static validateHash(user, password) {
        return bcrypt.compare(password, user.password);
    }
}

module.exports = Validations;
