import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function HourlySkeleton() {
  return (
    <Card
      childrenClassName="flex gap-6 overflow-x-scroll"
      title="Прогноз на 48 часов"
    >
      {Array.from({ length: 48 }).map((_, index) => (
        <div
          className="mb-2 flex flex-col items-center gap-2 2xl:justify-between"
          key={index}
        >
          <Skeleton className="h-6 w-10 2xl:scale-110" />
          <Skeleton className="size-8 rounded-full 2xl:size-10" />
          <Skeleton className="h-5.5 w-10 2xl:scale-110" />
        </div>
      ))}
    </Card>
  );
}
