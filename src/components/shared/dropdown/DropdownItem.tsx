import React, { FC, ReactNode } from "react";

type DropdownItemProps = {
  children?: ReactNode;
  id?: string;
  label?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  divAttributes?: React.HTMLAttributes<HTMLDivElement>;
};

const DropdownItem: FC<DropdownItemProps> = ({
  children,
  label,
  leftElement,
  rightElement,
  id,
  divAttributes,
}: DropdownItemProps) => {
  return (
    <div className="flex items-start" key={id} {...divAttributes}>
      <div
        className="z-50 flex h-[48px] w-full cursor-pointer items-center justify-start bg-indigo-50 pl-[12px] pr-[24px] 
        text-label-large text-black hover:bg-indigo-100 dark:bg-gray-800 dark:text-white hover:dark:bg-gray-700 dark:hover:text-white"
      >
        <div className={`${leftElement && "pr-[12px] text-gray-500"}`}>{leftElement}</div>
        <p className="flex w-full">{label || children}</p>
        <div className={`${rightElement && "min-w-max pl-[28px] text-body-small text-gray-500"}`}>
          {rightElement}
        </div>
      </div>
    </div>
  );
};

export { DropdownItem };
