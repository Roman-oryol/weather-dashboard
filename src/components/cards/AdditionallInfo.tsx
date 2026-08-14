import { useSuspenseQuery } from "@tanstack/react-query";
import type z from "zod";
import { weatherSchema } from "../../schemas/weatherSchema";
import { getWeather } from "../../api";
import Card from "./Card";
import Cloud from "/src/assets/cloud.svg?react";
import Uv from "/src/assets/uv.svg?react";
import Wind from "/src/assets/wind.svg?react";
import Pressure from "/src/assets/pressure.svg?react";
import Sunrise from "/src/assets/sunrise.svg?react";
import Sunset from "/src/assets/sunset.svg?react";
import UpArrow from "/src/assets/uparrow.svg?react";
import type { Coords } from "../../types";

const TIME_FIELDS = new Set(["sunrise", "sunset"]);

type Props = {
  coords: Coords;
};

export default function AdditionallInfo({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card
      title="Дополнительная информация"
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2"
    >
      {rows.map(({ label, value, Icon }) => (
        <div className="flex items-center justify-between" key={value}>
          <div className="grid grid-cols-[1fr_auto] gap-4 text-left">
            <span className="text-gray-500">{label}</span>
            <Icon className="size-8" />
          </div>
          <span>{formatValue(value, data)}</span>
        </div>
      ))}
    </Card>
  );
}

function formatValue(
  value: (typeof rows)[number]["value"],
  data: z.infer<typeof weatherSchema>,
) {
  const raw = data.current[value];
  if (TIME_FIELDS.has(value)) {
    return new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: data.timezone,
    }).format(new Date(raw * 1000));
  }

  if (value === "wind_deg") {
    return (
      <UpArrow
        className="size-8"
        style={{ transform: `rotate(${data.current.wind_deg}deg)` }}
      />
    );
  }

  return raw;
}

const rows = [
  {
    label: "Облачность (%)",
    value: "clouds",
    Icon: Cloud,
  },
  {
    label: "УФ-индекс",
    value: "uvi",
    Icon: Uv,
  },
  {
    label: "Направление ветра",
    value: "wind_deg",
    Icon: Wind,
  },
  {
    label: "Давление (mbar)",
    value: "pressure",
    Icon: Pressure,
  },
  {
    label: "Восход",
    value: "sunrise",
    Icon: Sunrise,
  },
  {
    label: "Закат",
    value: "sunset",
    Icon: Sunset,
  },
] as const;
