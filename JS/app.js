
function searchToggle(obj, evt){
    var container = $(obj).closest('.search-wrapper');
        if(!container.hasClass('active')){
            container.addClass('active');
            evt.preventDefault();
        }
        else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
            container.removeClass('active');
            // clear input
            container.find('.search-input').val('');
        }
}


//////////////////////////////////////////////////////////////////
const API_KEY='962ff5ce6f2b4f18a9154854232006';

let currentCity = "Assiut"
let city = document.querySelector('.weather-city');
let datetime = document.querySelector('.weather-date-time');
let units = 'metric'

let weatherForecast = document.querySelector('.weather-forecast')

let weatherTemp = document.querySelector('.weather-temperature')

let weatherIcon = document.querySelector('.weather-icon')

let weatherMinMax = document.querySelector('.weather-minmax')

let realFeel = document.querySelector('.weather-real-feel')

let humidity = document.querySelector('.weather-humidity')

let wind = document.querySelector('.weather-wind')

let pressure = document.querySelector('.weather-pressure')

document.querySelector('.search-wrapper').addEventListener('submit' , e=>{
    let search = document.querySelector('.search-form')
    e.preventDefault()

    currentCity = search.value;
    getWeather()
    search.value = ""
})

document.querySelector(".weather-unit-celisus").addEventListener('click' ,e=> {
    units = "metric"
    getWeather()
})
document.querySelector(".weather-unit-fahernheit").addEventListener('click' ,e=> {
    units = "imperial"
    getWeather()
})


function getWeather(){


    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY} &q=${currentCity}`).then(response=>
        response.json()).then(data=>{
            city.innerHTML = `${data.location.name} ,${data.location.country} `
            datetime.innerHTML = data.location.localtime

            weatherForecast.innerHTML = `<p>${data.current.condition.text}</p>`
            if (units == 'metric')
            {
                weatherTemp.innerHTML = `${
                    data.current.temp_c
                .toFixed()}&#176`
                realFeel.innerHTML= `${data.current.feelslike_c}&#176`
                
                wind.innerHTML= `${data.current.wind_kph} m/s`
                
                pressure.innerHTML= `${data.current.pressure_mb
                } hPa`
            }else{
                weatherTemp.innerHTML = `${data.current.temp_f.toFixed()}&#176`

                realFeel.innerHTML= `${data.current.feelslike_f}&#176`
                
                wind.innerHTML= `${data.current.wind_mph} m/s`
            }
            pressure.innerHTML= `${data.current.pressure_mb} hPa`

            weatherIcon.innerHTML =`<img src="${data.current.condition.icon}">`

            humidity.innerHTML= `${data.current.humidity}%`

        })
}
getWeather()