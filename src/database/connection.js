const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDB = async () => {
    try {
        await client.connect();
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = { connectDB, client };
