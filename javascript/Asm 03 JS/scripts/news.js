// API key
const NEWS_KEY = "a51a232db25d46949e7708340cc4cb82";

// https://newsapi.org/v2/top-headlines?country=us&apiKey=a51a232db25d46949e7708340cc4cb82

// country= [ae,ar,at,au,be,bg,br,ca,ch,cn,co,cu,cz,de,eg,fr,gb,gr,hk,hu,id,ie,il,in,it,jp,kr,lt,lv,ma,mx,my,ng,nl,no,nz,ph,pl,pt,ro,rs,ru,sa,se,sg,si,sk,th,tr,tw,ua,us,ve,za]
// &category= [business, entertainment, general, health, science, sports, technology]
// &pageSize=
// &page=

let currentPage = 1;
let defaultPageSize = 3; //default

let getURL = () => {
  if (currentUser[0]?.category === undefined) {
    return `https://newsapi.org/v2/top-headlines?country=us&pageSize=${defaultPageSize}&page=${currentPage}&apiKey=${NEWS_KEY}`;
  } else {
    return `https://newsapi.org/v2/top-headlines?country=us&category=${currentUser[0].category}&pageSize=${currentUser[0].pageSize}&page=${currentPage}&apiKey=${NEWS_KEY}`;
  }
};

let getNews = async () => {
  let url = getURL();
  let respond = await fetch(url);
  let data = await respond.json();

  return data;
};

let displayChangePage = (total) => {
  let maxPage =
    currentUser[0]?.pageSize === undefined
      ? Math.ceil(total / defaultPageSize)
      : Math.ceil(total / currentUser[0]?.pageSize);

  document.getElementById("btn-prev").style.display = "block";
  document.getElementById("page-num").innerText = currentPage;
  document.getElementById("btn-next").style.display = "block";
  if (currentPage == maxPage) {
    document.getElementById("btn-next").style.display = "none";
  }

  if (currentPage == 1) {
    document.getElementById("btn-prev").style.display = "none";
  }
};

let renderNews = (list) => {
  let content = ``;
  content += list
    .map((item) => {
      return `    
      <div class="card mb-3">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${item.urlToImage}" class="card-img" alt="${
        item.title
      }" />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${
                item.description == null ? "" : item.description
              }</p>
              <a href="${item.url}" class="btn btn-primary">View</a>
            </div>
          </div>
        </div>
      </div>    
    `;
    })
    .join("");

  document.getElementById("news-container").innerHTML = content;
};

// first render
getNews().then((data) => {
  displayChangePage(data.totalResults);
  renderNews(data.articles);
});

let nextBtn = document.getElementById("btn-next");
nextBtn.addEventListener("click", () => {
  currentPage++;
  // re-render
  getNews().then((data) => {
    displayChangePage(data.totalResults);
    renderNews(data.articles);
  });
});

let prevBtn = document.getElementById("btn-prev");
prevBtn.addEventListener("click", () => {
  currentPage--;
  // re-render
  getNews().then((data) => {
    displayChangePage(data.totalResults);
    renderNews(data.articles);
  });
});
