// var footerElem = document.createElement("p");
// footerElem.className = "page-section page-section-description center-text page-footer";
// footerElem.innerHTML = `MountainHacks is fiscally sponsored by Hack Club Bank, a project by The Hack Foundation.<br/>501(c)(3) Nonprofit EIN: 81-2908499`;
// var pageContent = document.querySelector(".page-main-content");

var url = location.protocol + "//" + location.host + "/socials.html";
console.log("fetching footer from url:", url);

fetch(url).then(async (request) => {
    var textData = await request.text();
    if (textData.startsWith("FOOTERSUCCESS")) {
        var footerText = textData.substring("FOOTERSUCCESS".length);
        var footerContainer = document.querySelector("#footer-container");
        if (footerContainer) {
            footerContainer.innerHTML = footerText;
        }
    }
}).catch((reason) => {
    console.log("footer request failed for reason: ", reason);
});
// pageContent.appendChild(footerElem);