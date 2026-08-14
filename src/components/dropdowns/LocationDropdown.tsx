import type { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

type Props = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

export default function LocationDropdown({ location, setLocation }: Props) {
  const selectedLocation = popularLocations.find((loc) => loc.en === location);

  return (
    <Select
      value={selectedLocation?.ru}
      onValueChange={(value) => value && setLocation(value)}
    >
      <SelectTrigger className="w-full md:max-w-48">
        <SelectValue
          placeholder={location === "custom" && "Пользовательский"}
        />
      </SelectTrigger>
      <SelectContent>
        {popularLocations.map((city) => (
          <SelectItem key={city.en} value={city.en}>
            {city.ru}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const popularLocations = [
  { en: "Tokyo", ru: "Токио" },
  { en: "Delhi", ru: "Дели" },
  { en: "Shanghai", ru: "Шанхай" },
  { en: "São Paulo", ru: "Сан-Паулу" },
  { en: "Mexico City", ru: "Мехико" },
  { en: "Cairo", ru: "Каир" },
  { en: "Mumbai", ru: "Мумбаи" },
  { en: "Beijing", ru: "Пекин" },
  { en: "Dhaka", ru: "Дакка" },
  { en: "Moscow", ru: "Москва" },
  { en: "New York", ru: "Нью-Йорк" },
  { en: "Istanbul", ru: "Стамбул" },
  { en: "Zaporizhzhia", ru: "Запорожье" },
];
