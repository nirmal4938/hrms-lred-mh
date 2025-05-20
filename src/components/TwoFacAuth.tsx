import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

const TwoFacAuth: React.FC = () => {
  const [verificationMethod, setVerificationMethod] = useState<string>("");
  const navigate = useNavigate();

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVerificationMethod(event.target.value);
  };

  const handleGetOTP = () => {
    if (verificationMethod !== "") {
      console.log("Getting OTP for:", verificationMethod);
      navigate("/verify-otp");
    } else {
      console.log("Please select a verification method.");
    }
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="font-bold text-2xl">Verify with OTP</div>
          <div className="text-gray-400">
            2 Factor Authentication is active, please verify the OTP.
          </div>
        </div>
        <form className="flex flex-col gap-2">
          <label className="flex items-center font-bold">
            <input
              type="radio"
              name="verificationMethod"
              value="email"
              className="mr-2 mt-1"
              checked={verificationMethod === "email"}
              onChange={handleRadioChange}
            />
            Email: s******@grr.la
          </label>
          <label className="flex items-center font-bold">
            <input
              type="radio"
              name="verificationMethod"
              value="phone"
              className="mr-2 mt-1"
              checked={verificationMethod === "phone"}
              onChange={handleRadioChange}
            />
            Phone: 98********
          </label>
          <div className="flex self-end">
            <button
              type="button"
              onClick={handleGetOTP}
              className={`bg-[#0070F4] text-white font-semibold px-4 py-2 rounded ${
                verificationMethod === "" ? " cursor-not-allowed" : ""
              }`}
              disabled={verificationMethod === ""}
            >
              GET OTP
            </button>
          </div>
        </form>
        <div className="flex self-center gap-1 font-bold">
          Back to
          <span
            onClick={handleLoginClick}
            className="text-[#0070F4] cursor-pointer font-bold"
          >
            Login
          </span>
        </div>
      </div>
    </AuthLayout>
  );
};

export default TwoFacAuth;
