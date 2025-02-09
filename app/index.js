//1. CARGA DE LA LIBRERÍA particlesJS PARA CREAR UN FONDO DINÁMICO

particlesJS.load('particles-js', './particles.json', function () {
    console.log('callback - particles.js config loaded');
});

//2. API REQUEST

const getData = async (name) => {
    const url = `https://api.api-ninjas.com/v1/planets?name=${name}`;
    const apiKey = 'f+y1hodTTZeGE0SObcqJcg==z1coaMKKRPKrQlyP';

    try {
        const response = await fetch(url, {headers: {
            'X-Api-Key': apiKey
        }});

        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log(error);
    }
};

const getPlanetData = async (name) => {
    const planetData = await getData(name);
    return planetData;
}

//3. SELECCIÓN DE ELEMENTOS

const form = document.querySelector('.form-container');
const inputText = document.querySelectorAll('input')[0];
const planetInfoModal = document.querySelector('.table-container');
const homeButton = document.querySelector('#home');
let tdName = document.querySelector('#name');
let tdDistance = document.querySelector('#distance');
let tdHostMass = document.querySelector('#host-mass');
let tdHostTemp = document.querySelector('#host-temp');
let tdMass = document.querySelector('#mass');
let tdPeriod = document.querySelector('#period');
let tdRadius = document.querySelector('#radius');
let tdSemima = document.querySelector('#semima');
let tdTemperature = document.querySelector('#temperature');

//4. EVENT HANDLERS

const renderPlanetData = (planetData) => {
    form.style.display = 'none';
    planetInfoModal.style.display = 'block';

    tdName.innerText = planetData[0].name;
    tdDistance.innerText = planetData[0].distance_light_year;
    tdHostMass.innerText = planetData[0].host_star_mass;
    tdHostTemp.innerText = planetData[0].host_star_temperature;
    tdMass.innerText = planetData[0].mass;
    tdPeriod.innerText = planetData[0].period;
    tdRadius.innerText = planetData[0].radius;
    tdSemima.innerText = planetData[0].name;
    tdTemperature.innerText = planetData[0].temperature;
}

const handleSubmit = async (e) => {
    e.preventDefault();
    let planetName = inputText.value;
    let planetData = await getPlanetData(planetName);
    
    renderPlanetData(planetData);
}

const handleHomeButton = () => {
    inputText.value = '';
    form.style.display = 'block';
    planetInfoModal.style.display = 'none';
}

//5. EVENT LISTENERS

form.addEventListener('submit', (e) => handleSubmit(e));
homeButton.addEventListener('click', handleHomeButton);
