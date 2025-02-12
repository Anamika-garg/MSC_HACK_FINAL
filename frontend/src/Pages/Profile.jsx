import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import CardContent from '../Components/CardContent';
import Button from '../Components/Button';
import { MapPin, Briefcase, GraduationCap, Phone, Mail, Info } from "lucide-react";
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate()
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const {isAuthenticated} = useAuth();

    useEffect(()=>{
      setTimeout(() => {
        if(!localStorage.getItem('authToken')){
          toast.error("Login first!")
          setTimeout(()=>{
            navigate('/login')
          },1200)
        }
      }, 1000);
    },[])

  useEffect(() => {
    fetchDetails();
  }, []);

  async function fetchDetails() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_USER_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if(!(response.data.profile?.details) && response.data.profile.email){
        // console.log(!(response.data.profile.details) && response.data.profile.email)
        toast.error("Complete Your profile first!");
        setTimeout(()=>{
          navigate('/complete');
        },1700)
        return
      }
      console.log(response.data.profile);
      setData(response.data.profile);
      setFormData(response.data.profile?.details);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to load profile");
      console.log(err);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_USER_URL}/profile`, 
        { details: formData }, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      );
      setData(prevData => ({
        ...prevData,
        details: formData
      }));
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update profile");
      console.log(err);
    }
  };

  const logoutHandler = () =>{
    logout();
    navigate('/login')
  }
  const handleCancel = () => {
    setFormData(data.details);
    setIsEditing(false);
  };

  if (!data) return <div>Loading...</div>;

  const { fullName, email, details } = data;

  return (
    <div className="max-w-4xl mx-auto p-4 mt-[90px]">
      <ToastContainer />
      <Card className="p-4 shadow-lg rounded-2xl">
        <CardContent className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-purple-100 rounded-full overflow-hidden">
            <img src={details?.photoURL} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            {isEditing ? (
              <input 
                type="text" 
                name="fullName" 
                value={formData.fullName || ''} 
                onChange={handleInputChange} 
                className="text-3xl font-bold text-gray-900 border p-1 rounded"
              />
            ) : (
              <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
            )}
            <p className="text-gray-600 flex items-center mt-1"><Mail className="w-4 h-4 mr-2" /> {email}</p>
            <p className="text-gray-600 flex items-center mt-1"><Phone className="w-4 h-4 mr-2" /> {details?.Phone ? details?.Phone : ''}</p>
            <Button onClick={logoutHandler} className="block text-left px-4 py-2 text-gray-700 hover:bg-gray-100 mt-2 rounded-md">
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-gray-50 mt-6 p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Bio</h2>
        {isEditing ? (
          <textarea 
            name="Bio" 
            value={formData.Bio ? formData.Bio : ''} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded"
          />
        ) : (
          <p className="text-gray-700 flex items-center"><Info className="w-4 h-4 mr-2" /> {details?.Bio}</p>
        )}
      </div>

      <div className="bg-gray-50 mt-6 p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
        {isEditing ? (
          <textarea 
            name="Skills" 
            value={formData.Skills?.join(', ') ? formData.Skills?.join(', ')  : ''} 
            onChange={(e) => handleInputChange({ target: { name: 'Skills', value: e.target.value.split(',').map(skill => skill.trim()) } })} 
            className="w-full p-2 border rounded"
          />
        ) : (
          <ul className="list-disc list-inside text-gray-700">
            {details?.Skills && details?.Skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-gray-50 mt-6 p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Experience</h2>
        {isEditing ? (
          <textarea 
            name="Experience" 
            value={JSON.stringify(formData.Experience, null, 2) || ''} 
            onChange={(e) => handleInputChange({ target: { name: 'Experience', value: JSON.parse(e.target.value) } })} 
            className="w-full p-2 border rounded"
          />
        ) : (
          <ul className="list-disc list-inside text-gray-700">
            {details?.Experience && details?.Experience.map((exp, index) => (
              <>
              {
                exp.position ?  <p key={index}>
                <strong>Position:</strong> {exp.position ? exp.position : '-' }
                <br />
                  <strong>Company:</strong> {exp.company ? exp.company : '-' }, 
                <br />
                 
                  <strong>Start Date:</strong> {exp.startDate?.split('T')[0] ?  exp.startDate?.split('T')[0] : '-'}
                <br />
                  
                   <strong>End Date:</strong> {exp.currentlyWorking ? exp.currentlyWorking : '-'  ? 'Currently Working' : exp.endDate.split('T')[0] ? exp.startDate.split('T')[0] : '-'}
                <br />
                   
                </p> : <>-</>
              }
             
                  </>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-gray-50 mt-6 p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Education</h2>
        {isEditing ? (
          <textarea 
            name="Education" 
            value={JSON.stringify(formData.Education, null, 2) || ''} 
            onChange={(e) => handleInputChange({ target: { name: 'Education', value: JSON.parse(e.target.value) } })} 
            className="w-full p-2 border rounded"
          />
        ) : (
          <ul className="list-disc list-inside text-gray-700">
            {details?.Education && details?.Education.map((edu, index) => (
              <p key={index}>
                <strong>Institution:</strong> {edu.college} <br/> <strong>Degree:</strong> {edu.course} <br/> 
                <strong>From:</strong> {edu.startDate?.split('T')[0]} <br/> <strong>To:</strong> {edu.endDate?.split('T')[0]}
              </p>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-gray-50 mt-6 p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
        {isEditing ? (
          <>
            <input 
              type="text" 
              name="city" 
              placeholder="City" 
              value={formData.location?.[0]?.city || ''} 
              onChange={(e) => {
                const updatedLocation = [...(formData.location || [{}])];
                updatedLocation[0] = { ...updatedLocation[0], city: e.target.value };
                setFormData(prevState => ({ ...prevState, location: updatedLocation }));
              }} 
              className="p-2 border rounded mb-2 w-full"
            />
            <input 
              type="text" 
              name="country" 
              placeholder="Country" 
              value={formData.location?.[0]?.country || ''} 
              onChange={(e) => {
                const updatedLocation = [...(formData.location || [{}])];
                updatedLocation[0] = { ...updatedLocation[0], country: e.target.value };
                setFormData(prevState => ({ ...prevState, location: updatedLocation }));
              }} 
              className="p-2 border rounded w-full"
            />
          </>
        ) : (
          <p className="text-gray-700 flex items-center"><MapPin className="w-4 h-4 mr-2" /> {details?.location[0].city}, {details?.location[0].country}</p>
        )}
      </div>

      {isEditing ? (
        <div className="flex justify-between mt-6">
          <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white text-lg py-2 px-4 rounded-2xl">
            Save Changes
          </Button>
          <Button onClick={handleCancel} className="bg-red-500 hover:bg-red-600 text-white text-lg py-2 px-4 rounded-2xl">
            Cancel
          </Button>
        </div>
      ) : (
        // <Button onClick={() => setIsEditing(true)} className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white text-lg py-3 rounded-2xl">
        //   Edit Profile
        // </Button>
        <></>
      )}
    </div>
  );
};

export default Profile;
