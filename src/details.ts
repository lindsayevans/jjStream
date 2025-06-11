import { PLAYING_NOW_URL } from './main';

const $title = document.getElementById('title') || new HTMLDivElement();
const $artist = document.getElementById('artist') || new HTMLDivElement();
const $history = document.getElementById('history') || new HTMLDivElement();
const history: string[] = [];
let nextUpdate: number;

export const getDetails = async () => {
  fetch(PLAYING_NOW_URL)
    .then((x) => x.json())
    .then((x) => {
      let details = '';
      let title = '';
      let artist = '';

      if (x.now.recording) {
        title = x.now.recording.title;
        artist = x.now.recording.artists
          .map((artist) => artist.name)
          .join(', ');
        details = `${title} - ${artist}`;

        if (
          history.length === 0 ||
          (history.length > 0 && history[history.length - 1] !== details)
        ) {
          history.push(details);
          populateHistory();
        }
      }

      $title.innerHTML = title;
      $artist.innerHTML = artist;
      if (nextUpdate) {
        clearTimeout(nextUpdate);
      }
      nextUpdate = setTimeout(
        getDetails,
        new Date(x.next_updated).getTime() - new Date().getTime()
      );
    });
};

export const populateHistory = () => {
  if (history.length > 0) {
    $history.innerHTML = history
      .map(
        (x) =>
          `<li><a href="https://google.com/search?q=${encodeURIComponent(
            x
          )}" target="_blank">${x}</a></li>`
      )
      .join('');
    $history.scrollTop = $history.scrollHeight;
  }
};
