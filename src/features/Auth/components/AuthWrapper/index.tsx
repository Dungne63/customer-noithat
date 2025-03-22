import React, { ReactNode } from "react";
import { SITE_NAME } from "@config/site";

const AuthWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-2 grow-1 gap-8 px-8 grow">
      <div className="col-span-1 flex justify-center items-center">
        <div className="rounded-4xl shadow-2xl h-[500px] w-[600px] border-1 border-gray-100 p-8">
          <div className="text-2xl font-semibold mb-4 text-primary">
            Xin chào,
            <div className="text-lg font-semibold">
              {SITE_NAME} chúc bạn một ngày tốt lành!
            </div>
          </div>
          {children}
          <div>
            <form></form>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <div className="relative h-full w-full bg-scroll"></div>
      </div>
    </div>
  );
};

export default AuthWrapper;
