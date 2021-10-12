function fetchWeatherForecast(address) {
    fetch(`/weather?address=${encodeURIComponent(address)}`).then((response) => {  
        response.json().then((data) => {
            if (data.error) {
                errorParagraph.textContent = data.error;
            } else {
                outputParagraph.textContent = data.location + '. ' + data.forecast;
            }
        });
    });
}

const weatherForm = document.querySelector('form');
const searchTerm = document.querySelector('input');
const outputParagraph = document.querySelector('#outputParagraph');
const errorParagraph = document.querySelector('#errorParagraph');

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    outputParagraph.textContent = "Loading...";
    errorParagraph.textContent = "";

    const location = searchTerm.value;
    fetchWeatherForecast(location);
})