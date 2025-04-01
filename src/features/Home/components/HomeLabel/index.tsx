import React, { ReactNode } from "react";

const HomeLabel: React.FC<{ label: string; right?: ReactNode }> = ({
  label,
  right,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-primary text-xl my-4 font-semibold">{label}</div>
      <div>{right}</div>
    </div>
  );
};

export default HomeLabel;
