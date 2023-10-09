"use client";

import { FC, ReactNode } from "react";

interface DialogHeaderProps {
  icon?: ReactNode;
  headline?: string;
  text?: string;
}

const DialogHeader: FC<DialogHeaderProps> = ({ icon, headline, text }: DialogHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-center px-[24px] dark:text-white">{icon}</div>
      <div className="flex items-center justify-center px-[24px] text-headline-small dark:text-white">{headline}</div>
      <p className="flex items-center justify-center px-[24px] text-body-medium text-gray-500">{text}</p>
    </>
  );
};

export { DialogHeader };
