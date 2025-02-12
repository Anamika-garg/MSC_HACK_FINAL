import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold text-lg mb-2">EvolveX</h4>
            <p>Empowering youth with AI-driven tools for career, creativity, and well-being.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Quick Links</h4>
            <ul>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-400 hover:text-white">Facebook</a>
              <a href="#" className="text-purple-400 hover:text-white">Instagram</a>
              <a href="#" className="text-cyan-400 hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-6 text-gray-400">&copy; 2025 EvolveX. All rights reserved.</div>
      </footer>
    </div>
  )
}

export default Footer