const request = require("postman-request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&limit=1`;

    request( {url, json: true}, (error, { body: { features } } = {}) => {
        if (error) {
            callback("Unexpected error", undefined);
        } else if (!features || !features.length) {
            callback("Couldn't get coordinates", undefined);
        } else {
            const placeName = features[0].place_name;
            const latitude = features[0].center[1];
            const longitude = features[0].center[0];
            callback(undefined, { placeName, latitude, longitude });
        }
    })
}

module.exports = geocode;
