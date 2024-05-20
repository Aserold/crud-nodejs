const data = require('../../sql3-data');

module.exports = (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const parsedBody = JSON.parse(body);
      let { name = false, age = false } = parsedBody;
      if (name) parsedBody.name = name.toString();
      if (age) parsedBody.age = +age;
      if (
        Object.entries(parsedBody).length === 2 &&
        name &&
        +age !== 0 &&
        isFinite(age)
      ) {
        const result = await data.createUser(parsedBody);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            data: result,
          })
        );
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: "Only fields 'name' and 'age' allowed and required.",
          })
        );
      }
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid JSON' }));
    }
  });
};
