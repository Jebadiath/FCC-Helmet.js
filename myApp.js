var express = require("express");
var app = express(); // Do Not Edit
var helmet = require("helmet");
var bcrypt = require("bcrypt");

app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard());
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
var NinetyDaysInMilliseconds = 90 * 24 * 60 * 60 * 1000;
app.use(helmet.hsts({ maxAge: NinetyDaysInMilliseconds, force: true }));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.noCache());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"]
    }
  })
);

module.exports = app;
const api = require("./server.js");
app.use(express.static("public"));
app.disable("strict-transport-security");
app.use("/_api", api);
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
