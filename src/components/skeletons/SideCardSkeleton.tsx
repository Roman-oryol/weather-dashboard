import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function SideCardSkeleton() {
  return (
    <Card
      childrenClassName="flex flex-col gap-3"
      className="from-sidebar-accent to-sidebar-accent/60 gap-0! transition-transform duration-300 hover:scale-105"
    >
      <div className="flex justify-between">
        <Skeleton className="bg-sidebar h-7 w-12" />
        <Skeleton className="bg-sidebar h-7 w-12" />
      </div>
      <Skeleton className="bg-sidebar h-1.5 w-full" />
      <div className="flex justify-between text-xs">
        <Skeleton className="bg-sidebar h-4 w-2" />
        <Skeleton className="bg-sidebar h-4 w-2" />
      </div>
      <div className="flex justify-between">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton className="bg-sidebar h-6 w-15" key={index} />
        ))}
      </div>
    </Card>
  );
}
