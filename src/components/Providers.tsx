"use client";
import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "#fff"
            },
          },
          error: {
            style: {
              background: "red",
              color: "#fff"
            },
          },
        }}
      />
      {children}
    </>
  );
};

export default Providers;
