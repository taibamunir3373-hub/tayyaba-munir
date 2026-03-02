// Import modules
const http = require("http");
const url = require("url");
// Create server
const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;
    // Home Route
    if (path === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to the homepage.");
    }
    // About Route
    else if (path === "/about") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("This is a simple Node.js server.");
    }
    // Greet Route
    else if (path === "/greet") {
        const name = query.name || "Guest";

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`Hello, ${name}!`);
    }
    // Math Route
    else if (path === "/math") {
        const a = Number(query.a);
        const b = Number(query.b);
        if (isNaN(a) || isNaN(b)) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Please provide valid numbers.");
        } else {
            const sum = a + b;

            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(`The sum of ${a} and ${b} is ${sum}`);
        }
    }

    // 404 Route
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - Page Not Found");
    }

});


// Start Server
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});