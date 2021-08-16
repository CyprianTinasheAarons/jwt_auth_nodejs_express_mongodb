const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    initial();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to the JWT Authentication Node.js Express MongoDB Example!",
  });
});

//routes
require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes.js")(app);

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
