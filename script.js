document.addEventListener("resize", () => {
    adjustTopMargin(250);
});

function adjustTopMargin(repeat = 0) {
    var topBar = document.querySelector(".top-bar");
    var pageContent = document.querySelector(".page-content");
    var gap = topBar.offsetHeight;
    pageContent.setAttribute("style", `margin-top: ${gap}px;`)
    if (repeat) {
        setTimeout(adjustTopMargin, repeat);
    }
}