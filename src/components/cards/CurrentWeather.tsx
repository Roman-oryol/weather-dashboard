import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

export default function CurrentWeather({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card
      title="Сейчас"
      childrenClassName="flex flex-col items-center gap-4 md:justify-between"
    >
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-center text-6xl font-semibold">
          {Math.round(data.current.temp)} °C
        </h2>
        <WeatherIcon className="size-18" src={data.current.weather[0].icon} />
        <h3 className="text-xl first-letter:uppercase">
          {data.current.weather[0].description}
        </h3>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-xl">Местное время:</p>
        <h3 className="text-4xl font-semibold">
          {new Intl.DateTimeFormat("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: data.timezone,
          }).format(new Date(data.current.dt * 1000))}
        </h3>
      </div>
      <div className="grid w-full grid-cols-3">
        <div className="grid justify-items-center gap-1">
          <p className="text-gray-500">Чувствуется</p>
          <p>{Math.round(data.current.feels_like)} °C</p>
        </div>
        <div className="grid justify-items-center gap-1">
          <p className="text-gray-500">Влажность</p>
          <p>{Math.round(data.current.humidity)} %</p>
        </div>
        <div className="grid justify-items-center gap-1">
          <p className="text-gray-500">Ветер</p>
          <p>{Math.round(data.current.wind_speed)} м/с</p>
        </div>
      </div>
    </Card>
  );
}
