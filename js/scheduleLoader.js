var scheduleContainer = document.querySelector("#schedule");

async function fetchSchedule() {
    var request = await fetch("../data/schedule.json");
    var jsonData = await request.json();
    console.log("data", jsonData);
    showScheduleRows(jsonData.schedule);
}

function clearRows() {
    var scheduleElems = document.querySelectorAll(".schedule-row");
    console.log("schedule card elements", scheduleElems);
    scheduleElems.forEach((element) => {
        if (element.id != "schedule-row-template") {
            console.log("removed", element);
            element.remove();
        }
    });
}

function showScheduleRows(data) {
    clearRows();
    var template = document.querySelector("#schedule-row-template");
    for (var r in data) {
        var row = data[r];
        if (row.gap) {
            // add a gap
            var g = document.createElement("div");
            g.style.height = row.gap;
            g.classList.add("schedule-row-gap");
            continue;
        }
        var rElem = template.cloneNode(true);
        scheduleContainer.appendChild(rElem);
        rElem.id = "";
        /* schedule data has:
            start
            end
            name
            bold?
            large?

            OR

            gap
        */
        var evtTime;
        if (row.start && row.end) evtTime = row.start + " - " + row.end;
        else if (row.start) evtTime = row.start;
        else if (row.end) evtTime = row.end;
        else evtTime = "";
        
        // rElem.querySelector(".schedule-time").innerText = evtTime;
        rElem.querySelector(".schedule-time").innerHTML = `
        <span>${row.start.replace(" ", "&nbsp;")}&nbsp;-</span>
        <span>&nbsp;${row.end.replace(" ", "&nbsp;")}</span>
        `;
        rElem.querySelector(".schedule-name").innerText = row.name;
        if (row.bold || row.boldest) rElem.classList.add("schedule-row-bold");
        if (row.boldest) rElem.classList.add("schedule-row-boldest");
    }
}

fetchSchedule();