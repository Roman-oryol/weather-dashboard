import { useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionallInfo from "./components/cards/AdditionallInfo";
import Map from "./components/Map";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import { getGeocode } from "./api";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import MapLegend from "./components/MapLegend";
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton";
import DailySkeleton from "./components/skeletons/DailySkeleton";
import HourlySkeleton from "./components/skeletons/HourlySkeleton";
import AdditionalInfoSkeleton from "./components/skeletons/AdditionallInfoSkeleton";
import SidePanel from "./components/SidePanel";
import Hamburger from "/src/assets/hamburger.svg?react";

function App() {
  const [coordinates, setCoordinates] = useState<Coords>({
    lat: 47.8388,
    lon: 35.1396,
  });
  const [location, setLocation] = useState("Zaporizhzhia");
  const [mapType, setMapType] = useState("clouds_new");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

  const { data: geocodeData } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeocode(location),
  });

  const onMapClick = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
    setLocation("custom");
  };

  const coords =
    location === "custom"
      ? coordinates
      : { lat: geocodeData?.[0].lat ?? 0, lon: geocodeData?.[0].lon ?? 0 };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <h2 className="shrink-0 text-left text-xl font-semibold">
              Популярные города:
            </h2>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>
          <div className="flex items-center gap-4">
            <h2 className="shrink-0 text-right text-xl font-semibold">
              Тип карты
            </h2>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
          <button onClick={() => setIsSidePanelOpen(true)}>
            <Hamburger className="size-8 invert" />
          </button>
        </div>
        <div className="relative">
          <MapLegend mapType={mapType} />
          <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
        </div>
        <Suspense fallback={<CurrentSkeleton />}>
          <CurrentWeather coords={coords} />
        </Suspense>
        <Suspense fallback={<HourlySkeleton />}>
          <HourlyForecast coords={coords} />
        </Suspense>
        <Suspense fallback={<DailySkeleton />}>
          <DailyForecast coords={coords} />
        </Suspense>
        <Suspense fallback={<AdditionalInfoSkeleton />}>
          <AdditionallInfo coords={coords} />
        </Suspense>
      </div>
      <SidePanel
        coords={coords}
        isSidePanelOpen={isSidePanelOpen}
        setIsSidePanelOpen={setIsSidePanelOpen}
      />
    </>
  );
}

export default App;
