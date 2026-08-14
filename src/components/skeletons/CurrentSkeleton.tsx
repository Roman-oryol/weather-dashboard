import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function CurrentSkeleton() {
  return (
    <Card
      title="Сейчас"
      childrenClassName="flex flex-col items-center gap-4 md:justify-between"
    >
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-15 w-30" />
        <Skeleton className="size-18 rounded-full" />
        <Skeleton className="h-7 w-50" />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-xl">Местное время:</p>
        <Skeleton className="h-10 w-20" />
      </div>
      <div className="grid w-full grid-cols-3">
        <div className="grid justify-items-center gap-1">
          <p className="text-gray-500">Чувствуется</p>
          <Skeleton className="h-6 w-10" />
        </div>
        <div className="grid justify-items-center gap-1">
          <p className="text-gray-500">Влажность</p>
          <Skeleton className="h-6 w-10" />
        </div>
        <div className="grid justify-items-center gap-1">
          <p className="text-gray-500">Ветер</p>
          <Skeleton className="h-6 w-10" />
        </div>
      </div>
    </Card>
  );
}
