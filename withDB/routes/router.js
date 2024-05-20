const ListUsers = require('./user_routes/listUsers');
const createUser = require('./user_routes/createUser');
const getUser = require('./user_routes/getUser');
const updateUser = require('./user_routes/updateUser');
const deleteUser = require('./user_routes/deleteUser');

function UserRouter(req, res, method, nextPath = false) {
  if (!nextPath) {
    return method === 'GET' ? ListUsers(req, res) : createUser(req, res);
  } else {
    switch (method) {
      case 'GET':
        return getUser(req, res, nextPath);
        break;
      case 'PUT':
        return updateUser(req, res, nextPath);
        break;
      case 'DELETE':
        return deleteUser(req, res, nextPath);
        break;
      default:
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(405);
        res.end(JSON.stringify({ message: 'Method Not Allowed' }));
    }
  }
}

module.exports = UserRouter;
