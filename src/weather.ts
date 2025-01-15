import { WEATHER_URL } from './main';

const getWeatherIcon = (code: number) => {
  switch (code) {
    case 0:
    case 1:
      return 'clear_day';
    case 2:
    case 3:
      return 'partly_cloudy_day';
    case 45:
    case 48:
      return 'foggy';
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
    case 51:
    case 53:
    case 55:
      return 'rainy';
    case 71:
    case 73:
    case 75:
    case 85:
    case 86:
    case 56:
    case 57:
    case 66:
    case 67:
    case 77:
      return 'cloudy_snowing';
    case 95:
      return 'thunderstorm';
    case 96:
    case 99:
      return 'weather_hail';
  }

  return 'cloud_off';
};
const $weather =
  document.querySelector<HTMLButtonElement>('#weather') ||
  new HTMLButtonElement();
const $weatherIcon =
  document.querySelector<HTMLSpanElement>('#weather .icon') ||
  new HTMLSpanElement();
const $temp = document.getElementById('temp') || new HTMLSpanElement();
const $apparentTemp =
  document.getElementById('apparent-temp') || new HTMLSpanElement();
const $humidity = document.getElementById('humidity') || new HTMLSpanElement();

export const getWeather = async () => {
  fetch(WEATHER_URL)
    .then((x) => x.json())
    .then((weather) => {
      $weatherIcon.innerText = getWeatherIcon(weather.current.weather_code);
      $temp.innerText =
        parseInt(weather.current.temperature_2m.toString(), 10) + '°';
      $apparentTemp.innerText =
        parseInt(weather.current.apparent_temperature, 10) + '°';
      $humidity.innerText =
        '(' + parseInt(weather.current.relative_humidity_2m, 10) + '%)';
      setTimeout(
        getWeather,
        1000 * 60 * 15 // 15min
      );
    });
};

$weather.addEventListener('click', (e: MouseEvent) => {
  e.stopImmediatePropagation();
  getWeather();
});
