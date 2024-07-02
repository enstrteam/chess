class Slider {
  constructor(
    viewport,
    wrapper,
    slides,
    nextButton,
    prevButton,
    currentPage,
    totalPages
  ) {
    this.viewport = viewport;
    this.wrapper = wrapper;
    this.slides = slides;
    this.nextButton = nextButton;
    this.prevButton = prevButton;
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.viewportWidth = viewport.getBoundingClientRect().width;
    this.slideWidth = slides[0].getBoundingClientRect().width;
    this.slidesCount = slides.length;
    this.slidesPerPage = Math.floor(this.viewportWidth / this.slideWidth);
    this.gap =
      this.slidesPerPage > 1
        ? Math.floor(
            (this.viewportWidth - this.slidesPerPage * this.slideWidth) /
              (this.slidesPerPage - 1)
          )
        : 20;
    this.pages = Math.floor(this.wrapper.scrollWidth / this.viewportWidth);
    this.scrollValue = (this.slideWidth + this.gap) * this.slidesPerPage;
    this.currentIndex = 0;
    this.nextIndex = 0;
    this.lastIndex = 0;
  }

  init(cycle = true) {
    this.timing = this.slideWidth > 500 ? 700 : 400;

    if (cycle) {
      this.createClone();
      this.lastIndex = this.pages;
    } else {
      this.lastIndex = this.pages - 1;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", () => {
          this.scrollTo(Number(item.getAttribute("id").slice(-1)));
        });
      });
    }

    this.currentPage.innerHTML = this.currentIndex + 1;
    this.totalPages.innerHTML = this.pages;
    this.nextButton.addEventListener("click", () => {
      this.nextPage(cycle);
    });
    this.prevButton.addEventListener("click", () => {
      this.prevPage(cycle);
    });
  }

  createClone() {
    for (let i = 0; i < this.slidesPerPage; i++) {
      const clone = this.slides[i].cloneNode(true);
      clone.classList.add("cloneNode");
      this.wrapper.appendChild(clone);
    }
  }

  nextPage(cycle) {
    this.nextIndex = this.currentIndex + 1;

    if (this.nextIndex > this.lastIndex && !cycle) {
      return;
    }

    if (this.nextIndex > this.lastIndex) {
      this.nextIndex = 0;
      this.wrapper.animate(
        [
          {
            transform: `translateX(${-this.scrollValue * this.currentIndex}px)`,
          },
          { transform: `translateX(${-this.scrollValue * this.nextIndex}px)` },
        ],
        {
          duration: 0,
        }
      );
      this.currentIndex = this.nextIndex;
      this.nextIndex = this.currentIndex + 1;
    }

    this.wrapper.animate(
      [
        { transform: `translateX(${-this.scrollValue * this.currentIndex}px)` },
        { transform: `translateX(${-this.scrollValue * this.nextIndex}px)` },
      ],
      {
        duration: this.timing,
        easing: "ease-out",
        fill: "forwards",
      }
    );
    this.currentIndex = this.nextIndex;
    this.currentPage.innerHTML =
      this.currentIndex < this.lastIndex ? this.currentIndex + 1 : 1;

    if (!cycle) {
      this.prevButton.classList.remove("slider__button_disabled");

      document.getElementById(`slide${this.currentIndex + 1}`).checked = true;

      if (this.currentIndex == this.lastIndex) {
        this.nextButton.classList.add("slider__button_disabled");
      }
    }
  }

  prevPage(cycle) {
    this.nextIndex = this.currentIndex - 1;

    if (this.nextIndex < 0 && !cycle) {
      return;
    }

    if (this.nextIndex < 0) {
      this.nextIndex = this.lastIndex;
      this.wrapper.animate(
        [
          {
            transform: `translateX(${-this.scrollValue * this.currentIndex}px)`,
          },
          { transform: `translateX(${-this.scrollValue * this.nextIndex}px)` },
        ],
        {
          duration: 0,
        }
      );
      this.currentIndex = this.nextIndex;
      this.nextIndex = this.currentIndex - 1;
    }

    this.wrapper.animate(
      [
        { transform: `translateX(${-this.scrollValue * this.currentIndex}px)` },
        { transform: `translateX(${-this.scrollValue * this.nextIndex}px)` },
      ],
      {
        duration: this.timing,
        easing: "ease-out",
        fill: "forwards",
      }
    );
    this.currentIndex = this.nextIndex;
    this.currentPage.innerHTML =
      this.currentIndex < this.lastIndex ? this.currentIndex + 1 : 1;

    if (!cycle) {
      this.nextButton.classList.remove("slider__button_disabled");
      document.getElementById(`slide${this.currentIndex + 1}`).checked = true;

      if (this.currentIndex == 0) {
        this.prevButton.classList.add("slider__button_disabled");
      }
    }
  }

  scrollTo(id) {
    while (this.currentIndex != id - 1) {
      if (id > this.currentIndex) {
        this.nextPage(cycle);
      } else {
        this.prevPage(cycle);
      }
    }
  }
}

const playersSlider = new Slider(
  document.querySelector(".players__viewport"),
  document.querySelector(".players__cards"),
  document.querySelectorAll(".card"),
  document.querySelector(".players__slider>.next-button"),
  document.querySelector(".players__slider>.prev-button"),
  document.querySelector(
    ".players__slider>.slider__pages>.slider__current-page"
  ),
  document.querySelector(".players__slider>.slider__pages>.slider__total-pages")
);
const historySlider = new Slider(
  document.querySelector(".history__viewport"),
  document.querySelector(".history__stages"),
  document.querySelectorAll(".stage"),
  document.querySelector(".history__slider>.next-button"),
  document.querySelector(".history__slider>.prev-button"),
  document.querySelector(
    ".history__slider>.slider__pages>.slider__current-page"
  ),
  document.querySelector(".history__slider>.slider__pages>.slider__total-pages")
);

playersSlider.init();
historySlider.init((cycle = false));

setInterval(() => {
  playersSlider.nextButton.click();
  console.log("NNN");
}, 4000);
