import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { toast , ToastContainer } from "react-toastify";

const CompleteProfile = () => {
  const navigate = useNavigate()
  const [loading , setLoading] = useState(false);
  const [experiences, setExperiences] = useState([
    { company: "", position: "", startDate: "", endDate: "" },
  ]);

  const [educations, setEducations] = useState([
    { course: "", college: "", startDate: "", endDate: "", pursuing: false },
  ]);

  const [location, setLocation] = useState({
    city: '',
    country: ''
  });

  const [profession, setProfession] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const addExperience = () => {
    setExperiences([...experiences, { company: "", position: "", startDate: "", endDate: "" }]);
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setExperiences(updatedExperiences);
  };

  const addEducation = () => {
    setEducations([...educations, { course: "", college: "", startDate: null, endDate: null, pursuing: false }]);
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducations = educations.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setEducations(updatedEducations);
  };

  const handleLocationChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    for (let i = 0; i < experiences.length; i++) {
      const { company, position, startDate, endDate } = experiences[i];
  
      if ((company || position) && (!startDate || !endDate)) {
        toast.error(`Please provide start and end dates for experience #${i + 1}`);
        return; 
      }

    }
    for (let i = 0; i < educations.length; i++) {
      const { course, college, startDate, endDate } = educations[i];
  
      if (!startDate || !endDate || !course || !college ) {
        toast.error(`Please provide start and end dates for Education #${i + 1}`);
        // console.log(educations)
        return; 
      }
    }

  
    try {
      setLoading(true)
      const data = new FormData();
      data.append('Skills', JSON.stringify(skills));
      data.append('Experience', JSON.stringify(experiences));
      data.append('Education', JSON.stringify(educations));
      data.append('Bio', bio);
      data.append('Phone', phone);
      data.append('location', JSON.stringify(location));
      data.append('profession', profession);
      
      if (profilePhoto) {
        data.append('Avatar', profilePhoto);
      }
  
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_USER_URL}/userDetails`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
  
      toast.success(response.data.success);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.error || "An error occurred!");
      console.error(err);
    }
    setLoading(false);
  };
  

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-[50px]">
      <ToastContainer/>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[100vw] md:max-w-[60vw]">
        <h1 className="text-2xl font-bold text-center text-purple-600 mb-6">Complete Your Profile</h1>

        {/* Profile Photo Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative bg-purple-100 text-purple-600 rounded-full w-20 h-20 flex justify-center items-center mb-3 text-2xl overflow-hidden">
            {profilePhoto ? (
              <img src={URL.createObjectURL(profilePhoto)} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              "📍"
            )}
          </div>
          <input type="file" className="hidden" id="upload-photo" accept="image/*" onChange={handlePhotoChange} />
          <label htmlFor="upload-photo" className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-500 cursor-pointer">
            {profilePhoto ? "Change Photo" : "Upload Photo"}
          </label>
        </div>

        {/* Profession Input */}
        <div className="mb-4">
          <label htmlFor="profession" className="block text-gray-700 mb-2">Profession</label>
          <input
            type="text"
            id="profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Your Profession"
          />
        </div>

        {/* Skills Input */}
        <div className="mb-4">
          <label htmlFor="skills" className="block text-gray-700 mb-2">Skills</label>
          <input
            type="text"
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Your Skills (separated by commas)"
          />
        </div>

        {/* Work Experience Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Work Experience (optional)</h2>
          {experiences.map((experience, index) => (
            <div key={index} className="mb-4 space-y-2">
              <input
                type="text"
                placeholder="Company"
                value={experience.company}
                onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Position"
                value={experience.position}
                onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex gap-4">
                <input
                  type="date"
                  value={experience.startDate}
                  onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="date"
                  value={experience.endDate}
                  onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          ))}
          
        </div>

        {/* Education Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Education</h2>
          {educations.map((education, index) => (
            <div key={index} className="mb-4 space-y-2">
              <input
                type="text"
                placeholder="Course"
                value={education.course}
                onChange={(e) => handleEducationChange(index, "course", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="College"
                value={education.college}
                onChange={(e) => handleEducationChange(index, "college", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex gap-4 items-center">
                <input
                  type="date"
                  value={education.startDate}
                  onChange={(e) => handleEducationChange(index, "startDate", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="date"
                  value={education.endDate}
                  onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                  // disabled={education.pursuing}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={education.pursuing}
                  onChange={(e) => handleEducationChange(index, "pursuing", e.target.checked)}
                  className="mr-2"
                />
                <label className="text-gray-700">Currently Pursuing</label>
              </div>
            </div>
          ))}
          
        </div>

        {/* Contact Info */}
        <div className="mt-6">
          <label htmlFor="bio" className="block text-gray-700 mb-2">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 h-24"
          ></textarea>
        </div>
        <div className="mt-4">
          <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mt-4 flex gap-4">
          <input
            type="text"
            name="city"
            value={location.city}
            onChange={handleLocationChange}
            placeholder="City"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="country"
            value={location.country}
            onChange={handleLocationChange}
            placeholder="Country"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-500">
          {
            loading ? `Wait a minute.`: `Complete Profile`
          } 
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;
