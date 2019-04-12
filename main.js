//adding an evntlistener for page load
window.addEventListener("load", fetchBookmarks);


// Find the form and add an event listener to it
document.querySelector("form").addEventListener("submit", saveBookmark);

//save bookmarks
function saveBookmark(e) {
//prevent from page reloading
e.preventDefault ();

//get site name and url
var siteName = document.querySelector("#siteName").value;
var siteUrl = document.querySelector("#siteUrl").value;

//create a bookmark object
var bookmark = {
    name: siteName,
    url: siteUrl
}

//check if the local storage is empty
if(localStorage.getItem("bookmarks") === null) {
//init bookmarks array
var bookmarks = [];
//adding first bookmark
bookmarks.push(bookmark);
//set bookmarks to localstorage
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
} else {
    // get current bookmarks from localstorage
   var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    // push new bookmark into bookmarks
    bookmarks.push(bookmark);
    //set bookmarks to localstorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

}

//reset the form
document.querySelector("form").reset();

// fetch bookmarks
fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks() {
// get bookmarks from localstorage
var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

// select the bookmarks div
var output = document.querySelector("#bookmarks");

// reset the bookmarks div
output.innerHTML = "";

    //loop over bookmarks
for(var i=0;i<bookmarks.length;i++) {
    //create a div
    var div = document.createElement("div");
    //create a h3
    var h3 = document.createElement("h3");
    h3.textContent = bookmarks[i].name;

     //create a link
     var a = document.createElement("a")
    a.href = bookmarks[i].url;
    a.className = "btn btn-success";
    a.textContent = "Visit"

    // Create delted button
    var button = document.createElement("button");
    button.className = "btn btn-danger";
    button.textContent = "Delete";

    button.addEventListener("click", function(e){
        var name = e.target.parentElement.children[0].textContent;
        deleteBookmark(name);
    })

     //append h3, a and button into div
     div.appendChild(h3);
     div.appendChild(a);
     div.appendChild(button);
 
     //append div into output
     output.appendChild(div);
    }
}

function deleteBookmark(name) {
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    // loop over bookmarks
    for(var i=0; i<bookmarks.length;i++) {
        // looking for bookmark by given name
        if(bookmarks[i].name === name) {
            bookmarks.splice(i, 1);
            break;
        }
    }

    //reset bookmarks into localstorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    //re-fetch bookmarks output
    fetchBookmarks();
}