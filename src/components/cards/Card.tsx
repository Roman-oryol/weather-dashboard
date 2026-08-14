import clsx from "clsx";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  title?: string;
  childrenClassName?: string;
};

export default function Card({
  children,
  className,
  title,
  childrenClassName,
}: Props) {
  return (
    <div
      className={clsx(
        "from-card to-card/60 flex flex-col gap-4 rounded-xl border border-gray-300 bg-linear-to-br p-4 shadow-md md:h-full dark:border-none",
        className,
      )}
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div
        className={clsx(
          childrenClassName,
          "animate-[fade-in_1s_ease-out_forwards] md:flex-1",
        )}
      >
        {children}
      </div>
    </div>
  );
}
