const weather = document.querySelector('.clima');
const form = document.querySelector('.form');
const nameCity = document.querySelector('#nameCity');
const nameCountry = document.querySelector('#country');
const alertWeather = document.querySelector('#alertWeather');



form.addEventListener('submit', (event) =>{
    event.preventDefault();
    if(nameCity.value === '' || nameCountry.value === ''){
        showError('Los campos son obligatorios.');
        return;
    }
    callApi(nameCity.value, nameCountry.value);
})


function callApi(city, country){
    const apiID = '6d12dfb752f3660269ccc019a864f178';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiID}`;

    fetch(url)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            if(data.cod === '404'){
                showError('Ciudad no encontrada.');
            }else{
                clearHTML();
                showWeater(data);
            }
        })
        .catch(err =>{
            console.log(err);
        })
}

function showWeater(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data; 

    const degrees = kelvinToCentigrade(temp);
    const tempMax = kelvinToCentigrade(temp_max);
    const tempMin = kelvinToCentigrade(temp_min);


    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}°C</h2>
        <p>Max: ${tempMax}°C</p>
        <p>Min: ${tempMin}°C</p>
    `;
    weather.appendChild(content);
}

function showError(err){
    alertWeather.innerHTML = err;
    alertWeather.style.display = ''; 

    setTimeout(() => {
        alertWeather.style.display = 'None';
    }, 2700);
}

function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    weather.innerHTML = ''; 
}