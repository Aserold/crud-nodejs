const http = require('http');
const UserRouter = require('./routes/router');

const requestListener = (req, res) => {
  const urlPath = req.url;
  const method = req.method;
  const nextPath = urlPath.startsWith('/users/')
    ? +urlPath.split('/').pop()
    : null;

  if (urlPath === '/users') {
    UserRouter(req, res, method);
  } else if (urlPath.startsWith('/users/')) {
    if (isFinite(nextPath) && nextPath !== null && nextPath !== '') {
      UserRouter(req, res, method, nextPath);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(404);
      res.end(JSON.stringify({ message: 'Route not found' }));
    }
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
};

const PORT = 3000;
http.createServer(requestListener).listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
