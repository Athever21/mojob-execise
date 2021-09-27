import React, { lazy, Suspense } from "react";
import { hot } from "react-hot-loader";
import Header from "@/components/Header";

const Filters = lazy(() => import("@/components/Filters/Filters"));
const JobListing = lazy(() => import("@/components/JobListing"));

const App = () => {
  return(
    <>
      <Header />
      <div className="container">
        <div className="content">
          <Suspense fallback={<></>}>
            <Filters />
            <JobListing />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default hot(module)(App);