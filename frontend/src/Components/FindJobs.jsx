import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { useLocation } from 'react-router-dom';

export default function FindJobs() {
  const [data, setData] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.data) {
      setData(state.data);
    }
  }, [state]);

  // Filters for both Work Type and Job Type (mutually exclusive)
  const [filters, setFilters] = useState({ workType: '', jobType: '' });

  // Handle mutually exclusive Work Type filters
  const handleWorkTypeChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      workType: prevFilters.workType === value ? '' : value, // Uncheck if clicked again
    }));
  };

  // Handle mutually exclusive Job Type filters
  const handleJobTypeChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      jobType: prevFilters.jobType === value ? '' : value, // Uncheck if clicked again
    }));
  };

  // Filtering logic
  const filteredData = data.filter((job) => {
    const workTypeMatch =
      !filters.workType ||
      (filters.workType === 'Remote' && job.remote_derived) ||
      (filters.workType === 'Onsite' && !job.remote_derived) ||
      (filters.workType === 'Hybrid' && job.location_type === 'Hybrid');

    const jobTypeMatch =
      !filters.jobType || job.employment_type.includes(filters.jobType);

    return workTypeMatch && jobTypeMatch;
  });

  return (
    <div className="flex flex-col md:flex-row p-2 bg-gray-100 min-h-screen mt-[70px]">
      {/* Sidebar Filters */}
      <div className="w-full md:w-1/5 mt-[16px] mr-3 max-h-[600px] bg-white shadow-xl rounded-2xl p-4 space-y-6">
        {/* Work Type Filters */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-purple-700">Filter by Work Type</h2>
          {['Remote', 'Hybrid', 'Onsite'].map((workType) => (
            <div key={workType} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`workType-${workType}`}
                checked={filters.workType === workType}
                onChange={() => handleWorkTypeChange(workType)}
                className="w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-2 focus:ring-purple-400 cursor-pointer"
              />
              <label
                htmlFor={`workType-${workType}`}
                className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-purple-600 transition duration-150"
              >
                {workType}
              </label>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Job Type Filters */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-purple-700">Filter by Job Type</h2>
          {['Full time', 'Part time', 'Contract'].map((jobType) => (
            <div key={jobType} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`jobType-${jobType}`}
                checked={filters.jobType === jobType}
                onChange={() => handleJobTypeChange(jobType)}
                className="w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-2 focus:ring-purple-400 cursor-pointer"
              />
              <label
                htmlFor={`jobType-${jobType}`}
                className="ml-2 text-sm text-gray-700 capitalize cursor-pointer hover:text-purple-600 transition duration-150"
              >
                {jobType.replace('_', ' ')}
              </label>
            </div>
          ))}
        </div>
      </div>


      {/* Job Cards */}
      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((job, index) => (
            <JobCard jobData={job} key={index} />
          ))
        ) : (
          <p className="text-center col-span-full">No jobs found for the selected filters.</p>
        )}
      </div>
    </div>
  );
}
