const users = [
    { id: 1, firstName: 'Chitta', lastName: 'Mohapatra', email: 'chitta@example.com', mobile: '1234567890' },
    { id: 2, firstName: 'John', lastName: 'Doe', email: 'john@example.com', mobile: '0987654321' }
];

// Functional Model object
const userModel = {
    getAllUsers: () => users,

    findUser: (firstName, lastName, email) => {
        return users.find(u => u.firstName === firstName && u.lastName === lastName && u.email === email);
    },

    addUser: (firstName, lastName, email, mobile) => {
        const newUser = { id: users.length + 1, firstName, lastName, email, mobile };
        users.push(newUser);
        return newUser;
    },

    updateUser: (id, email, mobile) => {
        const userIndex = users.findIndex(u => u.id === parseInt(id));
        if (userIndex !== -1) {
            users[userIndex] = {
                ...users[userIndex],
                email: email || users[userIndex].email,
                mobile: mobile || users[userIndex].mobile
            };
            return users[userIndex];
        }
        return null;
    },

    deleteUser: (id) => {
        const userIndex = users.findIndex(u => u.id === parseInt(id));
        if (userIndex !== -1) {
            return users.splice(userIndex, 1)[0];
        }
        return null;
    },
searchUser: (query) => {
        return users.filter(u => u.email === query || u.mobile === query);
    }

};

module.exports = userModel;