const connectDB = require('./db');

const userModel = {
    // Get all users
    getAllUsers: async () => {
        const db = await connectDB();
        return await db.collection('users').find().toArray();
    },

    // Find user for login
    findUser: async (firstName, lastName, email) => {
        const db = await connectDB();
        return await db.collection('users').findOne({ firstName, lastName, email });
    },

    // Add user
    addUser: async (firstName, lastName, email, mobile) => {
        const db = await connectDB();
        const usersCollection = db.collection('users');
        const historyCollection = db.collection('history');

        const users = await usersCollection.find().toArray();
        const newUser = { id: users.length + 1, firstName, lastName, email, mobile };
        await usersCollection.insertOne(newUser);

        // Log to history
        await historyCollection.insertOne({
            action: 'create',
            user: newUser,
            timestamp: new Date().toISOString()
        });

        return newUser;
    },

    // Update user
    updateUser: async (id, email, mobile) => {
        const db = await connectDB();
        const usersCollection = db.collection('users');
        const historyCollection = db.collection('history');

        const user = await usersCollection.findOne({ id: parseInt(id) });
        if (!user) return null;

        const updates = {};
        if (email && email !== user.email) updates.email = email;
        if (mobile && mobile !== user.mobile) updates.mobile = mobile;

        if (Object.keys(updates).length === 0) return user;

        const updatedUser = await usersCollection.findOneAndUpdate(
            { id: parseInt(id) },
            { $set: updates },
            { returnDocument: 'after' }
        );

        // Log to history
        if (updates.email) {
            await historyCollection.insertOne({
                action: 'emailupdate',
                user: updatedUser,
                timestamp: new Date().toISOString()
            });
        }
        if (updates.mobile) {
            await historyCollection.insertOne({
                action: 'phoneupdate',
                user: updatedUser,
                timestamp: new Date().toISOString()
            });
        }

        return updatedUser;
    },

    // Delete user
    deleteUser: async (id) => {
        const db = await connectDB();
        const usersCollection = db.collection('users');
        const historyCollection = db.collection('history');

        const user = await usersCollection.findOne({ id: parseInt(id) });
        if (!user) return null;

        await usersCollection.deleteOne({ id: parseInt(id) });

        // Log to history
        await historyCollection.insertOne({
            action: 'delete',
            user,
            timestamp: new Date().toISOString()
        });

        return user;
    },

    // Search users
    searchUser: async (query) => {
        const db = await connectDB();
        return await db.collection('users').find({
            $or: [{ email: query }, { mobile: query }]
        }).toArray();
    }
};

module.exports = userModel;
