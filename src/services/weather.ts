import { get } from '../helpers/api_handler'

const searchByCity = async (cityname: string) => {
  const latNLong = await getCordByCity(cityname)
  return get(
    `data/2.5/weather?lat=${latNLong[0].lat}&lon=${latNLong[0].lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
  )
}

const getCordByCity = async (cityname: string) => {
  return get(`/geo/1.0/direct?q=${cityname}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
}

const searchByZip = async (zipCode: number) => {
  const latNLong = await getCordByZip(zipCode)
  return get(
    `data/2.5/weather?lat=${latNLong.lat}&lon=${latNLong.lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
  )
}

const getCordByZip = async (zipCode: number) => {
  return get(`/geo/1.0/zip?zip=${zipCode}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
}
const fiveDayForecast = async (lat: number,lon:number) => {
  return get(
    `/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
  )
}

export { searchByCity, searchByZip,fiveDayForecast }
