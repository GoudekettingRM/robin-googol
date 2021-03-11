const main = () => {
  const googol = Math.pow(10, 100);
  let newLoads = 0.5;

  const main = document.querySelector('main');

  loadTenThousandRobins(main);

  document.addEventListener(
    'scroll',
    debounce(() => {
      if (
        main.getBoundingClientRect().bottom <= 2 * window.innerHeight &&
        newLoads < googol
      ) {
        loadTenThousandRobins(main);
        newLoads += 0.5;
      } else if (newLoads === googol) {
        const end = document.createElement('h2');
        end.innerHTML = 'You passed a googol of Robins!';
        main.appendChild(end);
        newLoads += 0.5;
      }
    }),
    25,
  );
};

const loadTenThousandRobins = (main) => {
  for (let i = 0; i < 5000; i++) {
    const span = document.createElement('span');
    span.innerHTML += 'Robin ';
    main.appendChild(span);
  }
};

function debounce(callback, wait, immediate) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) callback.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) callback.apply(context, args);
  };
}

document.addEventListener('DOMContentLoaded', () => main());
