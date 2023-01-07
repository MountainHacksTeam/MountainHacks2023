function siteMenuSetup() {
    var siteMenu = document.querySelector("#site-menu");
    var siteMenuBtn = document.querySelector("#site-menu-btn");
    var siteMenuCloseBtn = document.querySelector("#site-menu-close-btn");

    function toggleSiteMenu() {
        if (siteMenu.getAttribute("menu-opened") == "1") { // menu is open
            // close the menu
            siteMenu.style.transform = "translateY(-100%)"
            siteMenu.style.top = "0px";
            siteMenu.style.opacity = 0;
            siteMenu.setAttribute("menu-opened", "0");
        }
        else {
            siteMenu.style.transform = "translateY(0%)"
            siteMenu.style.top = gap ? gap : "80px";
            siteMenu.style.opacity = 1;
            siteMenu.setAttribute("menu-opened", "1");
        }
    }

    siteMenuBtn.addEventListener("click", toggleSiteMenu);
    siteMenuCloseBtn.addEventListener("click", toggleSiteMenu);

    function adjustSiteMenuTop() {
        if (gap && siteMenu.getAttribute("menu-opened") == "1") {
            siteMenu.style.top = `${gap}px`;
        }
    }

    setInterval(adjustSiteMenuTop, 100);
}


var siteMenuContainer = document.querySelector(".site-menu");

function siteMenuFailedToLoad(reason) {
    siteMenuContainer.style.display = "none";
    console.log("site menu failed to load for reason:", reason);
}

var url = location.protocol + "//" + location.host + "/site-menu.html";
console.log("fetching site menu from url:", url);

fetch(url).then((value) => {
    value.text().then((text) => {
        if (text.startsWith("SITEMENUSUCCESS")) {
            siteMenuContainer.innerHTML = text.replace("SITEMENUSUCCESS", "");
            console.log("loaded site menu");
            setTimeout(siteMenuSetup, 200);
        }
        else {
            siteMenuFailedToLoad("not found?????");
        }
    }).catch(siteMenuFailedToLoad);
}).catch(siteMenuFailedToLoad);
