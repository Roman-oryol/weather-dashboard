import type { Dispatch, SetStateAction } from "react";
import Hamburger from "/src/assets/hamburger.svg?react";
import LightDarkToggle from "./LightDarkToggle";

type Props = {
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
};

export default function MobileHeader({ setIsSidePanelOpen }: Props) {
  return (
    <div className="bg-background xs:hidden sticky top-0 z-1001 flex h-16 w-full justify-end gap-x-8 px-8">
      <LightDarkToggle />
      <button onClick={() => setIsSidePanelOpen(true)}>
        <Hamburger className="size-6" />
      </button>
    </div>
  );
}
