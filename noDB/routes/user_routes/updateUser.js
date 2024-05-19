const data = require('../../data');

module.exports = (req, res, id) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const parsedBody = JSON.parse(body);
      let { name = null, age = null } = parsedBody;
      if (name) parsedBody.name = name.toString();
      if (age) parsedBody.age = +age;
      if (
        Object.entries(parsedBody).length === 2 &&
        name &&
        +age !== 0 &&
        isFinite(age)
      ) {
        const result = data.updateUser(+id, parsedBody);
        if (result) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: result }));
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(400);
          res.end(
            JSON.stringify({ message: 'Invalid input. Or user not found.' })
          );
        }
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(400);
        res.end(
          JSON.stringify({
            message: "Only fields 'name' and 'age' allowed and required.",
          })
        );
      }
    } catch (error) {
      console.log(error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid JSON' }));
    }
  });
};
