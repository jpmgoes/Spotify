import * as React from "react";

interface IBaseBackgroundProps {
  children?: JSX.Element | JSX.Element[];
}

const BaseBackground: React.FunctionComponent<IBaseBackgroundProps> = ({
  children,
}) => {
  return (
    <div 
    className="baseBackground bg-gradient-to-t from-black to-stone-800  min-h-screen py-16">
      {children}
    </div>
  );
};

export default BaseBackground;
