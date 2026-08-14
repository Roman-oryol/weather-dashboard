import Sun from "/src/assets/sun.svg?react";
import Moon from "/src/assets/moon.svg?react";
import { Switch } from "./ui/switch";
import clsx from "clsx";
import { useTheme } from "@/context/useTheme";

type Props = {
  className?: string;
};

export default function LightDarkToggle({ className }: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <Sun className="size-5" />
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      <Moon className="size-5" />
    </div>
  );
}
