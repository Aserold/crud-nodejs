const data = require('../../sql3-data');

module.exports = async (req, res, id) => {
  const result = await data.getUser(+id);
  if (result) {
    res.writeHead(200);
    res.end(JSON.stringify(result));
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'User not found' }));
  }
};
