import * as React from "react";
import { IconType } from "react-icons";

interface IMenuItemProps {
  Icon: IconType;
  title: String;
  onClick?: () => void;
}

const MenuItem: React.FunctionComponent<IMenuItemProps> = ({
  title,
  Icon,
  onClick,
}) => {
  return (
    <>
      <h1
        className="mb-2 flex cursor-pointer items-center gap-2 p-1 text-left font-semibold text-stone-300 duration-200 ease-out hover:text-white"
        onClick={onClick}
      >
        <Icon className="h-6 w-6" />
        <div>{title}</div>
      </h1>
    </>
  );
};

export default MenuItem;
