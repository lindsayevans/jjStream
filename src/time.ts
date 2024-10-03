export const showTime = () => {
  const $time = document.getElementById('time') || new HTMLDivElement();

  setInterval(() => {
    const time = new Intl.DateTimeFormat('en-AU', {
      timeStyle: 'short',
      timeZone: 'Australia/Sydney',
    }).format(new Date());
    $time.innerText = time;
  }, 1000);
};
