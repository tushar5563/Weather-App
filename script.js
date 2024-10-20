const input = document.querySelector("input");
const btn = document.getElementById("btn");
const icon = document.querySelector(".icon");  // Corrected: querySelector for class
const weather = document.querySelector(".weather");  // Corrected: querySelector for class
const temperature = document.querySelector(".temperature");  // Corrected: querySelector for class
const description = document.querySelector(".description");  // Corrected: querySelector for class

btn.addEventListener("click", () => {
  let city = input.value;
  getWeather(city);
});

function getWeather(city) {
  // Correct API URL structure without curly braces
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=14493b8b05975f2e55613e486a0a4014&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);

      const iconCode = data.weather?.[0]?.icon;  // Safely accessing data.weather[0].icon
      const temp = data.main?.temp ?? "N/A";  // Fallback value if temp is undefined
      const desc = data.weather?.[0]?.description ?? "No description available";  // Fallback description

      // Update the DOM elements with fetched data
      if (iconCode) {
        icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="Weather icon" />`;
      } else {
        icon.innerHTML = "No icon available";
      }
      
      temperature.innerHTML = `Temperature: ${temp} °C`;

      const weatherCity = data.name ?? "Unknown city";
      const weatherCountry = data.sys?.country ?? "Unknown country";
      weather.innerHTML = `${weatherCity}, ${weatherCountry}`;

      description.innerHTML = desc;
    })
    .catch(error => console.log('Error:', error));
}
