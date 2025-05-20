import React, { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import SocialLinks from "./SocialLinks";
import Settings from "./Settings";

import ChangePassword from "../../ChangePassword";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [editClicked, setEditClicked] = useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);

  const handleEditClick = () => {
    setEditClicked(true);
    navigate("/edit-profile");
  };

  const handlePasswordClick = () => {
    setIsChangePasswordModalVisible(true);
  };

  const handleClosePasswordModal = () => {
    setIsChangePasswordModalVisible(false);
  };

  return (
    <>
      <div className="flex flex-col gap-5 ">
        <div className="flex justify-between ">
          <div className="text-2xl font-bold">User Profile</div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex bg-blue-500 text-white px-4 py-1 rounded-md"
              onClick={handlePasswordClick}
            >
              Change Password
            </button>
            <button
              type="submit"
              className="flex bg-blue-500 text-white px-4 py-1 rounded-md"
              onClick={handleEditClick}
            >
              Edit
            </button>
          </div>
        </div>
        <div className="flex flex-col border border-r-2 rounded-xl border-gray-300 p-3">
          <div className="flex gap-6">
            <img
              alt="admin"
              className="rounded-md"
              src="https://images.unsplash.com/photo-1668508119269-e8b6169c446a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              height={50}
              width={80}
            />
            <div className="flex flex-col gap-2 w-full">
              <div className="text-2xl font-bold">Admin Admin</div>
              <div className="flex justify-between">
                <div className="flex flex-col ">
                  <div className="text-sm">First Name</div>
                  <div className="font-bold text-sm ">Admin</div>
                </div>
                <div className="flex flex-col ">
                  <div className="text-sm">Last Name</div>
                  <div className="font-bold text-sm">Admin</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-sm">Phone number</div>
                  <div className="font-bold text-sm">+91-1234567890</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-sm">Email</div>
                  <div className="font-bold text-sm">admin@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PersonalInfo />
        <SocialLinks />
        <Settings />
      </div>
      <ChangePassword visible={isChangePasswordModalVisible} onClose={handleClosePasswordModal} />
    </>
  );
};

export default UserProfile;
