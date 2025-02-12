import React from 'react';
import Button from '../Components/Button';
import Card from '../Components/Card';
import CardContent from '../Components/CardContent';
import {FaBrain, FaLaptopCode, FaHeartbeat, FaUsers} from 'react-icons/fa';
import Hero from '../Components/Hero';
import Services from '../Components/Services';
import HowItWorks from '../Components/HowItWorks';
import Testimonials from '../Components/Testimonials';

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <Hero/>

      {/* Services Section */}
     <Services/>

      {/* How It Works Section */}
      <HowItWorks/>

      {/* Testimonials Section */}
      <Testimonials/>

      
    </div>
  );
}
