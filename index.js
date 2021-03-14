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
    this.Googol = 100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n;
    this.perLoad = 5000n;
    this.requiredLoads = this.Googol / this.perLoad;

    this.performedLoadsCount = 0n;

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
      setTimeout(() => this.loadMoreRobins(), 0);
    } else if (this.performedLoadsCount === this.requiredLoads) {
      const end = document.createElement('h2');
      end.innerHTML = 'You passed a Googol of Robins!';
      this.main.appendChild(end);
      this.incrementPerformedLoadCount();
    }
  }

  loadMoreRobins() {
    const spanWrapper = document.createElement('span');
    for (let i = 0; i < this.perLoad / 20n; i++) {
      const span = document.createElement('span');
      span.innerHTML +=
        'Robin Robin Robin Robin Robin Robin Robin Robin Robin Robin Robin Robin Robin Robin Robin Robin Robin Robin Robin ';
      spanWrapper.appendChild(span);
    }
    this.main.appendChild(spanWrapper);
    this.incrementPerformedLoadCount();
  }

  incrementPerformedLoadCount() {
    this.performedLoadsCount += 1n;
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
