import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function AdditionalInfo() {
  return (
    <Card
      title="Дополнительная информация"
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="flex items-center justify-between" key={index}>
          <div className="grid grid-cols-[1fr_auto] gap-4 text-left">
            <Skeleton className="h-8 w-30" />
            <Skeleton className="size-8 rounded-full" />
          </div>
          <Skeleton className="h-8 w-10" />
        </div>
      ))}
    </Card>
  );
}
