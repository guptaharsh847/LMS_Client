'use client'
import { styles } from '../../../app/styles/styles';
import { AddCircle } from '@mui/icons-material';
import React, { FC } from 'react'
import toast from 'react-hot-toast';

type Props = {
  benefits: {title:string}[];
  setBenefits: (benefits: {title:string}[]) => void;
  prerequisites: {title:string}[];
    setPrerequisites: (prerequisites: {title:string}[]) => void;
    active: number;
    setActive: (active: number) => void;
    
}

const CourseData:FC<Props> = ({
  benefits,
    setBenefits,
    prerequisites,
    setPrerequisites,
    active,
    setActive
}) => {


  const handleBenefitChange =(index:number, value:any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  }
  const handlePrerequisitesChange =(index:number, value:any) => {
     const updatedPrerequisites = [...prerequisites];
     updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  }
  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  
  }
  const nextButton = () => {
    if(benefits[benefits.length -1]?.title !== "" && 
    prerequisites[prerequisites.length -1]?.title !== "")
   { setActive(active + 1);}
   else{
    toast.error("Please fill all the fields");
   }
  }
    
  const prevButton = () => {
    setActive(active - 1);
  }

  return (
    <div className='w-[80%] m-auto h-[100%] mt-24 block'>
      <div>
        <label className={`${styles.label} text-[20px]`}>
          What are benefits of student in this course?
        </label>
        <br />
        {
          benefits.map((benefit:any, index: number) => (
            <input type="text" 
              key={index}
              name='Benefit'
              required
              value={benefit.title}
              className={`${styles.input} my-2 `}
              placeholder="Write here..."
              onChange={(e: any) => handleBenefitChange(index,e.target.value)}
            />
          ))
        }
        <AddCircle className='mx-[10px] cursor-pointer w-[30px] dark:text-white' 
        onClick={handleAddBenefits}
        />
        <br />
      </div>
      <div>
        <label  className={`${styles.label} text-[20px]`}>
          What are prerequisites of student in this course?
        </label>
        <br />
        {
          prerequisites.map((prerequisites:any, index: number) => (
            <input type="text" 
              key={index}
              value={prerequisites.title}
              className={`${styles.input} my-2 `}
              placeholder="Write here..."
              onChange={(e: any) => handlePrerequisitesChange(index,e.target.value)}
            />
          ))
        }
        <AddCircle className='mx-[10px] cursor-pointer w-[30px] dark:text-white' 
        onClick={handleAddPrerequisites}
        />
      </div>
      <div className="w-full flex items-center justify-between">
            <div
            className="w-full 800px:w-[180px] h-[40px] flex justify-center text-[20px] bg-[#3bb6ac] text-center text-[#fff] rounded mt-8 cursor-pointer"
            onClick={() => prevButton()} >Previous</div>
            <div
            className="w-full 800px:w-[180px] h-[40px] flex justify-center  text-[20px] bg-[#3bb6ac] text-center text-[#fff] rounded mt-8 cursor-pointer"
            onClick={() => nextButton()} >Next</div>
        </div>
    </div>
  )
}

export default CourseData