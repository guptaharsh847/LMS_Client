import { styles } from "@/app/styles/styles";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleCourseSubmit();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedIsCollapsed = [...isCollapsed];
    updatedIsCollapsed[index] = !updatedIsCollapsed[index];
    setIsCollapsed(updatedIsCollapsed);
  };
  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields!!");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        // use the last video section if available else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newItem = {
        title: "",
        description: "",
        videoUrl: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newItem]);
    }
  };
  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields!!");
    } else {
      //add complete new course contnet data

      setActiveSection(activeSection + 1);
      const newItem = {
        title: "",
        description: "",
        videoUrl: "",
        videoSection: `Untitiled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newItem]);
    }
  };
  const nextButton = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 
                        ${showSectionInput ? "mt-10" : "mb-0"}`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex items-center w-full">
                      <input
                        type="text"
                        required
                        className={`text-[20px] ${
                          item.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-min"
                        }
                            font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none
                        }`}
                        placeholder="Enter section title"
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BsPencil className="cursor-pointer  dark:text-white text-black" />
                    </div>
                    <br />
                  </>
                )}
                <div className="flex w-full items-center justify-between my-4">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {index + 1}.{item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}
                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`dark:text-white text-black text-[20px] mr-2 ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      className={`dark:text-white text-black text-[20px] ${
                        isCollapsed[index] ? "rotate-180" : ""
                      }`}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className={`${styles.label}`}>Video Title</label>
                      <input
                        type="text"
                        className={`${styles.input}`}
                        placeholder="Enter video title"
                        value={item.title}
                        required
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label className={`${styles.label}`}>Video Url</label>
                      <input
                        type="text"
                        className={`${styles.input}`}
                        placeholder="Enter video Url"
                        value={item.videoUrl}
                        required
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div className="my-3">
                      <label className={`${styles.label}`}>
                        Video Description
                      </label>
                      <textarea
                        rows={8}
                        cols={30}
                        className={`${styles.input} !h-min py-2`}
                        placeholder="Describe here..."
                        required
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <br />
                    </div>
                    {item?.links.map((link: any, linkIndex: number) => (
                      // eslint-disable-next-line react/jsx-key
                      <div className="mb-3 block">
                        <div className="w-full flex items-center justify-between">
                          <label className={`${styles.label}`}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`dark:text-white text-black text-[20px] mr-2 ${
                              linkIndex !== 0
                                ? "cursor-pointer"
                                : "cursor-no-drop"
                            }`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                        </div>
                        <input
                          type="text"
                          className={`${styles.input}`}
                          placeholder="Sourse Code..(Link Title)"
                          required
                          value={link.title}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].links[linkIndex].title =
                              e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                        <input
                          type="url"
                          className={`${styles.input} mt-6`}
                          placeholder="Sourse Code Url..(Link)"
                          required
                          value={link.url}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].links[linkIndex].url =
                              e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                    ))}
                    <br />
                    {/* add link button  */}
                    <div className="inline-block mb-1">
                      <p
                        className="dark:text-white text-black text-[18px] flex items-center cursor-pointer "
                        onClick={() => {
                          handleAddLink(index);
                        }}
                      >
                        <BsLink45Deg className="mr-2" />
                        Add Link
                      </p>
                    </div>
                  </>
                )}

                {/* add new content  */}
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className="dark:text-white text-black text-[18px] flex items-center cursor-pointer "
                      onClick={(e) => {
                        newContentHandler(item);
                      }}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <br />
        <div
          className="dark:text-white text-black text-[20px] flex items-center cursor-pointer "
          onClick={(e) => {
            addNewSection();
          }}
        >
          <AiOutlinePlusCircle className="mr-2" />
          Add New Section
        </div>
      </form>
      <br />
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] h-[40px] flex justify-center text-[20px] bg-[#3bb6ac] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Previous
        </div>
        <div
          className="w-full 800px:w-[180px] h-[40px] flex justify-center  text-[20px] bg-[#3bb6ac] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => nextButton()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
