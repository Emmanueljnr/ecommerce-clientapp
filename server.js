// // server.js
// const { createServer } = require('https');
// const { parse } = require('url');
// const next = require('next');
// const fs = require('fs');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// // SSL certificate details
// const options = {
//   key: fs.readFileSync('path/to/your/localhost.key'), // Replace with the path to your key file
//   cert: fs.readFileSync('path/to/your/localhost.cert'), // Replace with the path to your cert file
// };

// app.prepare().then(() => {
//   createServer(options, (req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   }).listen(3000, () => {
//     console.log('> Ready on https://localhost:3000');
//   });
// });
