import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const JobContext = React.createContext({});

export const useJob = () => useContext(JobContext);

const JobProvider = ({ children }: any) => {
  const [jobs, setJobs] = useState([]);
  const [pageSize, setPageSize] = useState("5");
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [funcFilters, setFuncFilters] = useState([] as Array<String>);

  const fetchNews = async (more: Boolean) => {
    const pageFilters =
      pageSize === "all"
        ? "?use_pagination=False"
        : `?use_pagination=True&page=${page}&page_size=${pageSize}`;
    const posFunc = `&position_functions=${funcFilters.join(",")}`;

    if (!more) setJobs([]);
    setLoadMore(false);
    
    try {
      setLoading(true);
      // @ts-ignore
      const { data } = await axios.get(`${API_URL}/listings/${pageFilters}${posFunc}`);
      if (data.next) setLoadMore(true);
      const jobs = data.results ? data.results : data;

      setJobs((j) => (more ? [...j, ...jobs] : jobs));
      setPage((p) => p + 1);
      setLoading(false);
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const addFuncFilter = (filter: String) =>
    setFuncFilters((f) => [...f, filter]);
  const removeFuncFilter = (filter: String) =>
    setFuncFilters((f) => f.filter((x) => x !== filter));

  useEffect(() => {
    (async () => {
      await fetchNews(false);
    })();
  }, [pageSize, funcFilters]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        setPageSize,
        setPage,
        loadMore,
        fetchNews,
        loading,
        addFuncFilter,
        removeFuncFilter,
        funcFilters
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobProvider;
