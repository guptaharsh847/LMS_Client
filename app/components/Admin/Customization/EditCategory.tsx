import { useEditLayoutMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import { ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Loader from '../../Loader/Loader';
import { styles } from '@/app/styles/styles';
import { HiMinus } from 'react-icons/hi';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';

type Props = {}

const EditCategory = (props: Props) => {

        const { data, refetch,isLoading } = useGetHeroDataQuery("Categories", {
          refetchOnMountOrArgChange: true,
        });
        const [editLayout, {  isSuccess, error }] = useEditLayoutMutation();
        const [category, setCategory] = useState<any[]>([]);
        useEffect(() => {
            if (data) {
              setCategory(data?.layout?.categories);
            }
            if(isSuccess){
                toast.success("Categories Updated Successfully");
            }
            if(error){if("data" in error){
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }}
                
          }, [data,isSuccess,error]);
          const newFaqHandler = () => {
            setCategory([
              ...category,
              {
                title: "",
              },
            ]);
          };
        
          const handleCategoryChange = (id: string, value: string) => {
            setCategory((prevCategory) =>
              prevCategory.map((q) => (q._id === id ? { ...q, title: value } : q))
            );
          }
          
          const areCategoriesUnchanged = (oldCategories: any[], newCategories: any[]) => {
            return JSON.stringify(oldCategories) === JSON.stringify(newCategories);
          }
          const isAnyCategoryEmpty = (categories: any[]) => {
            return categories.some((q) => q.title === "");
          }
          const handleEdit = async () => {
            if (!areCategoriesUnchanged(data?.layout?.categories, category) && !isAnyCategoryEmpty(category)) {
              await editLayout({
                type: "Categories",
                categories: category,

            })
            refetch();
        }
        }


        
        
  return (
    <div>  <>
    {
     isLoading ? (<Loader/>) : (
         <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
         <div className="mt-8 ">
           <h1 className={`${styles.title} text-5xl underline-offset-4 underline`}>Categories</h1>
             {category.map((q: any) => (
               <div
                 key={q._id}
                 className={`${q._id != category[0]?._id }
   pt-6 r flex `}
               >
                    <input
                       className={`${styles.input} text-2xl text-center border-none`}
                       value={q.title}
                       onChange={(e: any) =>
                         handleCategoryChange(q._id, e.target.value)
                       }
                       placeholder={"Add your Category..."}
                     />
               
                       <AiOutlineDelete
                         className="dark:text-white  text-black text-[20px] cursor-pointer"
                         onClick={() => {
                           setCategory((prevCategory) =>
                             prevCategory.filter((item) => item._id !== q._id)
                           );
                         }}
                       />
                    
                 
               </div>
             ))}
         
   
           <br />
           <br />
   
           <IoMdAddCircleOutline className="dark:text-white w-full flex justify-center text-black" size={30} onClick={newFaqHandler} />
         </div>
   
         <div
           className={`${
             styles.button
           } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
             areCategoriesUnchanged(data?.layout.categories, category) ||
             isAnyCategoryEmpty(category)
               ? "!cursor-not-allowed"
               : "!cursor-pointer !bg-[#42d383]"
           }
   !rounded absolute bottom-12 right-12`}
           onClick={
            areCategoriesUnchanged(data?.layout.faq, category) ||
            isAnyCategoryEmpty(category)
               ? () => null
               : handleEdit
           }
         >
           Save
         </div>
       </div>
     )
    }
    </></div>
  )
}

export default EditCategory