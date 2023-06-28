//console.log(countries[0])

const divElement = function (content) {
    return `<option> ${content} </option>`;
}
const loadEvent = function () {
    document.getElementById("all").insertAdjacentHTML("beforeend", divElement("The list ←"))
    for (const country of countries) {
        document.getElementById("all").insertAdjacentHTML("beforeend", divElement(country.name.common));
    }
    document.getElementById("country").insertAdjacentHTML("beforeend", "Select a country from the list ↑");
    areaCheck();
    populationCheck();
    prevButton();
    nextButton();
    document.getElementById("population").style.visibility = "hidden";
    document.getElementById("area").style.visibility = "hidden";
    if (nr < 0) {
        document.getElementById("prev").style.visibility = "hidden";
        document.getElementById("next").style.visibility = "hidden";
    }
    // document.getElementById("toolbar").insertAdjacentHTML("beforeend", `<select id="lang"></select>`);
    // document.getElementById("lang").style.visibility = "hidden";
}
let nr = -1;
let list = [];
window.addEventListener("input", (event) => {
    const clickedElement = event.target.value;
    countries.forEach(element => {
        if (element.name.common === clickedElement) {
            //document.getElementById("lang").style.visibility = "visible";
            console.log(element.region);
            clearDisplay();
            display(element);
            pushList(element);
            document.getElementById("population").style.visibility = "visible";
            document.getElementById("area").style.visibility = "visible";
        };
    })
});
let display = function (element) {
    let rootElement = document.getElementById("country");
    rootElement.insertAdjacentHTML("beforeend", `
    <img src=${element.flags.png}></img>
    <h1>${element.name.common}</h1>
    <h2>${element.region}</h2>
    <h3>${element.subregion}</h3>
    <h4>${element.capital}</h4>
    `
    );
}
let clearDisplay = function () {
    let display = document.getElementById("country");
    display.textContent = "";
}
let areaCheck = function () {
    const areaButton = document.getElementById('area');
    areaButton.addEventListener('click', function () {
        let name = document.querySelector('h1');
        let arrNeighbour;
        countries.forEach(country => {
            if (country.name.common === name.textContent) {
                arrNeighbour = country.borders;
            }
        })
        let max = 0;
        let fifa;
        countries.forEach(country => {
            if (arrNeighbour.includes(country.fifa)) {
                if (country.area > max) {
                    max = country.area;
                    fifa = country;
                }
            }
        })
        clearDisplay();
        display(fifa);
        pushList(fifa);
    })
}
let populationCheck = function () {
    const populationButton = document.getElementById('population');
    populationButton.addEventListener('click', function () {
        let name = document.querySelector('h1');
        let arrPopulation;
        countries.forEach(country => {
            if (country.name.common === name.textContent) {
                arrPopulation = country.borders;
            }
        })
        let max = 0;
        let fifa;
        countries.forEach(country => {
            if (arrPopulation.includes(country.fifa)) {
                if (country.population > max) {
                    max = country.population;
                    fifa = country;
                }
            }
        });
        clearDisplay();
        display(fifa);
        pushList(fifa);
    })
}
let prevButton = function () {
    let preButton = `<button id="prev">Previous country!</button>`;
    let rootElement = document.getElementById('toolbar');
    rootElement.insertAdjacentHTML("beforeend", preButton);
    let preButtonElement = document.getElementById('prev');
    preButtonElement.addEventListener('click', function () {
        document.getElementById("next").style.visibility = "visible";
        nr--;
        clearDisplay();
        display(list[nr]);
        if (nr === 0) {
            document.getElementById("prev").style.visibility = "hidden";
        }
    });
}
let nextButton = function () {
    let nButton = `<button id="next">Next country!</button>`;
    let rootElement = document.getElementById('toolbar');
    rootElement.insertAdjacentHTML("beforeend", nButton);
    let nButtonElement = document.getElementById('next');
    nButtonElement.addEventListener('click', function () {
        document.getElementById("prev").style.visibility = "visible";
        nr++;
        clearDisplay();
        display(list[nr]);
        if (nr === list.length - 1) {
            document.getElementById("next").style.visibility = "hidden";
        }
    })
}
let pushList = function (country) {
    nr++;
    if (nr > 0) {
        document.getElementById("prev").style.visibility = "visible";
    }
    list.push(country);
};
window.addEventListener("load", loadEvent);




