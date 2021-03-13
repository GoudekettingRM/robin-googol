const ChapterDownloadConfig = {
  formElementSelector: '[data-download-chapter-form]',
  chapterContainer: '[data-chapter-container]',
  chapterNumberContainer: '[data-chapter-number]',
  loadingPlaceholder: '[data-loading-placeholder]',
};

class ChapterDownload {
  static initialize() {
    const form = document.querySelector(
      ChapterDownloadConfig.formElementSelector,
    );

    const initializedChapterDownload = new ChapterDownload(form);
    initializedChapterDownload.initializeBehavior();
  }

  constructor(form) {
    this.form = form;
    this.inputField = form.querySelector('input[type=number]');
    this.Googol = 100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n;

    this.maxChapterNumber = this.Googol / 5000n; // One googol / 5000 words per chapter

    this.chapterContainer = document.querySelector(
      ChapterDownloadConfig.chapterContainer,
    );

    this.chapterNumberContainer = this.chapterContainer.querySelector(
      ChapterDownloadConfig.chapterNumberContainer,
    );

    this.loadingPlaceholder = document.querySelector(
      ChapterDownloadConfig.loadingPlaceholder,
    );

    for (let i = 0; i < 5000; i++) {
      const span = document.createElement('span');
      span.innerHTML += 'Robin ';
      this.chapterContainer.appendChild(span);
    }
  }

  initializeBehavior() {
    this.form.addEventListener('submit', (e) => this.getChapter(e));
  }

  getChapter(event) {
    event.preventDefault();

    if (!this.inputField.value) {
      alert('You have to enter your favorite chapter, silly!');
      return null;
    }

    const chapterNumber = BigInt(this.inputField.value);

    if (chapterNumber > this.maxChapterNumber) {
      alert(
        "Don't be silly! That chapter number doesn't exist of course. That's way to large!",
      );
      return null;
    }

    this.chapterContainer.classList.add('hidden');
    this.loadingPlaceholder.classList.remove('hidden');

    setTimeout(() => {
      this.loadingPlaceholder.classList.add('hidden');
      this.chapterNumberContainer.textContent = chapterNumber;
      this.chapterContainer.classList.remove('hidden');
    }, 1500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ChapterDownload.initialize();
});
