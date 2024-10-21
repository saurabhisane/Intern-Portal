import React, { useEffect, useState } from "react";
import profileImage from '../assets/profile.png';
import background_img from '../assets/bg_img2.jpg';
import SideBar from "../components/SideBar";
import { useSelector, useDispatch } from "react-redux";
import UserName from "../components/UserName";
import { updateUser } from "../redux/actions/authAction";

const animateSkillBars = () => {
  const bars = document.querySelectorAll(".skill-bar-fill");
  bars.forEach((bar) => {
    const value = bar.getAttribute("data-value");
    bar.style.width = value;
  });
};

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [editMode, setEditMode] = useState(false);
  const [editQualMode, seteditQualMode] = useState(false);


  const [editedUser, setEditedUser] = useState({
    username: user?.username || "",
    email: user?.email || "",
    fullname: user?.fullname || "",
  });

  const [editedQuali, setEditedQuali] = useState({
    degree: user?.username || "",
    startYear: user?.email || "",
    endYear: user?.fullname || "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (user) {
      setEditedUser({
        username: user.username,
        email: user.email,
        fullname: user.fullname,
      });
    }
    animateSkillBars();
  }, [user]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken"); // Ensure the token is stored and accessible
      dispatch(
        updateUser(editedUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      setSuccessMessage("Profile updated successfully!");
      setError(null);
    } catch (error) {
      setError(error.message); // Capture error message from server response
    }
    setEditMode(false); // Close the edit mode
  };

  const handleQualEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken"); // Ensure the token is stored and accessible
      dispatch(
        updateUser(editedUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      setSuccessMessage("Profile updated successfully!");
      setError(null);
    } catch (error) {
      setError(error.message); // Capture error message from server response
    }
    setEditMode(false); // Close the edit mode
  };


  return (
    <div className="text-black h-screen flex flex-col bg-gray-50">
      <div className="flex flex-1">
        <div className="w-[20vw] border-r border-gray-200">
          <SideBar />
        </div>
        <div className="w-[80vw] mx-auto py-8 px-4">
          <div
            className="relative h-48 bg-cover bg-center rounded-lg shadow-lg mb-12"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${background_img})`,
            }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <img
                src={user?.profileImage || profileImage}
                alt="Profile"
                className="w-36 h-36 rounded-full"
              />
            </div>
          </div>

          <div className="bg-white p-8 shadow-lg rounded-lg mb-12 border border-gray-200">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 animate-fade-in">
                {user.username}
              </h2>
            </div>
          </div>

          <div className="bg-white p-8 shadow-md rounded-lg mb-12 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-gray-700">Personal Information</h4>
              <button
                className="text-blue-500 hover:underline text-sm"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
            </div>

            {editMode && (
              <form onSubmit={handleEditSubmit} className="mb-4">
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="fullname"
                    value={editedUser.fullname}
                    onChange={handleEditChange}
                    className="border border-gray-300 p-2 mb-2"
                    placeholder="Full Name"
                  />
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleEditChange}
                    className="border border-gray-300 p-2 mb-2"
                    placeholder="Username"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleEditChange}
                    className="border border-gray-300 p-2 mb-2"
                    placeholder="Email Address"
                  />
                  <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Save
                  </button>
                  <button
                    type="button"
                    className="text-red-500 hover:underline p-2"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            {!editMode && (
              <div className="grid grid-cols-2 gap-6 text-gray-600">
                <UserName user={user} />
                <div>
                  <p className="font-semibold">Username</p>
                  <p>{user.username}</p>
                </div>
                <div>
                  <p className="font-semibold">Email Address</p>
                  <p>{user.email}</p>
                </div>
              </div>
            )}
          </div>

          
          <div className="bg-white p-8 shadow-md rounded-lg mb-12 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-gray-700">Qualification</h4>
              <button onClick={()=>seteditQualMode(true)} className="text-blue-500 hover:underline text-sm">Edit</button>
            </div>

            <div className="grid grid-cols-2 gap-6 text-gray-600">
              {user.qualifications.map((qualification, index) => (
                <div key={index}>
                  <p className="font-semibold">{qualification}</p>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                    <div className="skill-bar-fill bg-blue-500 h-4 rounded-full" data-value="90%"></div>
                  </div>
                </div>
              ))}

              
            </div>

            {editQualMode && (
            <form onSubmit={handleQualEditSubmit} className="mb-4">
              <div className="flex flex-col">
                <input
                  type="text"
                  name="fullname"
                  value={editedUser.fullname}
                  onChange={handleQualEditSubmit}
                  className="border border-gray-300 p-2 mb-2"
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  name="username"
                  value={editedUser.username}
                  onChange={handleQualEditSubmit}
                  className="border border-gray-300 p-2 mb-2"
                  placeholder="Username"
                />
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleQualEditSubmit}
                  className="border border-gray-300 p-2 mb-2"
                  placeholder="Email Address"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                  Save
                </button>
                <button
                  type="button"
                  className="text-red-500 hover:underline p-2"
                  onClick={() => seteditQualMode(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}


          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
