import SideCardSkeleton from "./SideCardSkeleton";
import { Skeleton } from "../ui/skeleton";

export default function SidePanelSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-semibold">Качество воздуха</h1>
      <Skeleton className="size-12" />
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">AQI</h1>
      </div>
      {Array.from({ length: 8 }).map((_, index) => (
        <SideCardSkeleton key={index} />
      ))}
    </div>
  );
}
