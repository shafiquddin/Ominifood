///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions

const year = document.querySelector(".year");
const nav = document.querySelector(".btn-nav-mobile");
const header = document.querySelector(".header");
const close = document.querySelector(".close");
const currentYear = new Date().getFullYear();
year.textContent = currentYear;

nav.addEventListener("click", function () {
  header.classList.toggle("nav-open");
});

/// smooth scrolling for safari older versions

const allinks = document.querySelectorAll("a:link");

allinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    if (this.classList.contains("main-nav-link")) {
      header.classList.remove("nav-open");
    }
  });
});

/// sticky nav

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  },
);

obs.observe(sectionHeroEl);

/// flex gap for safari

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
