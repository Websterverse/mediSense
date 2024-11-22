import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconHeartHandshake } from "@tabler/icons-react";
import { navlinks } from "../constants";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`h-[48px] w-[48px] rounded-[10px]   ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex items-center justify-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt={name} className="h-6 w-6" />
    ) : (
      <img
        src={imgUrl}
        alt={name}
        className={`h-6 w-6 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="sticky top-5 flex h-[93vh] flex-col items-center justify-between w-20   shadow-lg">
      {/* Logo */}
      <Link to="/">
        <div className="rounded-[10px]   p-2">
          <IconHeartHandshake size={40} color="#1ec070" />
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="mt-12 flex w-[76px] flex-1 flex-col items-center justify-between rounded-[20px] bg-[#1c1c24] py-4">
        <div className="flex flex-col items-center justify-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        {/* Dark/Light Mode Toggle Button */}
        <button
          className="mb-4 flex items-center justify-center h-10 w-10 bg-transparent rounded-lg hover:opacity-80 text-xl"
          onClick={toggleDarkMode}
        >
          {darkMode ? "🌞" : "🌜"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
