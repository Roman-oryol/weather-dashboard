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
        <div
          className="mb-2 flex flex-col items-center gap-2 2xl:justify-between"
          key={hour.dt}
        >
          <p className="2xl:scale-110">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
          <WeatherIcon className="2xl:size-10" src={hour.weather[0].icon} />
          <p className="2xl:scale-110">{Math.round(hour.temp)} °C</p>
        </div>
      ))}
    </Card>
  );
}
