// App ID: e4bde839-35e8-4447-84c3-033186d7b245
// Key: jXsc2QdkjNLM9LiDrBYoalPGGy21A382
const root = document.querySelector('.site-wrap');
const nytapi = 'jXsc2QdkjNLM9LiDrBYoalPGGy21A382';
// const nytapi = 'uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0';
const nytUrl = `https://api.nytimes.com/svc/topstories/v2/travel.json?api-key=${nytapi}`;
const limit = 6;
const categories = [
  'obituaries',
  'fashion',
  'books',
  'business',
  'health',
  'food',
  'movies',
  'travel',
];
const nav = document.querySelector('.main-menu');
const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
const markup = `
<ul>
  <a
  href="#main-menu-toggle"
  id="main-menu-close"
  class="menu-close"
  aria-label="Close main menu"
  >
  <span class="sr-only">Close main menu</span>
  <span class="fa fa-close" aria-hidden="true"></span>
  </a>
  ${navItemsObject
    .map(
      (item) => `<li><a href="${item.link}">${capitalize(item.label)}</a></li>`
    )
    .join('')}
</ul> 
`;

console.log(markup);

nav.innerHTML = markup;

// const logo = nav.querySelector('.main-menu ul li');
// logo.classList.add('logo');
// logo.innerHTML = '<a href="#"><img src="img/logo.svg" /></a>';
// logo
const logo = document.createElement('li');
const navList = nav.querySelector('nav ul');
logo.classList.add('logo');
logo.innerHTML = '<a href="#"><img src="img/logo.svg" /></a>';
navList.prepend(logo);

function fetchArticles(section) {
  fetch(
    `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${nytapi}`
  )
    .then((response) => response.json())
    .then((myJson) => renderStories(myJson));
}

fetch(nytUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    renderStories(myJson);
  });

function renderStories(data) {
  var sectionHead = document.createElement('div');
  sectionHead.id = data.section;
  sectionHead.classList.add('scroll-margin');
  sectionHead.innerHTML = `<h3 class="section-head" id="${data.section.toLowerCase()}">${
    data.section
  }</h3>`;
  root.prepend(sectionHead);

  stories = data.results.slice(0, limit); // NEW
  console.log(data.results);

  stories.map((story) => {
    storyEl = document.createElement('div');
    storyEl.className = 'entry';
    storyEl.innerHTML = `
    <img src="${
      story.multimedia.length > 0 ? story.multimedia[0].url : 'img/no-image.png'
    }" />  
    <div class='card'>
      <h3><a target="_blank" href="${story.short_url}">${story.title}</a>
      <div class='related'>${story.byline}</div>
      </h3>
      <p>${story.abstract}</p>
      <p class='related'>${story.des_facet}</p>
    </div>
    `;
    sectionHead.append(storyEl); // NEW
  });
}

function getArticlesByCategory(cat) {
  cat.forEach(function (category) {
    fetchArticles(category);
  });
}

getArticlesByCategory(categories);
