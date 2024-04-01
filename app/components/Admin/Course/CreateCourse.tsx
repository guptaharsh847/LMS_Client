"use client";
import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "../../../../redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
type Props = {};

const CreateCourse = (props: Props) => {
  const [CreateCourse,{isLoading,isSuccess,error}] = useCreateCourseMutation();
  useEffect(() => {
    if (isSuccess) {
     toast.success("Course created successfully");
     redirect("/admin/courses");
    } 
     if (error){if ("data" in error) {
      const errorMessage =error as any;
      toast.error("Error creating course:", errorMessage.data.message);
    }}
  }
, [isLoading,isSuccess,error])
  
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    categories:"",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      title: "",
      description: "",
      videoUrl: "",
      videoLength:"",
      videoSection: "Untitled Section",
      suggestion: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
    },
  ]);
  const [courseData, setCourseData] = useState({});
  const handleSubmit = async () => {
    // format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    // format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    // format courseContentData array
    const formattedCourseContentData = courseContentData.map((content) => ({
      title: content.title,
      description: content.description,
      videoUrl: content.videoUrl,
      videoSection: content.videoSection,
      videoLength: content.videoLength,
      suggestion: content.suggestion,
      links: content.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
    }));
    //prepare data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      categories: courseInfo.categories,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
      totalVideos: courseContentData.length,
    };
    setCourseData(data);
  };
  const handleCourseCreate = async (e: any) => {
    const data =courseData;
    if(!isLoading){
     
    await CreateCourse(data);}

  };
  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active == 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active == 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active == 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}

        {active == 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            isEdit={false}
            handleCourseCreate={handleCourseCreate} />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-[18] right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
