const express = require('express');
const cors = require('cors');
const UserController = require('./controllers/userController');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Routes
app.post('/api/login', UserController.login);
app.post('/api/users', UserController.addUser);
app.get('/api/users', UserController.getAllUsers);
app.put('/api/users/:id', UserController.updateUser);
app.delete('/api/users/:id', UserController.deleteUser);
app.get('/api/users/search', UserController.searchUser);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});