import React from 'react';
import Card from '../Components/Card';
import CardContent from '../Components/CardContent';
import Button from '../Components/Button';
import { MapPin, Briefcase, Globe, User } from 'lucide-react';

const JobCard = ({ jobData }) => {
    return (
      <Card className="max-w-md mx-auto my-4 shadow-lg border border-gray-200 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            {/* <img
              src={jobData.organization_logo}
              alt={`${jobData.organization} Logo`}
              className="w-16 h-16 rounded-full mr-4"
            /> */}
            <div>
              <h2 className="text-xl font-bold text-gray-800">{jobData.title}</h2>
              <p className="text-sm text-gray-600">{jobData.organization}</p>
              <p className="text-xs text-gray-500">{jobData.linkedin_org_size} | {jobData.linkedin_org_industry}</p>
            </div>
          </div>
  
          <div className="flex items-center text-sm text-gray-700 mb-2">
            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
            <span>{jobData.locations_derived[0]}</span>
          </div>
  
          <div className="flex items-center text-sm text-gray-700 mb-2">
            <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
            <span>{jobData.employment_type[0].replace('_', '-')} | {jobData.seniority}</span>
          </div>
  
          <div className="flex items-center text-sm text-gray-700 mb-4">
            <Globe className="w-4 h-4 mr-2 text-gray-500" />
            <a 
              href={jobData.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Job Posting
            </a>
          </div>
  
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center mb-2">
              <User className="w-4 h-4 mr-2 text-gray-500" />
              <div>
                <p className="font-medium text-gray-800">{jobData.recruiter_name}</p>
                <p className="text-xs text-gray-600">{jobData.recruiter_title}</p>
                <a 
                  href={jobData.recruiter_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs hover:underline"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
  
          <Button className="w-full bg-purple-600 text-white mt-4 hover:bg-purple-700">
            Apply Now
          </Button>
        </CardContent>
      </Card>
    );
  };
  
  export default JobCard;