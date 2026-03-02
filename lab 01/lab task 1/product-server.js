const http = require("http");
const url = require("url");

// Sample Product Data (Database Simulation)
const products = [
    { name: "Gaming Laptop", price: 1500, category: "electronics" },
    { name: "Office Laptop", price: 900, category: "electronics" },
    { name: "Smart Phone", price: 700, category: "electronics" },
    { name: "Headphones", price: 150, category: "accessories" },
    { name: "Keyboard", price: 80, category: "accessories" },
    { name: "Gaming Mouse", price: 120, category: "accessories" },
    { name: "Smart TV", price: 1200, category: "electronics" }
];


// Create Server
const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    // ================= SEARCH ROUTE =================
    if (path === "/search") {

        let result = [...products];

        // ----------- Keyword Search (q) -----------
        if (query.q) {

            const keywords = query.q.toLowerCase().split(" ");

            result = result.filter(product =>
                keywords.every(word =>
                    product.name.toLowerCase().includes(word)
                )
            );
        }

        // ----------- Price Filtering -----------
        if (query.minPrice) {
            const min = Number(query.minPrice);
            result = result.filter(p => p.price >= min);
        }

        if (query.maxPrice) {
            const max = Number(query.maxPrice);
            result = result.filter(p => p.price <= max);
        }

        // ----------- Sorting -----------
        if (query.sort === "price") {
            result.sort((a, b) => a.price - b.price);
        }

        if (query.sort === "name") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        // ----------- Display Result -----------
        res.writeHead(200, { "Content-Type": "text/plain" });

        if (result.length === 0) {
            res.end("No products found.");
            return;
        }

        let output = "Search Results:\n\n";

        result.forEach((p, index) => {
            output += `${index + 1}. ${p.name}\n`;
            output += `   Price: $${p.price}\n`;
            output += `   Category: ${p.category}\n\n`;
        });

        res.end(output);
    }

    // ================= HOME ROUTE =================
    else if (path === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to Product Server.\nUse /search to find products.");
    }

    // ================= 404 =================
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - Page Not Found");
    }

});


// Start Server
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});