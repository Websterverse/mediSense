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
      {/*<div className="py-12">
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
      </div>*/}

{/*Testimonials Section*/}
<div className={`py-12 px-6 ${darkMode ? "bg-gray-800 text-white" : "bg-green-100 text-gray-800"}`}>
  <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-center mb-6">
    What Our Users Say
  </h2>
  <div className="flex flex-wrap justify-center gap-6">
    {[
      {
        quote: "MediSense helped me understand my reports instantly. Highly recommended!",
        name: "John Doe",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      {
        quote: "The AI insights were so accurate and easy to comprehend!",
        name: "Jane Smith",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      {
        quote: "The platform's ease of use and detailed insights truly make it a lifesaver. I trust MediSense with all my health reports!",
        name: "Aditi Sharma",
        image: "https://randomuser.me/api/portraits/women/45.jpg",
      },
    ].map((testimonial, index) => (
      <div
        key={index}
        className={`w-full md:w-[30%] p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-700" : "bg-white"}`}
      >
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full mx-auto mb-4"
        />
        <p className="text-sm md:text-base italic text-center">
          "{testimonial.quote}"
        </p>
        <p className="mt-4 text-center text-sm md:text-base font-poppins font-semibold">
          - {testimonial.name}
        </p>
      </div>
    ))}
  </div>
</div>

{/*FAQs*/}
<div className={`py-12 px-6 ${darkMode ? "bg-gray-700 text-white" : "bg-green-50 text-gray-800"}`}>
  <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-center mb-6">
    Frequently Asked Questions
  </h2>
  <div className="space-y-4">
    {[{
      question: "How does MediSense work?",
      answer: "You can upload your medical reports, and our AI will analyze them to provide insights.",
    }, {
      question: "Is MediSense secure for uploading reports?",
      answer: "Yes, MediSense uses advanced encryption to ensure your medical data is private and secure.",
    }, {
      question: "Can I get instant results?",
      answer: "Yes, MediSense provides AI-driven insights within minutes after you upload your reports.",
    }].map((faq, index) => (
      <div key={index} className={`p-4 rounded-md shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h4 className="text-lg font-semibold">{faq.question}</h4>
        <p className="text-sm mt-2">{faq.answer}</p>
      </div>
    ))}
  </div>
</div>


{/*About Developers*/}
<div className={`py-12 px-6 ${darkMode ? "bg-gray-800 text-white" : "bg-green-50 text-gray-800"}`}>
  <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-center mb-6">
    Meet the Developers
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      {
        name: "Kartik Kumar",
        role: "Full-Stack Developer",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
      
      },
      {
        name: "Amritpreet Kaur",
        role: "Frontend Developer",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      {
        name: "Jai Kumar",
        role: "Backend Developer",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
      },
      {
        name: "Khushboo Siddiqui",
        role: "Frontend Developer",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      
    ].map((developer, index) => (
      <div
        key={index}
        className={`p-6 rounded-lg shadow-lg flex flex-col items-center ${
          darkMode ? "bg-gray-700" : "bg-white"
        }`}
      >
        <img
          className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg border-4 border-green-500"
          src={developer.image}
          alt={developer.name}
        />
        <h3 className="text-lg font-semibold font-poppins">{developer.name}</h3>
        <p className="text-sm font-roboto text-gray-500 dark:text-gray-400">{developer.role}</p>
      </div>
    ))}
  </div>
</div>


      {/* Emergency Section */}
{/* Emergency Section */}
{/* Emergency Section */}
<div className={`flex flex-col md:flex-row items-center justify-between ${darkMode ? "bg-gray-900 text-white" : "bg-green-500 text-white"} py-12 px-10 gap-10 rounded-lg shadow-lg`}>
  {/* Left Content */}
  <div className="text-center md:text-left">
    <h1 className="text-4xl md:text-5xl font-semibold tracking-wide font-poppins">
      Emergency? <span className="text-purple-300">We’re Here for You!</span>
    </h1>
    <p className="text-lg md:text-xl font-light mt-4 font-roboto">
      Don't wait—get in touch now for immediate assistance and support.
    </p>
  </div>

  {/* Call to Action Button */}
  <div className="flex justify-center md:justify-end w-full md:w-auto">
    <button className="px-8 py-4 bg-purple-300 text-white font-medium rounded-lg shadow-xl text-lg tracking-wide uppercase hover:bg-purple-400 transition-transform transform hover:scale-105">
      Call Now
    </button>
  </div>
</div>
</div>
  );
};

export default ScreeningSchedule;
