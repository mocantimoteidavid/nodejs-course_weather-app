const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static assets delivery
app.use(express.static(publicDirectoryPath));


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Timotei M."
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Timotei M."
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        paragraph: "Help paragraph...",
        name: "Timotei M."
    });
});

app.get("/weather", (req, res, next) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address."
        });
    }

    const { address } = req.query;


    geocode(address, (error, geocodeData = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
    
        const { latitude, longitude, placeName } = geocodeData;
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }

            res.send({
                forecast: forecastData,
                location: placeName,
            });
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Article not found.",
        paragraph: "Paragraph",
        name: "Timotei M.",
        errorMessage: "This article was not found."
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        paragraph: "Paragraph",
        name: "Timotei M.",
        errorMessage: "This page was not found."
    });
});



app.listen(port, () => {
    console.log(`Server is running and listening on port ${port}.`);
});