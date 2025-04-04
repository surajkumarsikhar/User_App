const { MongoClient } = require('mongodb');

// MongoDB Atlas connection string (replace with your own)
const uri = 'mongodb+srv://thissuraj03:Suraj003@cluster0.ohveb.mongodb.net/';
const client = new MongoClient(uri);

let db;

async function connectDB() {
    if (!db) {
        await client.connect();
        db = client.db('user_management');
    }
    console.log("DB Connected.")
    return db;
}

module.exports = connectDB;