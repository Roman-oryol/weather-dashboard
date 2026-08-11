import type { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

type Props = {
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
};

export default function MapTypeDropdown({ mapType, setMapType }: Props) {
  return (
    <Select
      value={mapTypes.find(({ value }) => value === mapType)?.label}
      onValueChange={(value) => value && setMapType(value)}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Город" />
      </SelectTrigger>
      <SelectContent>
        {mapTypes.map(({ value, label }) => (
          <SelectItem className="capitalize" key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const mapTypes = [
  { value: "clouds_new", label: "Облачность" },
  { value: "precipitation_new", label: "Осадки" },
  { value: "pressure_new", label: "Атмосферное давление" },
  { value: "wind_new", label: "Ветер" },
  { value: "temp_new", label: "Температура" },
];
