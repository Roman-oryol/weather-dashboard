import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function DailySkeleton() {
  return (
    <Card
      title="Прогноз на 8 дней"
      childrenClassName="flex flex-col gap-4 md:justify-between"
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="flex items-center justify-between" key={index}>
          <Skeleton className="h-8 w-9" />
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-8 w-10" />
          <Skeleton className="h-8 w-10" />
          <Skeleton className="h-8 w-10" />
        </div>
      ))}
    </Card>
  );
}
