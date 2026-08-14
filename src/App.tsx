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
import MobileHeader from "./components/MobileHeader";
import LightDarkToggle from "./components/LightDarkToggle";

function App() {
  const [coordinates, setCoordinates] = useState<Coords>({
    lat: 47.8388,
    lon: 35.1396,
  });
  const [location, setLocation] = useState("Zaporizhzhia");
  const [mapType, setMapType] = useState("clouds_new");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

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
      <MobileHeader setIsSidePanelOpen={setIsSidePanelOpen} />
      <div className="xs:pt-8 flex w-full flex-col gap-8 p-8 pt-2 lg:w-[calc(100dvw-var(--sidebar-width))] 2xl:h-screen 2xl:min-h-280">
        <div className="xs:flex-row flex flex-col gap-x-6 gap-y-4 md:items-center">
          <div className="lg2:flex-row flex flex-col gap-4">
            <h2 className="text-left text-xl font-semibold whitespace-nowrap">
              Популярные города:
            </h2>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>
          <div className="lg2:flex-row flex flex-col gap-4">
            <h2 className="lg2:text-right text-left text-xl font-semibold whitespace-nowrap">
              Тип карты
            </h2>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
          <div className="lg2:self-center ml-auto flex items-center gap-x-6 self-start">
            <div className="xs:block hidden">
              <LightDarkToggle className="ml-auto" />
            </div>
            <button
              className="xs:block hidden"
              onClick={() => setIsSidePanelOpen(true)}
            >
              <Hamburger className="size-6 lg:hidden" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:min-h-0 2xl:flex-1 2xl:grid-cols-4 2xl:grid-rows-4">
          <div className="relative order-1 col-span-1 h-120 md:col-span-2 2xl:col-span-4 2xl:row-span-2 2xl:h-auto">
            <MapLegend mapType={mapType} />
            <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
          </div>
          <div className="order-2 col-span-1 2xl:row-span-2">
            <Suspense fallback={<CurrentSkeleton />}>
              <CurrentWeather coords={coords} />
            </Suspense>
          </div>
          <div className="order-3 col-span-1 2xl:order-4 2xl:row-span-2">
            <Suspense fallback={<DailySkeleton />}>
              <DailyForecast coords={coords} />
            </Suspense>
          </div>
          <div className="order-4 col-span-1 md:col-span-2 2xl:order-3 2xl:row-span-1">
            <Suspense fallback={<HourlySkeleton />}>
              <HourlyForecast coords={coords} />
            </Suspense>
          </div>
          <div className="order-5 col-span-1 md:col-span-2 2xl:row-span-1">
            <Suspense fallback={<AdditionalInfoSkeleton />}>
              <AdditionallInfo coords={coords} />
            </Suspense>
          </div>
        </div>
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
