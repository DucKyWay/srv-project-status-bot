const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const mongoClient = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

module.exports = {
    connectDB: async () => {
        try {
            await mongoClient.connect();
            return mongoClient.db('srv_bot_status').collection('server_database1');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    },
    connectDBS: async () => {
        try {
            await mongoClient.connect();
            return mongoClient.db('srv_bot_status').collection('send_data');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    },
    connectDBNC: async () => {
        try {
            await mongoClient.connect();
            return mongoClient.db('srv_bot_status');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    },
    connectP: async () => {
        try {
            await mongoClient.connect();
            return mongoClient.db('admin');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    },
    closeConnection: async () => {
        try {
            await mongoClient.close();
            console.log('MongoDB connection closed.');
        } catch (error) {
            console.error('Error closing MongoDB connection:', error);
        }
    }
};
