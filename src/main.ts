import { getWeather } from './weather';
import { playStream } from './stream';
import { populateHistory, getDetails } from './details';
import { showTime } from './time';
import { setupVisualiser } from './visualiser';
import { getBackgroundImage } from './background';

export const PLAYLIST_URL =
  'https://mediaserviceslive.akamaized.net/hls/live/2038315/doublejnsw/index.m3u8';
export const PLAYING_NOW_URL =
  'https://music.abcradio.net.au/api/v1/plays/doublej/now.json?tz=Australia%2FSydney';
export const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-33.88782587331829&longitude=151.17536428068186&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code&forecast_days=1';

showTime();
playStream();
getDetails();
getWeather();
populateHistory();
setupVisualiser();
getBackgroundImage();
