let backgroundImageTimeout: number;
let $backgroundImage: HTMLImageElement;
export const getBackgroundImage = async () => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?orientation=landscape&topics=nature`,
    {
      headers: {
        Authorization: 'Client-ID la51HBPSyV4V977opMSqLECl5jTW1TfKfT9P4ax7WOA',
      },
    }
  );
  const data = await response.json();

  const $img = new Image();
  $img.addEventListener('load', () => {
    const $attribution =
      document.querySelector<HTMLAnchorElement>('#background-attribution') ||
      new HTMLAnchorElement();
    $attribution.href = data.links.html;
    $attribution.innerHTML = `Unsplash photo by ${data.user.name}`;
    // $attribution.innerHTML = `<span>${
    //   data.description || data.alt_description
    // }</span> <span>by ${data.user.name}</span>`;

    const $newBackgroundImage = document.createElement('img');
    $newBackgroundImage.className = 'background-img swapping';
    $newBackgroundImage.src = $img.src;
    document.body.appendChild($newBackgroundImage);

    setTimeout(() => {
      $newBackgroundImage.classList.remove('swapping');
    }, 100);

    setTimeout(() => {
      if ($backgroundImage) {
        $backgroundImage.remove();
      }
      $backgroundImage = $newBackgroundImage;
    }, 3000);
  });
  $img.src = data.urls.full;

  backgroundImageTimeout = setTimeout(() => {
    getBackgroundImage();
  }, 1000 * 60 * 5);
};

const $backgroundIcon =
  document.querySelector<HTMLSpanElement>('#background .icon') ||
  new HTMLSpanElement();
$backgroundIcon.addEventListener('click', (e: MouseEvent) => {
  e.stopImmediatePropagation();
  if (backgroundImageTimeout) {
    clearTimeout(backgroundImageTimeout);
    getBackgroundImage();
  }
});
