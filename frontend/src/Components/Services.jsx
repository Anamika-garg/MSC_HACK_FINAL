import React from 'react'
import Card from './Card';
import CardContent from './CardContent';
import {FaBrain, FaLaptopCode, FaHeartbeat, FaUsers} from 'react-icons/fa';

const Services = () => {
  return (
    <>
         <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Our AI-Powered Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8">
          <Card className="text-center p-6">
            <CardContent>
              <FaBrain className="text-5xl text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Career Guidance</h3>
              <p>AI recommends personalized career paths, courses, and mentors.</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent>
              <FaHeartbeat className="text-5xl text-pink-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Mental Health</h3>
              <p>Track mood patterns and access AI-powered therapy chats.</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent>
              <FaUsers className="text-5xl text-purple-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Youth Network</h3>
              <p>Connect with young creators, share projects, and find collaborators.</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent>
              <FaLaptopCode className="text-5xl text-green-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
              <p>Adaptive learning paths and AI-driven study aids tailored to you.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}

export default Services