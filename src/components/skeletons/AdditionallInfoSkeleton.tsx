import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function AdditionalInfo() {
  return (
    <Card title="Дополнительная информация" childrenClassName="grid gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="flex justify-between" key={index}>
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-30" />
            <Skeleton className="size-8 rounded-full" />
          </div>
          <Skeleton className="h-8 w-10" />
        </div>
      ))}
    </Card>
  );
}
