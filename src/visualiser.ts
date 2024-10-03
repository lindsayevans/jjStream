import AudioMotionAnalyzer from 'audiomotion-analyzer';
import { $audio } from './stream';

export const showVisualiser = () => {
  const $viz =
    document.querySelector<HTMLCanvasElement>('#viz') || new HTMLDivElement();

  new AudioMotionAnalyzer($viz, {
    source: $audio,
    mode: 6,
    lumiBars: true,
    frequencyScale: 'mel',
    // gradient: 'prism',
    gradient: 'rainbow',
    // gradient: 'steelblue',
  });

  let vizActive = true;
  const $vizControl = document.querySelector<HTMLButtonElement>('#viz-control');
  $vizControl?.addEventListener('click', (e: MouseEvent) => {
    e.stopImmediatePropagation();
    vizActive = !vizActive;
    document.body.classList.toggle('viz-active', vizActive);
    const $icon =
      $vizControl.querySelector<HTMLSpanElement>('.icon') ||
      new HTMLDivElement();
    $icon.innerText = vizActive ? 'bar_chart_off' : 'bar_chart';
  });
};
