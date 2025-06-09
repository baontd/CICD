const http = require("http");

let totalCalls = 0;
let history = [];

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });

    const url = req.url;
    const method = req.method;

    if (url === "/sum" && method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const data = JSON.parse(body);
          const { num1, num2 } = data;

          if (typeof num1 !== "number" || typeof num2 !== "number") {
            const errorResponse = { error: "Invalid input" };
            history.push({
              endpoint: "/sum",
              input: data,
              output: errorResponse,
            });
            return res.end(JSON.stringify(errorResponse));
          }

          const sum = num1 + num2;
          totalCalls++;

          const result = { sum: sum };
          history.push({
            endpoint: "/sum",
            input: data,
            output: result,
          });

          res.end(JSON.stringify(result));
        } catch (e) {
          const errorResponse = { error: "Invalid JSON" };
          res.end(JSON.stringify(errorResponse));
        }
      });
    } else if (url === "/count-sum" && method === "GET") {
      const result = { totalCalls: totalCalls };
      res.end(JSON.stringify(result));
    } else if (url === "/current-time" && method === "GET") {
      const currentTime = new Date().toISOString();
      const result = { currentTime: currentTime };

      history.push({
        endpoint: "/current-time",
        input: {},
        output: result,
      });

      res.end(JSON.stringify(result));
    } else if (url === "/history" && method === "GET") {
      res.end(JSON.stringify({ history: history }));
    } else {
      res.end(JSON.stringify({ error: "Endpoint not found" }));
    }
  })
  .listen(80, '0.0.0.0', () => {
    console.log("Server is running on port 80");
  });
