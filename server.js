/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Prince Student ID: 145685228 Date: 19/02/2024
*
* Published URL:
*
********************************************************************************/
const express = require("express");
const legoData = require("./modules/legoSets");
const path = require("path");

const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Set up routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/lego/sets", (req, res) => {
  const theme = req.query.theme;
  if (theme) {
    legoData.getSetsByTheme(theme)
      .then((sets) => res.json(sets))
      .catch((error) => res.status(404).send(error));
  } else {
    legoData.getAllSets()
      .then((sets) => res.json(sets))
      .catch((error) => res.status(404).send(error));
  }
});

app.get("/lego/sets/:set_num", (req, res) => {
  const set_num = req.params.set_num;
  legoData.getSetByNum(set_num)
    .then((set) => res.json(set))
    .catch((error) => res.status(404).send(error));
});

//
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

//
legoData.Initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Initialization failed:", error);
  });
