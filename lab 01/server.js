const http = require('http');

const server = http.createServer((req, res) => {
    
    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.end('<h1>Welcome to the Home Page!</h1>');
    } 
    else if (req.url === '/about') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.end('<h1>About Us</h1>');
    } 
    // Naya API Route
    else if (req.url === '/api') {
        res.setHeader('Content-Type', 'application/json'); // Browser ko batana ke ye JSON hai
        res.statusCode = 200;
        const data = { 
            message: 'Hello, API!', 
            status: 'success',
            user: 'Ali' 
        };
        res.end(JSON.stringify(data)); // Object ko string bana kar bhej rahe hain
    } 
    else {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;
        res.end('<h1>404: Page Not Found</h1>');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});