import axios from 'axios'


export default function getData(location='Itajai', country=''){
    const url = "https://community-open-weather-map.p.rapidapi.com/weather"
    const headers = {
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key":"dbb4e923f1msha5c9cab71ba6bb1p1c9f06jsnb5d926f91821",
        "useQueryString":true
    }
    const params = {
        "callback":"test",
        "id":"2172797",
        "units":"%22metric%22 or %22imperial%22",
        "mode":"xml%2C html",
        "q":`${country? location + '%2C' + country : location }`
        }
    axios({
        'method': 'GET',
        'url': url,
        'headers': headers,
        'params': params
    }).then((response) => {
        console.log(response)
    })
    return
}