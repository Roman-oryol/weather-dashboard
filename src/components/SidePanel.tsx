import { getAirPollution } from "@/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, type Dispatch, type SetStateAction } from "react";
import type { Coords } from "../types";
import Card from "./cards/Card";
import { Slider } from "./ui/slider";
import clsx from "clsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Information from "/src/assets/information.svg?react";
import Chevron from "/src/assets/ChevronLeft.svg?react";
import SidePanelSkeleton from "./skeletons/SidePanelSkeleton";

type Props = {
  coords: Coords;
  isSidePanelOpen: boolean;
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SidePanel(props: Props) {
  const { isSidePanelOpen, setIsSidePanelOpen } = props;

  return (
    <div
      className={clsx(
        "bg-sidebar fixed top-0 right-0 z-1001 h-screen w-(--sidebar-width) overflow-y-scroll px-4 py-8 shadow-md transition-transform duration-300 lg:translate-x-0!",
        isSidePanelOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <button onClick={() => setIsSidePanelOpen(false)}>
        <Chevron className="size-8 invert lg:hidden" />
      </button>
      <Suspense fallback={<SidePanelSkeleton />}>
        <AirPollution {...props} />
      </Suspense>
    </div>
  );
}

function AirPollution({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["pollution", coords],
    queryFn: () => getAirPollution(coords),
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center text-2xl font-semibold">Качество воздуха</h2>
      <p className="text-center text-5xl font-semibold">
        {data.list[0].main.aqi}
      </p>
      <div className="flex items-center justify-center gap-2">
        <h2 className="text-2xl font-semibold">AQI</h2>
        <Tooltip>
          <TooltipTrigger>
            <Information className="size-4 invert" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>
              Индекс качества воздуха. Возможные значения: 1, 2, 3, 4, 5. Где 1
              = Хорошее, 2 = Удовлетворительное, 3 = Умеренное, 4 = Плохое, 5 =
              Очень плохое.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      {Object.entries(data.list[0].components).map(([key, value]) => {
        const pollutant =
          airQualityRanges[key.toUpperCase() as keyof typeof airQualityRanges];

        const max = Math.max(pollutant["Very Poor"].min, value);

        const currentLevel = (() => {
          for (const [level, range] of Object.entries(pollutant)) {
            if (
              value >= range.min &&
              (range.max === null || value <= range.max)
            )
              return level;
          }
          return "Very Poor";
        })();

        const qualityColor = (() => {
          switch (currentLevel) {
            case "Good":
              return "bg-green-500";
            case "Fair":
              return "bg-yellow-500";
            case "Moderate":
              return "bg-orange-500";
            case "Poor":
              return "bg-red-500";
            case "Very Poor":
              return "bg-purple-500";
            default:
              return "bg-zinc-500";
          }
        })();

        return (
          <Card
            key={key}
            childrenClassName="flex flex-col gap-3"
            className="from-sidebar-accent to-sidebar-accent/60 gap-0! transition-transform duration-300 hover:scale-105"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold capitalize">{key}</span>
                <Tooltip>
                  <TooltipTrigger>
                    <Information className="size-4 invert" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {pollutantNameMapping[key.toUpperCase() as Pollutant]}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-lg font-semibold">{value}</span>
            </div>
            <Slider min={0} max={max} value={[value]} disabled />
            <div className="flex justify-between text-xs">
              <p>0</p>
              <p>{max}</p>
            </div>
            <div className="flex justify-between">
              {Object.keys(pollutant).map((quality) => (
                <span
                  key={quality}
                  className={clsx(
                    "rounded-md px-2 py-1 text-xs font-medium",
                    quality === currentLevel
                      ? qualityColor
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {qualityLabels[quality as AirQualityLevel]}
                </span>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

type AirQualityLevel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";

interface Range {
  min: number;
  max: number | null;
}

type Pollutant = "SO2" | "NO2" | "PM10" | "PM2_5" | "O3" | "CO" | "NO" | "NH3";

const qualityLabels: Record<AirQualityLevel, string> = {
  Good: "Хор.",
  Fair: "Норм.",
  Moderate: "Умер.",
  Poor: "Плох.",
  "Very Poor": "О.П.",
};

type AirQualityRanges = Record<Pollutant, Record<AirQualityLevel, Range>>;

const airQualityRanges: AirQualityRanges = {
  SO2: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 80 },
    Moderate: { min: 80, max: 250 },
    Poor: { min: 250, max: 350 },
    "Very Poor": { min: 350, max: null },
  },
  NO2: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
  PM10: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 50 },
    Moderate: { min: 50, max: 100 },
    Poor: { min: 100, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
  PM2_5: {
    Good: { min: 0, max: 10 },
    Fair: { min: 10, max: 25 },
    Moderate: { min: 25, max: 50 },
    Poor: { min: 50, max: 75 },
    "Very Poor": { min: 75, max: null },
  },
  O3: {
    Good: { min: 0, max: 60 },
    Fair: { min: 60, max: 100 },
    Moderate: { min: 100, max: 140 },
    Poor: { min: 140, max: 180 },
    "Very Poor": { min: 180, max: null },
  },
  CO: {
    Good: { min: 0, max: 4400 },
    Fair: { min: 4400, max: 9400 },
    Moderate: { min: 9400, max: 12400 },
    Poor: { min: 12400, max: 15400 },
    "Very Poor": { min: 15400, max: null },
  },
  NO: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 40 },
    Moderate: { min: 40, max: 60 },
    Poor: { min: 60, max: 80 },
    "Very Poor": { min: 80, max: null },
  },
  NH3: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
};

const pollutantNameMapping: Record<Pollutant, string> = {
  SO2: "Диоксид серы",
  NO2: "Диоксид азота",
  PM10: "Частицы 10 мкм",
  PM2_5: "Мелкие частицы",
  O3: "Озон",
  CO: "Угарный газ",
  NO: "Оксид азота",
  NH3: "Аммиак",
};
