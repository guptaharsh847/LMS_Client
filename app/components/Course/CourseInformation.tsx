import { styles } from "../../../app/styles/styles";
import React, { FC, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo:any) =>void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
      setDragging(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
      setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      
      }
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-[80%] mx-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label>Course Name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            className={`${styles.input} `}
            id="name"
            placeholder="Mern stack LMS Platform"
          />
        </div>

        <br />

        <div className="mb-5">
          <label htmlFor="" className={`${styles.label}`}>
            Course Description
          </label>
          <textarea
            name=""
            required
            cols={30}
            rows={6}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            className={`${styles.input} !h-min !py-2 `}
            id="description"
            placeholder="Write something amazing"
          ></textarea>
        </div>

        <br />

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Price
            </label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              className={`${styles.input} `}
              id="price"
              placeholder="999"
            />
          </div>

          <div className="w-[50%]">
            <label htmlFor="" className={`${styles.label}`}>
              Estimated Price (optional)
            </label>
            <input
              type="number"
              name=""
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              className={`${styles.input} `}
              id="estimatedPrice"
              placeholder="799"
            />
          </div>
        </div>

        <br />

        <div>
          <label htmlFor="" className={`${styles.label}`}>
            Course Tags
          </label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            className={`${styles.input} `}
            id="tags"
            placeholder="MERN,CSS,LMS"
          />
        </div>

        <br />

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Level
            </label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              className={`${styles.input} `}
              id="level"
              placeholder="Begginer/Intermediate/Expert"
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="" className={`${styles.label} w-[50%]`}>
              Demo URL
            </label>
            <input
              type="text"
              name=""
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              className={`${styles.input} `}
              id="demoUrl"
              placeholder="eerref"
            />
          </div>
        </div>
        <br /><br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            name=""
            id="file"
            className= "hidden"
            onChange={handleFileChange}
          />

          <label
            htmlFor="file"
            className={` w-full min-h-[20vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            } `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
              <img
                src={courseInfo.thumbnail}
                className="max-h-[full] w-[50%] object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and Drop or Click to Browse
              </span>
            )}
          </label>
        </div>

        <br />

        <div className="w-full flex items-center !max-h-max justify-end">
            <input type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#3bb6ac] text-center text-[#fff] rounded mt-8 cursor-pointer"
           
            id="next"
            name="next"
            
            />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
