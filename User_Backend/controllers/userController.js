const userModel = require('../models/userModel');

const userController = {
    login: async (req, res) => {
        const { firstName, lastName, email } = req.body;
        const nameRegex = /^[a-zA-Z]{3,}$/;
        if (!firstName || !lastName || !nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            return res.status(400).json({ success: false, message: 'First name and last name must be at least 3 characters and alphabets only' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }
        const user = await userModel.findUser(firstName, lastName, email);
        if (user) {
            res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    },

    addUser: async (req, res) => {
        const { firstName, lastName, email, mobile } = req.body;
        const newUser = await userModel.addUser(firstName, lastName, email, mobile);
        res.status(201).json({ message: 'User added', user: newUser });
    },

    getAllUsers: async (req, res) => {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const { email, mobile } = req.body;
        const updatedUser = await userModel.updateUser(id, email, mobile);
        if (updatedUser) {
            res.status(200).json({ message: 'User updated', user: updatedUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        const deletedUser = await userModel.deleteUser(id);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    },

    searchUser: async (req, res) => {
        const { query } = req.query;
        const results = await userModel.searchUser(query);
        res.status(200).json(results);
    }
};

module.exports = userController;
