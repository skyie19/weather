async function getWeather() {
  const location = document.getElementById('locationInput').value;
  const apiKey = '654406d7f3d240ebb6d111805252005';
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Location not found");

    const data = await response.json();
    const weather = data.current.condition.text.toLowerCase();
    const bg = getBackgroundImage(weather);

    document.getElementById('appContainer').style.backgroundImage = `url('${bg}')`;

    const weatherHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p><strong>Temperature:</strong> ${data.current.temp_c} °C</p>
      <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
      <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
      <p><strong>Condition:</strong> ${data.current.condition.text}</p>
      <img src="https:${data.current.condition.icon}" alt="weather icon">
    `;

    document.getElementById('weatherInfo').innerHTML = weatherHTML;
  } catch (error) {
    document.getElementById('weatherInfo').innerHTML = `<p style="color:#ff6b6b;">Error: ${error.message}</p>`;
  }
}

function getBackgroundImage(condition) {
  condition = condition.toLowerCase();

  if (condition.includes("cloud")) return "images/cloudy.jpg";
  if (condition.includes("rain")) return "images/rain.jpg";
  if (condition.includes("clear") || condition.includes("sunny")) return "images/clear.jpg";
  if (condition.includes("snow")) return "images/snow.jpg";
  if (condition.includes("storm") || condition.includes("thunder")) return "images/storm.jpg";
  if (condition.includes("fog") || condition.includes("mist") || condition.includes("haze")) return "images/fog.jpg";
  if (condition.includes("drizzle")) return "images/drizzle.jpg";

  return "images/default.jpg"; // fallback
}
