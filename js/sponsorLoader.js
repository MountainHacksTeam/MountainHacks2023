var sponsorsContainer = document.querySelector("#sponsors-container");

async function fetchSponsors() {
    var request = await fetch("../data/sponsors.json");
    var jsonData = await request.json();
    console.log("data", jsonData);
    showSponsors(jsonData.sponsors);
}

function clearSponsors() {
    var sponsorElems = document.querySelectorAll(".sponsor-card");
    console.log("sponsor card elements", sponsorElems);
    sponsorElems.forEach((element) => {
        if (element.id != "sponsor-template") {
            console.log("removed", element);
            element.remove();
        }
    });
}

function showSponsors(data) {
    clearSponsors();
    var template = document.querySelector("#sponsor-template");
    for (var s in data) {
        var sponsor = data[s];
        var sElem = template.cloneNode(true);
        sponsorsContainer.appendChild(sElem);
        sElem.id = "";
        /* sponsor data has:
            name
            imgURL
            description?
            btnLink?
            btnLinkTitle?
            btnLinkDesc?
        */
        sElem.querySelector(".page-section-title").innerText = sponsor.name;
        sElem.querySelector(".page-card-img").setAttribute("src", sponsor.imgURL);
        if (sponsor.description) {
            var d = sElem.querySelector(".page-section-description");
            d.innerText = sponsor.description;
        }
        var bl = sElem.querySelector(".page-card-btn")
        if (sponsor.btnLink) {
            var blt = sElem.querySelector(".page-card-btn-title");
            var bld;
            if (bl) bld = bl.querySelector(".page-section-description");
            if (bl) bl.setAttribute("href", sponsor.btnLink);
            if (blt) blt.innerText = sponsor.btnLinkTitle || "";
            if (bld) bld.innerText = sponsor.btnLinkDesc || "";
        } else {
            if (bl) bl.style.display = "none";
        }
    }
}

fetchSponsors();