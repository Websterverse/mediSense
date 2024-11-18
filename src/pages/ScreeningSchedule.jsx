import React from "react";
import KanbanBoard from "../components/KanbanBoard";
import { useLocation } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "https://cdn.pixabay.com/photo/2016/11/08/05/29/operation-1807543_1280.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "https://cdn.pixabay.com/photo/2016/11/08/05/29/operation-1807543_1280.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "https://cdn.pixabay.com/photo/2016/11/08/05/29/operation-1807543_1280.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "https://cdn.pixabay.com/photo/2016/11/08/05/29/operation-1807543_1280.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "https://cdn.pixabay.com/photo/2016/11/08/05/29/operation-1807543_1280.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "https://cdn.pixabay.com/photo/2016/11/08/05/29/operation-1807543_1280.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "https://cdn.pixabay.com/photo/2016/11/08/05/29/operation-1807543_1280.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "https://cdn.pixabay.com/photo/2016/11/08/05/29/operation-1807543_1280.jpg",
    },
    {
      name: "ENT",
      imageUrl: "https://cdn.pixabay.com/photo/2016/11/08/05/29/operation-1807543_1280.jpg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };



const ScreeningSchedule = () => {
  const state = useLocation();
  return (
    <div className="w-full text-white  ">
      {/* <KanbanBoard state={state} />; */}
{/* // first phase  */}

<h1 className=" p-10 text-6xl" >"Welcome to MediSense: Empowering Health Insights" </h1>

<div className="w-full flex  m-6  text-white h-full" >
  <div className=" p-2 w-1/2  ">
<h2 className="text-4xl text-white  p-16 " >"AI-Assisted Medical Report Analysis for Better Healthcare Decisions"</h2>
<div className="w-full justify-items-center gap-10    h-32 flex ">
<button className="w-80 h-12 text-xl rounded-md bg-green-500 ">Upload Your Medical Reports</button>
<button className="w-40 h-12 text-xl rounded-md bg-green-500">Learn More</button>
</div>
</div>
<div className="w-1/2 bg-blue-200" >
<img  className="h-90 w-100" src="https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808_1280.jpg" alt="" />
</div>
</div>

{/* ending phase one  */}


{/* starting second phase  */}

<div className="w-full  flex justify-center   h-full mb-20 " >

{/* // feature 1  */}

<div className="w-1/3 h-full flex  gap-8 justify-center  " >
<div  className="w-30 h-full bg-green-100">
<i class="ri-capsule-fill  text-green-500  text-5xl "  ></i>
</div>
<div>
<h3 className="text-2xl" >Specialised Service</h3>
<h5 className="text-xm">Lorem ipum dolor sit </h5>
    </div>
    </div>

{/* feature 2  */}

<div className="w-1/3 h-full flex  gap-8 justify-center  " >
<div  className="w-30 h-full bg-green-100">
<i class=" ri-24-hours-fill  text-green-500  text-5xl "   ></i>
</div>
<div>
<h3 className="text-2xl" >24/7 Advanced Care </h3>
<h5 className="text-xm">Lorem ipum dolor sit </h5>
    </div>
    </div>

{/* feature 3  */}

<div className="w-1/3 h-full flex  gap-8 justify-center  " >
<div  className="w-30 h-full bg-green-100">
<i class="ri-file-chart-line  text-green-500  text-5xl "  ></i>
</div>
<div>
<h3 className="text-2xl" >Get Result Online </h3>
<h5 className="text-xm">Lorem ipum dolor sit </h5>
    </div>
    </div>





</div>



{/* ENDING PHASE SECOND  */}

{/* carousel start  */}

<div className="container departments">
        <h2 className="text-4xl mb-6 " >FACILITY</h2>
        <Carousel 
        className="ml-6"
          responsive={responsive}
          removeArrowOnDeviceType={[
            // "superLargeDesktop",
            // "desktop",
            "tablet",
            "mobile",
          ]}
        >
          {departmentsArray.map((depart, index) => {
            return (
              <div key={index} className="card bg-green-500  ">
                <div className="depart-name text-2xl ml-4  ">{depart.name}</div>
                <img src={depart.imageUrl} alt="Department" />
              </div>
            );
          })}
        </Carousel>
      </div>

{/* carsousel end  */}


{/* {/* why choose us ? starrting  * /} */}


<div className="w-full h-[500px] flex justify-center mt-10  bg-red-300" >

<div className="w-[750px] h-[500px] bg-green-500" >
<h1 className=" p-9  font-semi-bold  text-6xl" >WHY  CHOOSE US ? </h1>

<div className="flex justify-center gap-6  " >

{/* first */}


<div  className=" flex justify-center  p-2 gap-8 w-[280px] h-20 bg-green-900" >
<i class="ri-check-double-line   text-3xl  "></i>

<div>

  <h3 className="text-xl" >Advance Care </h3>
<h5  className="text-xs">Lorem ipum dolor it </h5>
</div>


</div>

{/* second */}



<div  className=" flex justify-center p-2 gap-8 w-[280px] h-20 bg-green-900" >
<i class="ri-check-double-line   text-3xl  "></i>

<div>

  <h3 className="text-xl" >CHAT BOT  </h3>
<h5  className="text-xs">Lorem ipum dolor it </h5>
</div>


</div>

</div>

{/* third */}

<div className="flex justify-center gap-6 pt-8 " >




<div  className=" flex justify-center  p-2 gap-8 w-[280px] h-20 bg-green-900" >
<i class="ri-check-double-line   text-3xl  "></i>

<div>

  <h3 className="text-xl  " >Medical & Surgical </h3>
<h5  className="text-xs">Lorem ipum dolor it </h5>
</div>


</div>

{/* fourth */}



<div  className=" flex justify-center p-2 gap-8 w-[280px] h-20 bg-green-900" >
<i class="ri-check-double-line   text-3xl  "></i>

<div>

  <h3 className="text-xl" >Lab Test's  </h3>
<h5  className="text-xs">Lorem ipum dolor it </h5>
</div>


</div>

</div>



<button className=" ml-10  mt-14 w-[140px]  h-[50px] rounded-lg bg-green-900" > Read More</button>






</div>


<div className=" p-8  w-[510px]   bg-violet-400" >
  
<h1 className="   text-6xl" >Emergency ?  </h1>
<h1 className=" mb-2   text-6xl" >Contact Us   </h1>

<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt ullam delectus qui magni odio incidunt sit tempora, sed modi nisi.</p>


{/* call section */}
 <div className="mt-4 flex  justify-start gap-4 " >
  <div className="  w-[50px] h-[50px] flex items-center justify-center bg-green-400">
  <i class="ri-phone-fill text-3xl  "></i>
  </div>

<div>  
<h2>Call Us Now </h2>

<h1 className="font-bold"  > +123 4567 89 </h1>
</div>

  </div> 
  

{/* mail section  */}

<div className="mt-4 flex  justify-start gap-4 " >
  <div className="  w-[50px] h-[50px] flex items-center justify-center bg-green-400">
  <i class="ri-mail-fill text-3xl "></i>
  </div>

<div>  
<h2>Mail Us</h2>

<h1 className="font-bold"  > medisense@example.com </h1>
</div>

  </div> 



  
   </div>




</div>

{/* why choose us ? end */}


{/* about page  */}

<div  className="w-full p-8   h-[1100px]   ">


<h1 className="text-6xl mt-4 mb-4 " >"About MediSense : Revolutionizing Healthcare with AI"</h1>

<div className="w-full h-[500px] flex  bg-blue-700 " >

<div className="w-full p-10 h-[500px] bg-red-500">

<h1 className="text-2xl p-2  " >"MediSense is a cutting-edge AI-powered platform designed to bridge the gap between complex medical reports and patient understanding. By leveraging advanced data analysis and machine learning, MediSense empowers individuals with actionable insights, simplifying healthcare decisions and fostering better communication with medical professionals."</h1>



</div>

<div className=" h-[500px]  w-full   bg-green-400 " > 

<div className="bg-pink-500 p-10 border-b-4 " >
<h1 className="p-2 text-4xl " >Our Mission: </h1>
<h2 className="p-4  text-xl" >To make healthcare data more accessible and understandable, enabling individuals to take proactive steps toward their well-being.</h2>
</div>

<div className="p-6 " >
<h1 className=" p-2  text-4xl " >The Problem:</h1>
<h2 className="p-4  text-xl">"Understanding medical reports can be daunting for most individuals. Complex terminology, lack of personalized advice, and the challenge of interpreting critical information often leave patients confused and overwhelmed."</h2>

</div>
</div>




</div>

<div className="w-full p-10 h-[400px] bg-orange-500 " >

<div className="border-l-0  border-b-4" >
<h1 className="text-5xl p-2  " >Our Vision:</h1>
<h3 className="text-2xl p-4 " >"To create a world where healthcare is not only accessible but also comprehensible, ensuring everyone has the tools to lead healthier lives."</h3>

</div>
<h1 className="text-5xl p-2  " >Call-to-Action:</h1>
<h3 className="text-2xl p-4 " >"Take the first step toward understanding your health. Try MediSense today and experience the difference."</h3>


</div>



</div>



{/* //   */}


{/* footer */}
{/* start */}

<div  className="w-full h-[100px] bg-lime-400 ">
<h1 className="text-6xl  p-4 " >FOOTER SECTION </h1>

</div>





{/* end footer */}




    </div>
  );
};



export default ScreeningSchedule;
