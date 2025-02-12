import React from 'react';
import Button from '../Components/Button';
import Card from '../Components/Card';
import CardContent from '../Components/CardContent';
import { FaBrain, FaLaptopCode, FaHeartbeat, FaUsers } from 'react-icons/fa';

const Testimonials = () => {
  return (
    <div className="bg-white py-10 flex flex-col gap-[15px]">
  {/* Section Title */}
  <h2 className="text-4xl font-bold text-center text-gray-800 mb">Testimonials</h2>
 

  {/* Testimonial Cards */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 mt-3 gap-6 px-4">
    {/* Testimonial 1 */}
    <div className="bg-purple-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300">
      <div className="flex items-center mb-4">
        <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="John Smith" className="w-12 h-12 rounded-full" />
        <div className="ml-4">
          <h3 className="text-xl font-bold text-gray-800">John Smith</h3>
          <p className="text-gray-600">Software Engineer</p>
        </div>
      </div>
      <p className="text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum 
        tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
      </p>
    </div>

    {/* Testimonial 2 */}
    <div className="bg-purple-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300">
      <div className="flex items-center mb-4">
        <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Emily Johnson" className="w-12 h-12 rounded-full" />
        <div className="ml-4">
          <h3 className="text-xl font-bold text-gray-800">Emily Johnson</h3>
          <p className="text-gray-600">Marketing Specialist</p>
        </div>
      </div>
      <p className="text-gray-700">
        The personalized courses offered on this platform are top-notch! They are tailored to my needs and 
        have helped me upskill in areas I was lacking. I highly recommend it to anyone looking to advance their career.
      </p>
    </div>
  </div>
</div>

  );
};

export default Testimonials;
