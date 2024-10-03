import Hls from 'hls.js';

import { PLAYLIST_URL } from './main';

export const $audio =
  document.querySelector<HTMLAudioElement>('#player') || new HTMLAudioElement();

export const playStream = () => {
  const hls = new Hls();
  hls.loadSource(PLAYLIST_URL);
  if ($audio) {
    hls.attachMedia($audio);
    hls.on(Hls.Events.MANIFEST_PARSED, (x) => {
      $audio?.play();
    });
  }

  document.body.addEventListener('click', () => {
    if ($audio?.paused) {
      $audio.currentTime = $audio.duration - 1;
      $audio.play();
    } else {
      $audio?.pause();
    }
  });
};
