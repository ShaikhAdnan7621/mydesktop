"use client"
import { useEffect, useState } from "react"
import { Cloud, Sun, CloudRain, Wind } from "lucide-react"

export default function WeatherForecast() {
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState("")

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
          )
          const data = await res.json()
          setWeather(data.current_weather)

          // Get location name
          const locationRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          )
          const locationData = await locationRes.json()
          setLocation(locationData.city || locationData.locality || "Unknown")
        } catch (err) {
          console.error("Weather fetch failed:", err)
        }
      })
    }
  }, [])

  const getWeatherIcon = (temperature) => {
    if (temperature > 25) return <Sun className="w-8 h-8 text-yellow-500" />
    if (temperature > 15) return <Cloud className="w-8 h-8 text-gray-500" />
    return <CloudRain className="w-8 h-8 text-blue-500" />
  }

  return (
    <div className="p-6 text-center">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Weather</h2>
      {weather ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-3">
            {getWeatherIcon(weather.temperature)}
            <span className="text-3xl font-light text-gray-800 dark:text-white">
              {Math.round(weather.temperature)}°C
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
            <Wind className="w-4 h-4" />
            <span className="text-sm">{weather.windspeed} km/h</span>
          </div>
          {location && <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>}
        </div>
      ) : (
        <div className="flex items-center justify-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  )
}
