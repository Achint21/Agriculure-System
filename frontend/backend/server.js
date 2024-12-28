const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

// Create the HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  // Handle POST request for form submission
  if (req.method === 'POST' && parsedUrl.pathname === '/register') {
    let body = '';

    // Collect data from the request body
    req.on('data', chunk => {
      body += chunk;
    });

    // Once the data is fully received
    req.on('end', () => {
      const userData = JSON.parse(body);  // Parse the incoming JSON data

      // Read the existing users from users.json, or create a new array if it doesn't exist
      fs.readFile('users.json', (err, data) => {
        let users = [];

        if (err) {
          console.log('Error reading file:', err);
        } else {
          users = JSON.parse(data);
        }

        // Add the new user to the array
        users.push(userData);

        // Save the updated user list back to the users.json file
        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
          if (err) {
            console.log('Error writing file:', err);
          }
        });
      });

      // Respond with a success message
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('User registered successfully!');
    });

  } else {
    // Serve the registration form (HTML file)
    if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/index.html') {
      fs.readFile('./frontend/index.html', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error loading HTML file');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    } else {
      // Serve static CSS and JS files
      if (parsedUrl.pathname === '/style.css') {
        fs.readFile('./frontend/style.css', (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error loading CSS file');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/css' });
          res.end(data);
        });
      } else if (parsedUrl.pathname === '/script.js') {
        fs.readFile('./frontend/script.js', (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error loading JS file');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'application/javascript' });
          res.end(data);
        });
      }
    }
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});