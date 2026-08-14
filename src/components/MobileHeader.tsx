import type { Dispatch, SetStateAction } from "react";
import Hamburger from "/src/assets/hamburger.svg?react";

type Props = {
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
};

export default function MobileHeader({ setIsSidePanelOpen }: Props) {
  return (
    <div className="bg-background xs:hidden sticky top-0 z-1001 flex h-16 w-full justify-end p-4">
      <button onClick={() => setIsSidePanelOpen(true)}>
        <Hamburger className="size-6 invert" />
      </button>
    </div>
  );
}
