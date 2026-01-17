/**
 * WeatherForecastClient provides weather data for the startpage using OpenWeatherMap API
 * Handles fetching and parsing weather information for a given location
 */
class WeatherForecastClient {
  /**
   * Create a new WeatherForecastClient instance
   * @param {string} location - The location to fetch weather data for
   */
  constructor(location) {
    // OpenWeatherMap API key for authentication
    this.appId = window.WEATHER_API_KEY || "";
    // Construct API URL with location and metric units
    this.latitude = 42.9956;
    this.longitude = -71.4548;
    this.url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&units=metric&appid=${this.appId}`;
    this.forecastUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${this.latitude}&lon=${this.longitude}&units=metric&appid=${this.appId}`;
  }

  /**
   * Fetch and return the current weather for the configured location
   * @returns {Promise<{temperature: number, condition: string, description: string, clouds: number | null}>} Weather data with temperature and condition
   */
  async getWeather() {
    return await fetch(this.url)
      .then((res) => res.json())
      // Convert to string and back to ensure proper JSON parsing
      .then((json) => JSON.stringify(json))
      .then((json) => JSON.parse(json))
      .then((data) => {
        // Round temperature to nearest whole number
        const temperature = Math.round(data.main.temp);
        // Extract and normalise weather condition
        const condition = data.weather[0].main.toLowerCase();
        const description = (data.weather[0].description || "").toLowerCase();
        const clouds = typeof data.clouds?.all === "number" ? data.clouds.all : null;

        return {
          temperature,
          condition,
          description,
          clouds,
        };
      })
      .catch((err) => console.warn("Weather API returned an error:", err));
  }

  /**
   * Fetch hourly and daily forecast data
   * @returns {Promise<{timezoneOffset: number, hourly: Array, daily: Array}>}
   */
  async getForecast() {
    return await fetch(this.forecastUrl)
      .then((res) => res.json())
      .then((json) => JSON.stringify(json))
      .then((json) => JSON.parse(json))
      .then((data) => ({
        timezoneOffset: data.timezone_offset,
        hourly: data.hourly || [],
        daily: data.daily || [],
      }))
      .catch((err) => console.warn("Weather forecast API returned an error:", err));
  }
}
