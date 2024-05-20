const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite3');

// db.run('DROP TABLE users');

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER NOT NULL
)`);

module.exports = {
  async createUser(user) {
    const lastId = await new Promise((res, rej) => {
      db.run(
        'INSERT INTO users (name, age) VALUES (?, ?)',
        [user.name, user.age],
        function (err) {
          if (err) {
            rej(err);
          } else {
            res(this.lastID);
          }
        }
      );
    });
    return { id: lastId, ...user };
  },
  
  async listUsers() {
    try {
      const users = await new Promise((res, rej) => {
        db.all('SELECT * FROM users', [], (err, rows) => {
          if (err) {
            rej(err);
          } else {
            res(rows);
          }
        });
      });
      return users;
    } catch (err) {
      return null;
    }
  },
  
  async getUser(id) {
    const user = await new Promise((res, rej) => {
      db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
          rej(err);
        } else {
          res(row);
        }
      });
    });
    return user;
  },
  
  async updateUser(id, updatedData) {
    const changes = await new Promise((res, rej) => {
      db.run(
        'UPDATE users SET name = ?, age = ? WHERE id = ?',
        [updatedData.name, updatedData.age, id],
        function (err) {
          if (err) {
            rej(err);
          } else {
            res(this.changes);
          }
        }
      );
    });
    if (changes === 0) {
      return null;
    }
    return this.getUser(id);
  },
  
  async deleteUser(id) {
    const changes = await new Promise((res, rej) => {
      db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err) {
          rej(err);
        } else {
          res(this.changes);
        }
      });
    });
    return changes > 0;
  },
};
