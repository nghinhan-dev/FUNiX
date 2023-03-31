// API key
const NEWS_KEY = "a51a232db25d46949e7708340cc4cb82";

let currentPage = 1;
let defaultPageSize = 3; //default
let qSearch;
let url;

let getStr = () => {
  let str = document.getElementById("input-query").value;

  if (str == "") {
    Swal.fire({
      icon: "error",
      title: "Search content",
      text: "Cannot be empty!",
    });
    return false;
  }

  let encodedStr = encodeURIComponent(str);
  return encodedStr;
};

let search = () => {
  qSearch = getStr();
  url = getURL(qSearch);
  getSearchNews(url).then((data) => {
    displayChangePage(data.totalResults);
    renderNews(data.articles);
  });
};

let getURL = (txt) => {
  if (currentUser[0]?.pageSize === undefined) {
    return `https://newsapi.org/v2/everything?q=${txt}&pageSize=${defaultPageSize}&page=${currentPage}&apiKey=${NEWS_KEY}`;
  } else {
    return `https://newsapi.org/v2/everything?q=${txt}&pageSize=${currentUser[0].pageSize}&page=${currentPage}&apiKey=${NEWS_KEY}`;
  }
};

let getSearchNews = async (url) => {
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
            <img src="${
              item.urlToImage == null ? "" : item.urlToImage
            }" class="card-img" alt="${item.title}" />
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

let nextBtn = document.getElementById("btn-next");
nextBtn.addEventListener("click", () => {
  currentPage++;
  // re-render
  url = getURL(qSearch);
  getSearchNews(url).then((data) => {
    displayChangePage(data.totalResults);
    renderNews(data.articles);
  });
});

let prevBtn = document.getElementById("btn-prev");
prevBtn.addEventListener("click", () => {
  currentPage--;
  // re-render
  url = getURL(qSearch);
  getSearchNews(url).then((data) => {
    displayChangePage(data.totalResults);
    renderNews(data.articles);
  });
});
