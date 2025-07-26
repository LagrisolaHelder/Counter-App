const apiKey = "7b8cab7e976a44f284f230458252507 "; // Replace with your actual API key

// On page load, show weather for Dili
window.onload = () => {
  getWeather("Dili");
};

function getWeather(city) {
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        // Show friendly error if city not found or other issues
        throw new Error("City not found or API error");
      }
      return response.json();
    })
    .then(data => {
      const { name, country } = data.location;
      const { temp_c, condition } = data.current;

      resultDiv.innerHTML = `
        <h3>${name}, ${country}</h3>
        <img src="${condition.icon}" alt="${condition.text}">
        <p><strong>Temperature:</strong> ${temp_c}°C</p>
        <p><strong>Condition:</strong> ${condition.text}</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

// Called when user clicks the button
 function onSearchClick() {
  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value.trim();

  if (city === "") {
    showInputAlert("Please enter a city name");
    return;  // Don't call getWeather or change weather result
  }

  getWeather(city);
}

function showInputAlert(message) {
  const cityInput = document.getElementById("cityInput");
  cityInput.value = "";
  cityInput.placeholder = message;
  cityInput.style.border = "2px solid red";

  // After 2.5 seconds, restore original style and placeholder
  setTimeout(() => {
    cityInput.placeholder = "Enter city (e.g., London)";
    cityInput.style.border = "";
  }, 2500);
}
