const mockDB = [];

module.exports = {
  listUsers: () => mockDB,
  createUser: (user) => {
    user.id = mockDB.length + 1;
    mockDB.push(user);
    return user;
  },
  getUser: (id) => mockDB.find((user) => user.id === id),
  updateUser: (id, info) => {
    const userIndex = mockDB.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      const updatedUser = { ...mockDB[userIndex], ...info };
      mockDB[userIndex] = updatedUser;
      return mockDB[userIndex];
    }
    return null;
  },
  deleteUser: (id) => {
    const userIndex = mockDB.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      mockDB.splice(userIndex, 1);
      return true;
    }
    return null;
  },
};
