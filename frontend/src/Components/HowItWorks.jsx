import React from 'react'

const HowItWorks = () => {
  return (
    <>
        <section className="bg-gray-100 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Simple Steps to Get Started</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold text-purple-500">1</div>
            <h4 className="text-lg font-semibold mt-2">Sign Up</h4>
            <p>Create your profile and explore our AI tools.</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-500">2</div>
            <h4 className="text-lg font-semibold mt-2">Personalize</h4>
            <p>Input your goals and interests for tailored recommendations.</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-500">3</div>
            <h4 className="text-lg font-semibold mt-2">Explore</h4>
            <p>Access AI-curated resources, mentors, and tools.</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-pink-500">4</div>
            <h4 className="text-lg font-semibold mt-2">Grow</h4>
            <p>Achieve your goals with continuous AI support and insights.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default HowItWorks