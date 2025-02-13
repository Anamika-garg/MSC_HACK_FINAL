import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../Context/AuthContext";
const Jobs = () => {

    // const dummyData ={ "data": [
    //       {
    //           "id": "1385663960",
    //           "date_posted": "2025-02-08T06:20:17",
    //           "date_created": "2025-02-08T07:53:09.374632",
    //           "title": "Senior Data Engineer",
    //           "organization": "Discoveries Quintessential",
    //           "organization_url": "https://www.linkedin.com/company/discoveries-quintessential",
    //           "date_validthrough": "2025-03-10T06:20:17",
    //           "locations_raw": [
    //               {
    //                   "@type": "Place",
    //                   "address": {
    //                       "@type": "PostalAddress",
    //                       "addressCountry": "IN",
    //                       "addressLocality": "New Delhi",
    //                       "addressRegion": null,
    //                       "streetAddress": null
    //                   },
    //                   "latitude": 28.632425,
    //                   "longitude": 77.21879
    //               }
    //           ],
    //           "location_type": null,
    //           "location_requirements_raw": null,
    //           "salary_raw": null,
    //           "employment_type": [
    //               "FULL_TIME"
    //           ],
    //           "url": "https://in.linkedin.com/jobs/view/senior-data-engineer-at-discoveries-quintessential-4145316744",
    //           "source_type": "jobboard",
    //           "source": "linkedin",
    //           "source_domain": "in.linkedin.com",
    //           "organization_logo": "https://media.licdn.com/dms/image/v2/C560BAQGMc22pjrnVCQ/company-logo_200_200/company-logo_200_200/0/1660201832358?e=2147483647&amp;v=beta&amp;t=gA0aodtUnI0rWSGZYiOXLEr6Q-Db_OKECuWjAi_vYjg",
    //           "cities_derived": [
    //               "Delhi Cantonment"
    //           ],
    //           "regions_derived": [
    //               "Delhi"
    //           ],
    //           "countries_derived": [
    //               "India"
    //           ],
    //           "locations_derived": [
    //               "Delhi Cantonment, Delhi, India"
    //           ],
    //           "timezones_derived": [
    //               "Asia/Kolkata"
    //           ],
    //           "lats_derived": [
    //               28.6
    //           ],
    //           "lngs_derived": [
    //               77.1333
    //           ],
    //           "remote_derived": false,
    //           "recruiter_name": "Namrata Jadhav",
    //           "recruiter_title": "Recruiter Analyst @Discoveries Quintessential || Master of Commerce",
    //           "recruiter_url": "https://in.linkedin.com/in/namrata-jadhav-041843277",
    //           "linkedin_org_employees": 17,
    //           "linkedin_org_url": null,
    //           "linkedin_org_size": "11-50 employees",
    //           "linkedin_org_slogan": "Talent Engineering | Knowing is half the battle",
    //           "linkedin_org_industry": "Staffing and Recruiting",
    //           "linkedin_org_followers": 158827,
    //           "linkedin_org_headquarters": "Panaji, Goa",
    //           "linkedin_org_type": "Privately Held",
    //           "linkedin_org_foundeddate": "2022",
    //           "linkedin_org_specialties": [
    //               ""
    //           ],
    //           "linkedin_org_locations": [
    //               "Panaji, Goa 403001, IN"
    //           ],
    //           "linkedin_org_description": "At DQ we are envisioning solutions which remove the inefficiencies of the current processes in Talent Acquisition. Finding Intelligent alternates to practices which are bottle necks making the process slow and inefficient. Lastly, we look for implementations which are robust, can stand the pressure of breakneck speed at which technology forces change in all spheres of our lives",
    //           "linkedin_org_recruitment_agency_derived": true,
    //           "seniority": "Mid-Senior level"
    //       },
    //       {
    //           "id": "1382706774",
    //           "date_posted": "2025-02-07T14:06:04",
    //           "date_created": "2025-02-07T16:32:15.289932",
    //           "title": "Senior Data Engineer",
    //           "organization": "Tech Economy",
    //           "organization_url": "https://www.linkedin.com/company/tech-economy-limited",
    //           "date_validthrough": "2025-03-09T14:06:03",
    //           "locations_raw": [
    //               {
    //                   "@type": "Place",
    //                   "address": {
    //                       "@type": "PostalAddress",
    //                       "addressCountry": "IN",
    //                       "addressLocality": "Delhi Cantonment",
    //                       "addressRegion": null,
    //                       "streetAddress": null
    //                   },
    //                   "latitude": 28.590015,
    //                   "longitude": 77.136536
    //               }
    //           ],
    //           "location_type": null,
    //           "location_requirements_raw": null,
    //           "salary_raw": null,
    //           "employment_type": [
    //               "FULL_TIME"
    //           ],
    //           "url": "https://in.linkedin.com/jobs/view/senior-data-engineer-at-tech-economy-4146679235",
    //           "source_type": "jobboard",
    //           "source": "linkedin",
    //           "source_domain": "in.linkedin.com",
    //           "organization_logo": "https://media.licdn.com/dms/image/v2/C4D0BAQHQ0gjkgfHrxQ/company-logo_200_200/company-logo_200_200/0/1630570389803/tech_economy_partners_logo?e=2147483647&amp;v=beta&amp;t=dsgPftebVC7AHYRYu4y6CAXSA9XDRui46PolgcmSXi0",
    //           "cities_derived": [
    //               "Delhi Cantonment"
    //           ],
    //           "regions_derived": [
    //               "Delhi"
    //           ],
    //           "countries_derived": [
    //               "India"
    //           ],
    //           "locations_derived": [
    //               "Delhi Cantonment, Delhi, India"
    //           ],
    //           "timezones_derived": [
    //               "Asia/Kolkata"
    //           ],
    //           "lats_derived": [
    //               28.6
    //           ],
    //           "lngs_derived": [
    //               77.1333
    //           ],
    //           "remote_derived": false,
    //           "recruiter_name": null,
    //           "recruiter_title": null,
    //           "recruiter_url": null,
    //           "linkedin_org_employees": 3,
    //           "linkedin_org_url": "https://techeconomy.net",
    //           "linkedin_org_size": "11-50 employees",
    //           "linkedin_org_slogan": "Strategic Advisers to Technology-Enabled Companies and Private Equity Investors",
    //           "linkedin_org_industry": "Business Consulting and Services",
    //           "linkedin_org_followers": 685,
    //           "linkedin_org_headquarters": "London, England",
    //           "linkedin_org_type": "Privately Held",
    //           "linkedin_org_foundeddate": "",
    //           "linkedin_org_specialties": [
    //               "Technology and Consulting"
    //           ],
    //           "linkedin_org_locations": [
    //               "16-19 Eastcastle Street, London, England W1W 8DY, GB"
    //           ],
    //           "linkedin_org_description": "Tech Economy is a technology focused specialty consulting firm. We conduct buy-side and sell-side Tech DDs as well as value creation assignments. Our clients include leading global and mid-market PE firms on both sides of the Atlantic, as well as their software and tech enabled portfolio companies. We cover the entire PE ownership lifecycle: from pre-investment technology diligence, post-closing 100-day planning, tech value creation, through to Vendor DD exit preparation.\n\nOur firm works and has deep experience across a wide range of technology segments including, ERP, Healthcare IT, E-commerce, Cybersecurity, E-Learning, IT services, Data Analytics, and AI.\n\nWe know what it takes to run a successful technology company and how to ensure investment transaction completion. We have the expertise, experience, and resources to deliver rapid and actionable output and create lasting value for our clients.",
    //           "linkedin_org_recruitment_agency_derived": false,
    //           "seniority": "Mid-Senior level"
    //       },
    //       {
    //           "id": "1383475020",
    //           "date_posted": "2025-02-07T14:02:52",
    //           "date_created": "2025-02-07T20:26:55.298099",
    //           "title": "Associate, Data Engineer",
    //           "organization": "Tech Economy",
    //           "organization_url": "https://www.linkedin.com/company/tech-economy-limited",
    //           "date_validthrough": "2025-03-09T14:02:51",
    //           "locations_raw": [
    //               {
    //                   "@type": "Place",
    //                   "address": {
    //                       "@type": "PostalAddress",
    //                       "addressCountry": "IN",
    //                       "addressLocality": "Delhi",
    //                       "addressRegion": null,
    //                       "streetAddress": null
    //                   },
    //                   "latitude": 28.65195,
    //                   "longitude": 77.23149
    //               }
    //           ],
    //           "location_type": null,
    //           "location_requirements_raw": null,
    //           "salary_raw": null,
    //           "employment_type": [
    //               "FULL_TIME"
    //           ],
    //           "url": "https://in.linkedin.com/jobs/view/associate-data-engineer-at-tech-economy-4146669408",
    //           "source_type": "jobboard",
    //           "source": "linkedin",
    //           "source_domain": "in.linkedin.com",
    //           "organization_logo": "https://media.licdn.com/dms/image/v2/C4D0BAQHQ0gjkgfHrxQ/company-logo_200_200/company-logo_200_200/0/1630570389803/tech_economy_partners_logo?e=2147483647&amp;v=beta&amp;t=dsgPftebVC7AHYRYu4y6CAXSA9XDRui46PolgcmSXi0",
    //           "cities_derived": [
    //               "Delhi"
    //           ],
    //           "regions_derived": [
    //               "Delhi"
    //           ],
    //           "countries_derived": [
    //               "India"
    //           ],
    //           "locations_derived": [
    //               "Delhi, Delhi, India"
    //           ],
    //           "timezones_derived": [
    //               "Asia/Kolkata"
    //           ],
    //           "lats_derived": [
    //               28.61
    //           ],
    //           "lngs_derived": [
    //               77.23
    //           ],
    //           "remote_derived": false,
    //           "recruiter_name": null,
    //           "recruiter_title": null,
    //           "recruiter_url": null,
    //           "linkedin_org_employees": 3,
    //           "linkedin_org_url": "https://techeconomy.net",
    //           "linkedin_org_size": "11-50 employees",
    //           "linkedin_org_slogan": "Strategic Advisers to Technology-Enabled Companies and Private Equity Investors",
    //           "linkedin_org_industry": "Business Consulting and Services",
    //           "linkedin_org_followers": 698,
    //           "linkedin_org_headquarters": "London, England",
    //           "linkedin_org_type": "Privately Held",
    //           "linkedin_org_foundeddate": "",
    //           "linkedin_org_specialties": [
    //               "Technology and Consulting"
    //           ],
    //           "linkedin_org_locations": [
    //               "16-19 Eastcastle Street, London, England W1W 8DY, GB"
    //           ],
    //           "linkedin_org_description": "Tech Economy is a technology focused specialty consulting firm. We conduct buy-side and sell-side Tech DDs as well as value creation assignments. Our clients include leading global and mid-market PE firms on both sides of the Atlantic, as well as their software and tech enabled portfolio companies. We cover the entire PE ownership lifecycle: from pre-investment technology diligence, post-closing 100-day planning, tech value creation, through to Vendor DD exit preparation.\n\nOur firm works and has deep experience across a wide range of technology segments including, ERP, Healthcare IT, E-commerce, Cybersecurity, E-Learning, IT services, Data Analytics, and AI.\n\nWe know what it takes to run a successful technology company and how to ensure investment transaction completion. We have the expertise, experience, and resources to deliver rapid and actionable output and create lasting value for our clients.",
    //           "linkedin_org_recruitment_agency_derived": false,
    //           "seniority": "Entry level"
    //       },
    //       {
    //           "id": "1383475012",
    //           "date_posted": "2025-02-07T14:02:01",
    //           "date_created": "2025-02-07T20:26:55.204843",
    //           "title": "Associate - Data Engineer",
    //           "organization": "Tech Economy",
    //           "organization_url": "https://www.linkedin.com/company/tech-economy-limited",
    //           "date_validthrough": "2025-03-09T14:02:00",
    //           "locations_raw": [
    //               {
    //                   "@type": "Place",
    //                   "address": {
    //                       "@type": "PostalAddress",
    //                       "addressCountry": "IN",
    //                       "addressLocality": "Delhi",
    //                       "addressRegion": null,
    //                       "streetAddress": null
    //                   },
    //                   "latitude": 28.65195,
    //                   "longitude": 77.23149
    //               }
    //           ],
    //           "location_type": null,
    //           "location_requirements_raw": null,
    //           "salary_raw": null,
    //           "employment_type": [
    //               "FULL_TIME"
    //           ],
    //           "url": "https://in.linkedin.com/jobs/view/associate-data-engineer-at-tech-economy-4146667519",
    //           "source_type": "jobboard",
    //           "source": "linkedin",
    //           "source_domain": "in.linkedin.com",
    //           "organization_logo": "https://media.licdn.com/dms/image/v2/C4D0BAQHQ0gjkgfHrxQ/company-logo_200_200/company-logo_200_200/0/1630570389803/tech_economy_partners_logo?e=2147483647&amp;v=beta&amp;t=dsgPftebVC7AHYRYu4y6CAXSA9XDRui46PolgcmSXi0",
    //           "cities_derived": [
    //               "Delhi"
    //           ],
    //           "regions_derived": [
    //               "Delhi"
    //           ],
    //           "countries_derived": [
    //               "India"
    //           ],
    //           "locations_derived": [
    //               "Delhi, Delhi, India"
    //           ],
    //           "timezones_derived": [
    //               "Asia/Kolkata"
    //           ],
    //           "lats_derived": [
    //               28.61
    //           ],
    //           "lngs_derived": [
    //               77.23
    //           ],
    //           "remote_derived": false,
    //           "recruiter_name": null,
    //           "recruiter_title": null,
    //           "recruiter_url": null,
    //           "linkedin_org_employees": 3,
    //           "linkedin_org_url": "https://techeconomy.net",
    //           "linkedin_org_size": "11-50 employees",
    //           "linkedin_org_slogan": "Strategic Advisers to Technology-Enabled Companies and Private Equity Investors",
    //           "linkedin_org_industry": "Business Consulting and Services",
    //           "linkedin_org_followers": 698,
    //           "linkedin_org_headquarters": "London, England",
    //           "linkedin_org_type": "Privately Held",
    //           "linkedin_org_foundeddate": "",
    //           "linkedin_org_specialties": [
    //               "Technology and Consulting"
    //           ],
    //           "linkedin_org_locations": [
    //               "16-19 Eastcastle Street, London, England W1W 8DY, GB"
    //           ],
    //           "linkedin_org_description": "Tech Economy is a technology focused specialty consulting firm. We conduct buy-side and sell-side Tech DDs as well as value creation assignments. Our clients include leading global and mid-market PE firms on both sides of the Atlantic, as well as their software and tech enabled portfolio companies. We cover the entire PE ownership lifecycle: from pre-investment technology diligence, post-closing 100-day planning, tech value creation, through to Vendor DD exit preparation.\n\nOur firm works and has deep experience across a wide range of technology segments including, ERP, Healthcare IT, E-commerce, Cybersecurity, E-Learning, IT services, Data Analytics, and AI.\n\nWe know what it takes to run a successful technology company and how to ensure investment transaction completion. We have the expertise, experience, and resources to deliver rapid and actionable output and create lasting value for our clients.",
    //           "linkedin_org_recruitment_agency_derived": false,
    //           "seniority": "Sin experiencia"
    //       },
    //       {
    //           "id": "1381713400",
    //           "date_posted": "2025-02-07T06:20:43",
    //           "date_created": "2025-02-07T11:28:52.292713",
    //           "title": "Senior Data Engineer",
    //           "organization": "Discoveries Quintessential",
    //           "organization_url": "https://www.linkedin.com/company/discoveries-quintessential",
    //           "date_validthrough": "2025-03-09T06:20:43",
    //           "locations_raw": [
    //               {
    //                   "@type": "Place",
    //                   "address": {
    //                       "@type": "PostalAddress",
    //                       "addressCountry": "IN",
    //                       "addressLocality": "New Delhi",
    //                       "addressRegion": null,
    //                       "streetAddress": null
    //                   },
    //                   "latitude": 28.632425,
    //                   "longitude": 77.21879
    //               }
    //           ],
    //           "location_type": null,
    //           "location_requirements_raw": null,
    //           "salary_raw": null,
    //           "employment_type": [
    //               "FULL_TIME"
    //           ],
    //           "url": "https://in.linkedin.com/jobs/view/senior-data-engineer-at-discoveries-quintessential-4143745332",
    //           "source_type": "jobboard",
    //           "source": "linkedin",
    //           "source_domain": "in.linkedin.com",
    //           "organization_logo": "https://media.licdn.com/dms/image/v2/C560BAQGMc22pjrnVCQ/company-logo_200_200/company-logo_200_200/0/1660201832358?e=2147483647&amp;v=beta&amp;t=gA0aodtUnI0rWSGZYiOXLEr6Q-Db_OKECuWjAi_vYjg",
    //           "cities_derived": [
    //               "Delhi Cantonment"
    //           ],
    //           "regions_derived": [
    //               "Delhi"
    //           ],
    //           "countries_derived": [
    //               "India"
    //           ],
    //           "locations_derived": [
    //               "Delhi Cantonment, Delhi, India"
    //           ],
    //           "timezones_derived": [
    //               "Asia/Kolkata"
    //           ],
    //           "lats_derived": [
    //               28.6
    //           ],
    //           "lngs_derived": [
    //               77.1333
    //           ],
    //           "remote_derived": false,
    //           "recruiter_name": "Namrata Jadhav",
    //           "recruiter_title": "Recruiter Analyst @Discoveries Quintessential || Master of Commerce",
    //           "recruiter_url": "https://in.linkedin.com/in/namrata-jadhav-041843277",
    //           "linkedin_org_employees": 18,
    //           "linkedin_org_url": null,
    //           "linkedin_org_size": "11-50 employees",
    //           "linkedin_org_slogan": "Talent Engineering | Knowing is half the battle",
    //           "linkedin_org_industry": "Staffing and Recruiting",
    //           "linkedin_org_followers": 158563,
    //           "linkedin_org_headquarters": "Panaji, Goa",
    //           "linkedin_org_type": "Privately Held",
    //           "linkedin_org_foundeddate": "2022",
    //           "linkedin_org_specialties": [
    //               ""
    //           ],
    //           "linkedin_org_locations": [
    //               "Panaji, Goa 403001, IN"
    //           ],
    //           "linkedin_org_description": "At DQ we are envisioning solutions which remove the inefficiencies of the current processes in Talent Acquisition. Finding Intelligent alternates to practices which are bottle necks making the process slow and inefficient. Lastly, we look for implementations which are robust, can stand the pressure of breakneck speed at which technology forces change in all spheres of our lives",
    //           "linkedin_org_recruitment_agency_derived": true,
    //           "seniority": "Mid-Senior level"
    //       }
    //   ]};

      

    const navigate = useNavigate();
    const [myData, setMyData] = useState([]);
    const [formData, setFormData] = useState({
        jobTitle: '',
        location: ''
    })
    const [show,setShow] = useState(true)

    const {isAuthenticated} = useAuth();

      useEffect(()=>{
        if(!isAuthenticated){
          setShow(false)
        }
      },[]);

    const findJob = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('jobTitle', formData.jobTitle);
        data.append('location', formData.location);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_JOB_URL}/jobs`, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            // console.log(res.data);
            navigate('/findJobs' , {state : res.data})

        }
        catch (err) {
            console.log(err);
        }
        // navigate('/findJobs');
    }

    useEffect(() => {
        fetchDetails();
    }, [])

    async function fetchDetails() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_JOB_URL}/jobsInterestedIn`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            // console.log(res.data);
            setMyData(res.data.data)

        }
        catch (err) {
            console.log(err);
        }
    }

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="bg-white text-gray-800 font-sans">
            {/* Hero Section */}
            <header className="text-center bg-purple-50 py-16 mt-[70px] px-4 sm:px-8 md:px-16 lg:px-32">
                <h2 className="text-3xl sm:text-4xl font-bold text-purple-700">Get Your Desired Job!</h2>
                <p className="text-gray-600 mt-4 text-sm sm:text-base">Find Jobs, Employment & Career Opportunities</p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <input type="text" placeholder="Job Title" className="border border-gray-300 p-3 w-full sm:w-1/3 rounded-md" name="jobTitle" value={FormData.jobTitle} onChange={changeHandler} />
                    <input type="text" placeholder="City or State" className="border border-gray-300 p-3 w-full sm:w-1/3 rounded-md" name="location" value={FormData.location} onChange={changeHandler} />
                    <button className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 w-full sm:w-auto" onClick={findJob}>Find a Job</button>
                </div>
                <p className="mt-4 text-gray-500 text-xs sm:text-sm">Trending Keywords: Automotive, Education, Health & Care, Engineering</p>
            </header>

            {/* Jobs Section */}
            <section className="bg-purple-50 py-16 px-4 sm:px-8 md:px-16 lg:px-32">
                <h3 className="text-center text-2xl sm:text-3xl font-bold text-purple-700">Jobs You May Be Interested In</h3>
                {
                    show ?  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myData.map((job, index) => (
                        <div
                            key={index}
                            className="p-6 border border-gray-200 rounded-md bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <h4 className="text-lg font-semibold text-purple-700">{job.title}</h4>
                            <p className="text-gray-600 mt-1">{job.organization}</p>
                            <p className="text-gray-500 text-sm mt-1">{job.employment_type[0].replace('_', '-')}</p>
                            <a
                                href={job.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                View Job Posting
                            </a>
                        </div>
                    ))}
                    {/* {[
                        { title: "Post-Room Operate", company: "Tour Design LTD", time: "1 Hr Ago" },
                        { title: "Data Entry", company: "Via Technos Inc.", time: "3 Hr Ago" },
                        { title: "Graphic Designer", company: "Daven Design", time: "4 Hr Ago" },
                        { title: "Web Developer", company: "Web Magnews", time: "5 Hr Ago" },
                        { title: "Digital Marketer", company: "VIA Marketer LTD", time: "6 Hr Ago" },
                        { title: "UI/UX Designer", company: "Via Design Hunter", time: "7 Hr Ago" },
                    ].map((job, index) => (
                        <div
                            key={index}
                            className="p-6 border border-gray-200 rounded-md bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <h4 className="text-lg font-semibold text-purple-700">{job.title}</h4>
                            <p className="text-gray-600 mt-1">{job.company}</p>
                            <p className="text-gray-500 text-sm mt-1">{job.time}</p>
                        </div>
                    ))} */}
                </div> : <h1 className="text-center mt-3">Login first...</h1>
                }
               
            </section>
        </div>
    );
};

export default Jobs;
