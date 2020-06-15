import axios from 'axios'

export default function getData(city, country, setCity, setCountry, setCurrentTemp, setMaxTemp, setMinTemp, setClouds, setWind, setHumidity, setLoading, setError){
    
    const url = "https://community-open-weather-map.p.rapidapi.com/weather"

    var found = false
    const headers = {
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key":"a9011e28c4mshd6fdb25fd077bb1p1549d9jsn2b85abbb5009",
        "useQueryString":true
    }

    //the only dinamic that sent through the api is the location
    const params = {
        "id":"2172797",
        "units":"%22metric%22 or %22imperial%22",
        "mode":"json",
        "q":`${country? city + '%2C' + country : city }`
        }
    try {
        
        //I make the call using axios and than, with main state functions, i save the data to show.
        axios({
            'method': 'GET',
            'url': url,
            'headers': headers,
            'params': params
        }).then((response) => {
            if(response.status === 200) {
                const data = response.data
                found = true
                setCity(data.name)
                setCountry(data.sys.country)

                //I deduct 273.15 from the temperatures because the api returns in Kelvin and I want to show in Celsius
                setCurrentTemp(Math.round(data.main.temp - 273.15))
                setMaxTemp(Math.round(data.main.temp_max - 273.15))
                setMinTemp(Math.round(data.main.temp_min - 273.15))
                setClouds(data.weather[0].description)
                setWind(data.wind.speed)
                setHumidity(data.main.humidity)
            }
        })
    } catch (e) {
        //if any exception ocurrs, i just log it
        console.log('error ocurred')
    }

    //if the call takes to mutch time I send an error to the snackbar on the screen
    setTimeout(() => {
        if(!found) {
            setError(true)
        }
        setLoading(false)
        return
    }, 5000);
    
}