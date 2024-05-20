const data = require('../../sql3-data');

module.exports = async (req, res, id) => {
  const result = await data.deleteUser(id);
  if (result) {
    res.writeHead(204);
    res.end();
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'User not found' }));
  }
};
