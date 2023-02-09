
document.addEventListener("resize", () => {
    adjustStuff(250);
});


var topBar = document.querySelector("div.top-bar")
var pageContent = document.querySelector(".page-content");
var pageBanner = document.querySelector("#main-page-banner");
var downArrow = document.querySelector("#down-arrow-effect");
var faqSection = document.querySelector("div.faq-section");

var gap = 80;

var darkThemeCss = document.querySelector("#dark-theme-css");
var lightThemeCss = document.querySelector("#light-theme-css");

var darkThemeBtn = document.querySelector("#dark-theme-moon");
var lightThemeBtn = document.querySelector("#light-theme-sun");

var darkTheme = true;

if (localStorage.getItem("theme") == "light") {
    setInterval(toggleTheme(), 500);
}

var atTop = true;

function adjustStuff(repeat = 0, minScroll = 0.01) {
    gap = topBar.offsetHeight;
    pageContent.style.marginTop = `${gap}px`;

    if (pageBanner) pageBanner.style.height = `calc(100vh - ${gap}px)`;

    if (window.scrollY / window.innerHeight >= minScroll) {
        // scrolled down
        if (atTop) {
            startGrowNumberAnim(120, 2, true);
        }
        atTop = false;
        if (darkTheme) {
            if (pageBanner) document.body.style.backgroundColor = "#0a1c2d";
            topBar.style.backgroundColor = "#4c85b980";
        }
        else {
            if (pageBanner) document.body.style.backgroundColor = "#bedaf4";
            topBar.style.backgroundColor = "#4c85b980";
        }
        if (downArrow) downArrow.style.display = "none";
    }
    else {
        // at top of page
        atTop = true;
        if (darkTheme) {
            if (pageBanner) document.body.style.backgroundColor = "#05335e";
            if (!pageBanner) topBar.style.backgroundColor = "#05335e";
        }
        else {
            if (pageBanner) document.body.style.backgroundColor = "#579bdb";
            if (!pageBanner) topBar.style.backgroundColor = "#579bdb";
        }

        topBar.style.backgroundColor = "initial";
        if (downArrow) downArrow.style.display = "block";
    }

    if (darkTheme) {
        lightThemeBtn.style.display = "none";
        darkThemeBtn.style.display = "block";
    }
    else {
        lightThemeBtn.style.display = "block";
        darkThemeBtn.style.display = "none";
    }

    if (repeat) {
        setTimeout(adjustStuff, repeat);
    }
}

function toggleTheme() {
    darkTheme = !darkTheme;
    if (darkTheme) {
        darkThemeCss.setAttribute("rel", "stylesheet");
        localStorage.setItem("theme", "dark");
    }
    else {
        darkThemeCss.setAttribute("rel", "none");
        localStorage.setItem("theme", "light");
    }
    adjustStuff();
}

setInterval(adjustStuff, 200);

function faqQuestionClicked(path) {
    console.log("searching faq in path ", path);
    for (var e in path) {
        console.log("search checking ", e, path[e]);
        if (path[e].className.indexOf("faq-question") !== -1) return path[e];
    }
    console.log("couldn't find faq in path ", path);
    return null;
}

function onFaqClick(event) {
    console.log("faq event", event);
    var path = event.composedPath();
    var faqQuestion = faqQuestionClicked(path);
    console.log("faqClick", path)
    console.log("faq question clicked: ", faqQuestion);
    if (faqQuestion) {
        var faqAnswer = faqQuestion.parentElement.querySelector(".faq-answer");
        var ionIcon = faqQuestion.querySelector("ion-icon");
        if (faqAnswer.getAttribute("closed") == "1") {
            // open it
            console.log("faq question opened: ", faqQuestion.innerText);
            faqAnswer.style.display = 'block';

            ionIcon.setAttribute("style", "transform: rotate(180deg) translateY(-4px);");
            faqAnswer.setAttribute("closed", "0");
        }
        else {
            // close it
            console.log("faq question closed: ", faqQuestion.innerText);
            faqAnswer.style.display = 'none';

            ionIcon.setAttribute("style", "transform: rotate(0deg) translateY(4px);");
            faqAnswer.setAttribute("closed", "1");
        }
    }
    else {
        console.log("faq event called but not work", faqQuestion)
    }
}

if (faqSection) {
    faqSection.addEventListener("click", onFaqClick);
}
else {
    console.log("faq section is ", faqSection);
}
console.log("faqSection", faqSection);

function onDownArrowClick() {
    window.scroll({
        left: 0,
        top: window.innerHeight - topBar.offsetHeight,
        behavior: "smooth"
    });
}

var growInterval;

function startGrowNumberAnim(fractions, time, replace) {
    if (!replace && growInterval) {
        return;
    }
    var animatedNums = document.getElementsByClassName("grow-number-anim");
    for (var e in animatedNums) {
        var el = animatedNums.item(e);
        el.setAttribute("grow-progress", "0");
        if (!el.getAttribute("grow-target")) {
            el.setAttribute("grow-target", el.innerText);
        }
    }
    if (growInterval) {
        clearInterval(growInterval);
    }
    growInterval = setInterval(() => { growAllNumberAnim(fractions) }, 1000 *  time / fractions);
}

function growNumberAnim(e, fractions) {
    var growTarget = e.getAttribute("grow-target");
    var growProgress = e.getAttribute("grow-progress");
    if (parseFloat(growProgress) >= 1) {
        e.innerText = growTarget;
        e.setAttribute("grow-progress", 1);
        return;
    }
    
    var newGrowProgress = parseFloat(growProgress) + (1 / fractions);
    console.log("newGrowProgress", newGrowProgress);
    var nextNum = parseFloat(growTarget) * newGrowProgress;
    console.log("nextNum", nextNum);
    e.setAttribute("grow-progress", newGrowProgress.toString());
    e.innerText = Math.round(nextNum);
}

function growAllNumberAnim(fractions) {
    var animatedNums = document.getElementsByClassName("grow-number-anim");
    for (var e in animatedNums) {
        growNumberAnim(animatedNums.item(e), fractions);
    }
}

function main() {
    console.log("document loaded");
    document.querySelectorAll(".faq-question").forEach((element) => {
        if (element.id != "mountainhacks-faq-question") {
            element.click();
        }
        console.log("clicked", element);
    });
}

main();

// document.addEventListener("load", main)
// window.addEventListener("load", main);