import React from "react";
import "@/styles/JobListing.scss";
import { useJob } from "@/JobProvider";
import { Job } from "@/models/models";
import momentjs from "moment";

import Loading from "./Loading";

const JobListing = () => {
  // @ts-ignore
  const { jobs, loadMore, fetchNews, loading } = useJob();

  if (!loading && !jobs.length) return <h2 className="not-found">No jobs found</h2>;

  return (
    <div className="jobs">
      {jobs.map(({job}: {job: Job}) => (
        <div className="job" key={job.id} >
          <h3>{job.title}</h3>
          <div>
            <ul>
              <li>{job.poster?.full_name}</li>
              <li>{job.position_function?.name_en}</li>
              <li>{momentjs(job.due_date).format('MMMM Do YYYY, h:mm:ss a')}</li>
            </ul>
          </div>
        </div>
      ))}
      {loading && <Loading />}
      {loadMore && <div className="load-more" onClick={async() => await fetchNews(true)}>Load More</div>}
    </div>
  )
}

export default JobListing;