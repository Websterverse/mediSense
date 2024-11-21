import React from "react";
import { useLocation } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "@fontsource/poppins"; // For headings
import "@fontsource/roboto"; // For body text

const departmentsArray = [
  {
    name: "Pediatrics",
    imageUrl: "https://images.unsplash.com/photo-1551190822-a9333d879b1f",
  },
  {
    name: "Orthopedics",
    imageUrl: "https://plus.unsplash.com/premium_photo-1726880466207-d85def51628f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3J0aG9wZWRpY3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Cardiology",
    imageUrl: "https://plus.unsplash.com/premium_photo-1682308449346-0d68b4e3f3fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyZGlvbG9neXxlbnwwfHwwfHx8MA%3D%3D",
  },
  // ... other departments
];

const responsive = {
  extraLarge: {
    breakpoint: { max: 3000, min: 1324 },
    items: 3,
    slidesToSlide: 1,
  },
  large: {
    breakpoint: { max: 1324, min: 1005 },
    items: 3,
    slidesToSlide: 1,
  },
  medium: {
    breakpoint: { max: 1005, min: 700 },
    items: 2,
    slidesToSlide: 1,
  },
  small: {
    breakpoint: { max: 700, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const ScreeningSchedule = ({ darkMode }) => {
  return (
    <div
      className={`w-full ${darkMode ? "dark:bg-gray-900 dark:text-white" : "bg-green-50"}`}
    >
      {/* Hero Section */}
      <div
        className={`p-6 md:p-10 ${darkMode ? "bg-gradient-to-r from-gray-700 to-gray-800" : "bg-gradient-to-r from-green-600 to-teal-500"} rounded-lg shadow-lg`}
      >
        <h1 className="text-3xl md:text-5xl font-poppins font-bold text-white text-center leading-tight">
          Welcome to MediSense: Empowering Health Insights
        </h1>
        <div className="mt-6 flex flex-col-reverse md:flex-row items-center gap-8">
          {/* Text Section */}
          <div className="w-full md:w-1/2 text-white space-y-6">
            <h2 className="text-2xl md:text-3xl font-poppins font-semibold">
              AI-Assisted Medical Report Analysis for Better Healthcare Decisions
            </h2>
            <p className="text-base md:text-lg font-roboto">
              Easily upload your medical reports for analysis by our advanced AI-powered system and get insights instantly to make informed healthcare decisions.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="w-full md:w-72 h-12 bg-green-700 text-white font-poppins rounded-md hover:bg-green-800 shadow-lg">
                Upload Reports
              </button>
              <button className="w-full md:w-48 h-12 bg-purple-300 text-white font-poppins rounded-md hover:bg-purple-400 shadow-lg">
                Learn More
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img
              className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              src="https://plus.unsplash.com/premium_photo-1699387204388-120141c76d51?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Healthcare"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-wrap justify-center gap-6 py-12 px-4">
        {[{
          icon: "ri-capsule-fill",
          title: "Specialized Services",
          description: "Expert care across a wide range of specialties.",
        }, {
          icon: "ri-24-hours-fill",
          title: "24/7 Advanced Care",
          description: "Review health reports anytime, anywhere.",
        }, {
          icon: "ri-pulse-fill",
          title: "Instant Results",
          description: "Get health insights without delays.",
        }].map((feature, index) => (
          <div
            key={index}
            className={`w-full md:w-[30%] flex items-center gap-4 p-6 ${darkMode ? "bg-gray-800 text-white" : "bg-green-100"} rounded-lg shadow-lg`}
          >
            <i className={`${feature.icon} text-4xl ${darkMode ? "text-green-500" : "text-green-600"}`}></i>
            <div>
              <h3 className="text-lg md:text-xl font-poppins font-semibold">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base font-roboto">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Departments Carousel */}
      <div className="py-12">
        <h2 className="text-2xl md:text-4xl font-poppins font-semibold text-green-700 text-center mb-6">
          Our Medical Departments
        </h2>
        <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000}>
          {departmentsArray.map((depart, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg p-4 hover:scale-105 transform transition-all duration-300 ${darkMode ? "bg-gray-800" : ""}`}
            >
              <div className="text-lg md:text-xl font-poppins font-semibold text-green-600">
                {depart.name}
              </div>
              <img
                className="w-full h-40 md:h-52 object-cover rounded-lg mt-2 border-4 border-purple-200"
                src={depart.imageUrl}
                alt={depart.name}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Emergency Section */}
      <div className={`flex flex-col md:flex-row items-center justify-between ${darkMode ? "bg-gray-800 text-white" : "bg-green-600 text-white"} py-8 px-6 gap-6`}>
        <div>
          <h1 className="text-3xl md:text-5xl font-poppins font-bold">
            Emergency? We are here for you!
          </h1>
          <p className="text-lg mt-2 font-roboto">
            Get in touch now for immediate assistance.
          </p>
        </div>
        <button className="w-full md:w-48 h-12 md:h-16 bg-yellow-600 text-white rounded-lg font-poppins text-lg md:text-xl shadow-lg hover:bg-yellow-700">
          Call Now
        </button>
      </div>
    </div>
  );
};

export default ScreeningSchedule;
