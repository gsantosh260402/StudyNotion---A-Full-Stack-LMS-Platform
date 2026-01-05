import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import StatsComponent from "../components/core/AboutPage/StatsComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
const About = () => {
  return (
    <div className="text-white">
      {/* section 1 */}

      <section className="bg-richblack-700 py-4 px-4">
        <div className="mt-[80px] relative  w-11/12 max-w-maxContent mx-auto">
          <header className="text-center w-[60%] mx-auto mb-[200px] text-3xl font-semibold">
            Driving Innovation in Online Education for a<br></br>
            <HighlightText text={"Brighter Future"} />
            <p className="text-sm text-richblack-200 mt-3">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="absolute w-[200px] h-[200px] mx-auto -translate-y-[70%] -translate-x-[50%] left-[50%] filter blur-[30px] bg-brown-100 "></div>
          <div className="flex gap-x-5  absolute -translate-y-[55%] -translate-x-[50%] left-[54%] w-11/12 mx-auto">
            <img src={BannerImage1} width={300} />
            <img src={BannerImage2} width={300} />
            <img src={BannerImage3} width={300} />
          </div>
        </div>
      </section>

      {/* section2 */}

      <section className="mt-[150px] mx-auto">
        <div>
          <Quote />
        </div>
      </section>

      {/* section-3 */}

      <section className="">
        <div className="w-11/12 max-w-maxContent mt-[50px] mx-auto flex flex-col gap-x-10">
          <div className="flex w-[100%] gap-x-6  items-center justify-around px-4">
            <div className="flex flex-col gap-y-4 w-[40%] ">
              <h1
                style={{
                  background:
                    "linear-gradient(117.95deg, #833AB4 -5%, #FD1D1D 5%, #FCB045 80%)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
                className="text-3xl mb-[20px] font-semibold"
              >
                Our Founding Story
              </h1>
              <p className="text-sm text-richblack-400">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-sm text-richblack-400">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            <div className="w-[40%] relative">
              <div className="w-[120px] h-[50px] rounded-r-full filter blur-[70px] absolute z-10 left-3 top-2"
                             style={{background: "linear-gradient(118.47deg, #EC008C -0.91%, #FC6767 104.91%)"}}>
              </div>
              <img src={FoundingStory} className="w-[470px] relative z-10 p-4" />
            </div>
          </div>
          <div className="w-[100%] flex gap-x-6 justify-around items-center px-4 mt-[50px]">
             <div className="w-[40%] flex flex-col gap-y-5 ">
                <h1 className="text-3xl font-semibold text-brown-100 ">Our Vision</h1>
                <p className="text-sm text-richblack-400">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
             </div>
             <div className="w-[40%] pl-4 flex flex-col gap-y-5">
                <h1 className="text-3xl font-semibold text-blue-100">Our Mission</h1>
                <p className="text-sm text-richblack-400">our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
             </div>
          </div>
        </div>
      </section>

      {/* section-4 */}

      <StatsComponent/>


      {/* section-5 */}

      <section className=" w-11/12 max-w-maxContent mx-auto mt-[50px] flex flex-col gap-6">
          <LearningGrid/>
          <ContactFormSection/>
      </section>
    </div>
  );
};

export default About;
