import axios from "axios";

// VITE_OPEN_WEATHER_API_KEY=8fd712b27f804821017a48b121601135

const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getInfo = (city) =>
    axios
        .get(`${baseUrl}?q=${city}&appid=${api_key}&units=metric`)
        .then((res) => res.data); 

export default { getInfo };