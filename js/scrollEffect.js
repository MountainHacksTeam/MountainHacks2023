function getScrollPercentage() {
    let scrollTop = window.scrollY;
    var body = document.body;
    var html = document.documentElement;
    var docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
    );
    let winHeight = window.innerHeight;
    let scrollPercent = scrollTop / (docHeight - winHeight);
    return scrollPercent;
}