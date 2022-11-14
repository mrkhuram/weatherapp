export const CURRENT_WEATHER = 'CURRENT_WEATHER'

export type currentWeather = {
    current: any;
    forecast: any;
}

export type CurrentWeatherTypes = {
    type: typeof CURRENT_WEATHER;
    payload: currentWeather
}