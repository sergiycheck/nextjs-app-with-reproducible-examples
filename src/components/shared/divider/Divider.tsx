import { FC } from "react";

interface DividerProps {
  className?: string;
}

const Divider: FC<DividerProps> = ({ className }: DividerProps) => {
  return (
    <div
      className={`flex w-full flex-row items-center dark:text-white ${className || "my-[16px]"}`}
    >
      <div className="flex h-[1px] w-full bg-indigo-100 dark:bg-gray-700/50"></div>
    </div>
  );
};

export { Divider };
