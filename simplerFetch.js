var url = location.href.split("#")[0]; //set url removing any anchors
url = url.split("?")[0]; //remove any parameters from url
var gdoc = ""; //set gdoc to empty

/*set the homepage*/

if (
  url.includes("index.html") ||
  url == "https://allisonhartley.com/" ||
  url == "http://allisonhartley.com/" //change to YOUR homepage with https and http
) {
  gdoc =
    "https://docs.google.com/document/d/e/2PACX-1vRyD_ZehBQ1vYS8Oq8j78Fd5TPoNC1nb-0h2IS2hhTDvjmWgypCt3j8hfW-QSA2PNrrqXs_InVXfrn8/pub";
}

/*set other pages*/

if (url.includes("booktest.html") || url.includes("booktest")) {
  gdoc =
    "https://docs.google.com/document/d/e/2PACX-1vRyD_ZehBQ1vYS8Oq8j78Fd5TPoNC1nb-0h2IS2hhTDvjmWgypCt3j8hfW-QSA2PNrrqXs_InVXfrn8/pub";
}

// ---------------------------------------------------------------------------------------------

if (gdoc != "") {
  fetch(gdoc)
    .then(function (response) {
      return response.text();
    })
    .then(function (html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, "text/html");

      var title = doc.querySelector("#title").innerHTML;
      var content = doc.querySelector(".doc-content").innerHTML;
      
      // Only remove empty spans and preserve spans with classes
      content = content.replace(/<span class="c5"><\/span>/g, "");
      
      // Preserve formatting by mapping Google Doc classes to HTML styles
      content = content.replace(/class="c7"/g, 'style="font-weight: bold"'); // Bold
      content = content.replace(/class="c6"/g, 'style="font-style: italic"'); // Italic

      // document.querySelector("#showtitle").innerHTML = title;
      document.querySelector("#showcontent").innerHTML = content;
      document.querySelector("#showcontent img").removeAttribute("style"); //remove the google docs styles for images
    })
    .catch(function (err) {
      console.warn("Something went wrong.", err);
    });
}
