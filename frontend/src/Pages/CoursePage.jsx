import React, { useEffect, useState } from 'react';
import Input from '../Components/Input';
import Card from '../Components/Card';
import CardContent from '../Components/CardContent';
import {motion} from 'framer-motion';
import axios from 'axios';

const coursesData = [
  {
    courseType: "v2.ondemand",
    id: "UAU3G_S5Ee6g9w7H2zB4Lw",
    slug: "backend-web-development-go-e-manual-server",
    name: "Backend Web Development with Go: Build an E-Manual Server",
    link: "https://www.coursera.org/learn/backend-web-development-go-e-manual-server"
  },
  {
    courseType: "v2.ondemand",
    id: "qHMf34MrEemL-gok0s2ofA",
    slug: "machine-learning-big-data-apache-spark",
    name: "Scalable Machine Learning on Big Data using Apache Spark",
    link: "https://www.coursera.org/learn/machine-learning-big-data-apache-spark"
  },
  {
    courseType: "v2.ondemand",
    id: "pwi7hdq_Ee6PPgr_wwYVmQ",
    slug: "machine-learning-and-nlp-basics",
    name: "Machine Learning and NLP Basics",
    link: "https://www.coursera.org/learn/machine-learning-and-nlp-basics"
  }
];

const Button = ({ onClick, children, className }) => (
    <button
      onClick={onClick}
      className={`ml-2 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition ${className}`}
    >
      {children}
    </button>
  );

export default function CoursePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [courses , setCourses] = useState(coursesData);
    const [personalisedCourses , setPersonalisedCourses] = useState(coursesData);

    const filteredCourses = coursesData.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const handleSearch = (e) => {
        e.preventDefault();
      console.log("Searching for:", searchTerm);
      getCourses();
    };

    useEffect(()=>{
        fetchPersonalisedCourses();
    },[])

    async function getCourses() {
        try{
            if(!searchTerm) return;
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_USER_URL}/getCourses`, {
                course : searchTerm
            }  , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            // console.log(response.data)
            setCourses(response.data.courses);
    }
        catch(err){
            console.log(err);
        }
    }
    
    async function fetchPersonalisedCourses() {

        try{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_USER_URL}/personalisedCourses` , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            // console.log(response.data)
            setPersonalisedCourses(response.data.courses)
        }
        catch(err){
            console.log(err);
        }
    }


  return (
    <div className="min-h-screen bg-white p-6 mt-[70px] w-[80vw] mx-auto">
      <h1 className="text-4xl font-bold text-purple-700 text-center mb-8">Explore Courses</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <Input 
          type="text" 
          placeholder="Search for courses..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md border-2 border-purple-500 focus:ring-purple-600 focus:border-purple-600"
        />
         <Button onClick={handleSearch}>Search</Button>
      </div>

      {/* Courses Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <motion.div 
            key={course.id} 
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
          >
            <Card className="border-2 border-purple-500 hover:shadow-lg min-h-[160px]">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold text-purple-700 mb-2">{course.name}</h2>
                <a 
                  href={course.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-600 underline hover:text-purple-800"
                >
                  View Course
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Personalized Courses Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-purple-700 mb-4 ml-4">Personalized Courses for You</h2>
        <p className="text-gray-600 mb-4 ml-4">Based on your interests and recent activity.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example personalized courses, can be dynamically fetched */}
          {personalisedCourses.slice(0, 2).map(course => (
            <motion.div 
              key={course.id} 
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <Card className="border-purple-500 hover:shadow-lg">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold text-purple-700 mb-2">{course.name}</h2>
                  <a 
                    href={course.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 underline hover:text-purple-800"
                  >
                    View Course
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
