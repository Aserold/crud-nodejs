const data = require('../../sql3-data');

module.exports = async (req, res) => {
  let result = await data.listUsers()
  res.writeHead(200);
  res.end(JSON.stringify(result));
};
