const MainConfig = {
  mainElementSelector: '[data-Googol-container]',
};

class Main {
  static initialize() {
    const main = document.querySelector(MainConfig.mainElementSelector);

    const initializedMain = new Main(main);
    initializedMain.initializeBehavior();
  }

  constructor(main) {
    this.main = main;
    this.Googol = Math.pow(10, 100);
    this.perLoad = 5000;
    this.requiredLoads = this.Googol / this.perLoad;

    this.performedLoadsCount = 0;

    this.loadMoreRobins();
  }

  initializeBehavior() {
    document.addEventListener(
      'scroll',
      debounce(() => this.nextAction(), 50),
    );
  }

  nextAction() {
    if (
      this.main.getBoundingClientRect().bottom <= 10 * window.innerHeight &&
      this.performedLoadsCount < this.requiredLoads
    ) {
      this.loadMoreRobins();
    } else if (this.performedLoadsCount === this.requiredLoads) {
      const end = document.createElement('h2');
      end.innerHTML = 'You passed a Googol of Robins!';
      this.main.appendChild(end);
      this.incrementPerformedLoadCount();
    }
  }

  loadMoreRobins() {
    for (let i = 0; i < this.perLoad; i++) {
      const span = document.createElement('span');
      span.innerHTML += 'Robin ';
      this.main.appendChild(span);
    }
    this.incrementPerformedLoadCount();
  }

  incrementPerformedLoadCount() {
    this.performedLoadsCount += 1;
  }
}

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

document.addEventListener('DOMContentLoaded', () => {
  Main.initialize();
});
