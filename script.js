serverURL = "https://weeny-backend.herokuapp.com/";

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

async function getData(url = "") {
  response = await fetch(url);
  return response.json();
}

shorten = (e) => {
  e.preventDefault();
  shortUrlText = document.getElementById("shorturltext");
  shortUrlText.innerHTML = "";
  if (checkSlug(e, 1)) {
    return;
  }
  var url = document.getElementById("longUrl");
  var longurl = url.value;
  var slug = document.getElementById("slug").value;
  postData("http://localhost:8000/addlink", {
    longURL: longurl,
    slug: slug,
  }).then((data) => {
    console.log(data);
    shortURL = document.getElementById("shorturl");

    shortUrlText.innerHTML =
      "Shortened Link : <a href=" +
      serverURL +
      data.slug +
      ">" +
      serverURL +
      data.slug +
      "</a>";
  });
};

checkSlug = (e, throughSubmit = 0) => {
  e.preventDefault();
  var slugWarning = document.getElementById("slugExists");
  slugWarning.innerHTML = "";
  slugWarning.style.display = "none";
  var slug = document.getElementById("slug").value;

  getData("http://localhost:8000/slug/" + slug).then((data) => {
    if (data.slug) {
      slugWarning.innerHTML =
        "That slug already exists :( Please choose another one.";
      slugWarning.style.color = "red";
      slugWarning.style.display = "block";
      return 1;
    } else {
      if (!throughSubmit) {
        slugWarning.innerHTML = "You're good to go!";
        slugWarning.style.color = "#118830";
        slugWarning.style.display = "block";
      }

      return 0;
    }
  });
};
