import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import GustFooter from "../components/GustFooter";
import GustNavbar from "../components/GustNavbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
        <Toaster position="top-right" reverseOrder={false} />
        <GustNavbar />
        <ErrorBoundary fallback={<h2>Some think went wrong..!</h2>}>
          <React.Suspense fallback={<h2>Loading...</h2>}>
            {children}
          </React.Suspense>
        </ErrorBoundary>
        <GustFooter />
      </div>
    </>
  );
}

export default Layout;
