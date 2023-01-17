var elementsToLoad = document.querySelectorAll("body, frame, iframe, img, input[type=image], link, script, style");
var toLoadAmt = elementsToLoad.length;
var loadedAmt = 0;

var progressBarFill = document.querySelector("#progressBarFill");

function onSomethingLoaded() {
    loadedAmt++;
    var l = loadedAmt/toLoadAmt;
    l *= 90;
    l = Math.round(l);
    progressBarFill.style.width = `${l}%`;
}

elementsToLoad.forEach((element) => {
    element.addEventListener("load", onSomethingLoaded);
});