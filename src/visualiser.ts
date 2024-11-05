import AudioMotionAnalyzer from 'audiomotion-analyzer';
import { $audio } from './stream';

export const setupVisualiser = () => {
  const $viz =
    document.querySelector<HTMLCanvasElement>('#viz') || new HTMLDivElement();

  const visualiser = new AudioMotionAnalyzer($viz, {
    source: $audio,
    mode: 6,
    lumiBars: true,
    frequencyScale: 'mel',
    // gradient: 'prism',
    gradient: 'rainbow',
    // gradient: 'steelblue',
  });
  visualiser.stop();

  let vizActive = false;
  const $vizControl = document.querySelector<HTMLButtonElement>('#viz-control');
  $vizControl?.addEventListener('click', (e: MouseEvent) => {
    e.stopImmediatePropagation();
    vizActive = !vizActive;
    if (vizActive) {
      visualiser.start();
    } else {
      visualiser.stop();
    }
    document.body.classList.toggle('viz-active', vizActive);
    const $icon =
      $vizControl.querySelector<HTMLSpanElement>('.icon') ||
      new HTMLDivElement();
    $icon.innerText = vizActive ? 'bar_chart_off' : 'bar_chart';
  });
};
