const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Mike Harrison"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mike Harrison"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    help: "/weather - return the weather for Toronto in JSON",
    name: "Mike Harrison"
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found.",
    title: "404 page",
    name: "Mike Harrison"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }

  geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error
      });
    } else {
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error
          });
        }
        res.send({
          location: location,
          forecast: forecastData,
          address: req.query.address
        });
      });
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  res.send({
    products: []
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found.",
    title: "404 page",
    name: "Mike Harrison"
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
