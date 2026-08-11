import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

export default function HourlyForecast({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card
      childrenClassName="flex gap-6 overflow-x-scroll"
      title="Прогноз на 48 часов"
    >
      {data.hourly.map((hour) => (
        <div className="mb-2 flex flex-col items-center gap-2" key={hour.dt}>
          <p>
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
          <WeatherIcon src={hour.weather[0].icon} />
          <p>{Math.round(hour.temp)} °C</p>
        </div>
      ))}
    </Card>
  );
}
