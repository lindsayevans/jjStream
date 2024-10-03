import { PLAYING_NOW_URL } from './main';

const $details = document.getElementById('details') || new HTMLDivElement();
const $history = document.getElementById('history') || new HTMLDivElement();
const history: string[] = [];
let nextUpdate: number;

export const getDetails = async () => {
  fetch(PLAYING_NOW_URL)
    .then((x) => x.json())
    .then((x) => {
      let details = '';

      if (x.now.recording) {
        details = `${x.now.recording.title} - ${x.now.recording.artists
          .map((artist) => artist.name)
          .join(', ')}`;

        if (
          history.length === 0 ||
          (history.length > 0 && history[history.length - 1] !== details)
        ) {
          history.push(details);
          populateHistory();
        }
      }

      $details.innerHTML = details;
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
