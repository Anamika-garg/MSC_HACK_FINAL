import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
const Hero = () => {
  const slides = [
    {
      title: "Discover Personalized Career Paths",
      description: "Let AI guide you to the right career based on your interests, skills, and aspirations.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      title: "Enhance Your Mental Well-being",
      description: "Track your mood and receive AI-generated affirmations for a healthier mind.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      title: "Connect with Young Creators",
      description: "Join a vibrant community of innovators, thinkers, and creators from around the world.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      title: "Boost Your Learning with AI",
      description: "Access personalized courses and learning paths to grow your skills effectively.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      ></div>
      <div className="absolute inset-0 bg-opacity-60 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
        <p className="text-lg max-w-2xl">{slide.description}</p>

        <div className="mt-6 flex space-x-4">
          <Link to={'/signup'}>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full text-lg">
            Get Started
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
