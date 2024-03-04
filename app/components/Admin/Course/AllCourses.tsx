"use client";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useTheme } from "next-themes";
import { useDeleteCourseMutation, useGetAllCoursesAdminQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import {format} from 'timeago.js';
import toast from "react-hot-toast";
import { styles } from "@/app/styles/styles";
import Link from "next/link";

type Props = {};

const AllCourses = (props: Props) => {
   
    
  const { theme, setTheme } = useTheme();
  const [open,setOpen]= useState(false);
  const [courseID, setcourseID] = useState('');
  
    const {isLoading,data,refetch}= useGetAllCoursesAdminQuery({},{refetchOnMountOrArgChange : true});
    const [deleteCourse,{error:deleteError,isSuccess:deleteSuccess}] =useDeleteCourseMutation({})
    useEffect(() => {
      
        if(deleteError){
        if("data" in deleteError)
        {
          const errorMessage = deleteError as any
          toast.error(errorMessage.data.error)
        }
        }
      if(deleteSuccess){
        toast.success("Course deleted")
      }     
    }, [deleteError, deleteSuccess])
    
  
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.4 },
    { field: "purchased", headerName: "Purchased", flex: 0.4 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
        field: "  ",
        headerName: "Edit",
        flex: 0.2,
        renderCell: (params: any) => {
          return (
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <AiOutlineEdit size={20} className="dark:text-white text-black" />
            </Link>
          );
        },
      },
    {
      field: "",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button  onClick={
            ()=>{setOpen(!open);
          setcourseID(params.row.id)}}
        >
            <AiOutlineDelete size={20} className="dark:text-white text-black" />
          </Button>
        );
      },
    },
  ];
  const rows:any =[];
  {
    data && data.courses.forEach((item:any)=>{
        rows.push({
            id: item._id,
            title: item.name,
            ratings: item.ratings,
            purchased: item.purchased,
            created_at: format(item.createdAt),
        });
    });
  }
  const handleDelete =  async(e: any) => {
    //delte user by id
    await deleteCourse(courseID);
    refetch();
    setOpen(false);
   }

  return (
    <div className="mt-[120px]">
      { isLoading ? (
        <Loader/>) : (
        <Box m="20px">
        <Box
          m="40px 0 0 0"
          height="80vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",

              outline: "none",
            },

            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-sortIcon": {
              color: theme === "dark" ? "#fff" : "#000",
            },

            "& .MuiDataGrid-row": {
              color: theme === "dark" ? "#fff" : "#000",

              borderBottom:
                theme === "dark"
                  ? "1px solid #ffffff30 !important"
                  : "1px solid #ccc !important",
            },

            "& .MuiTablePagination-root": {
              color: theme === "dark" ? "#fff" : "#000",
            },

            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },

            "& .name-column--cell": {},

            color: theme == "dark" ? "#fff" : "#000",

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              borderBottom: "none",
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-VirtualScroller": {
              backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              color: theme === "dark" ? "#fff" : "#000",
              borderTop: "none",
            },
            "& .MuiCheckbox-root": {
              color:
                theme === "dark" ? `#b7ebde !important` : `#000 !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: ` #fff !important`,
            },
          }}
        >
          <DataGrid rows={rows} columns={columns} checkboxSelection />
        </Box>
        {
        open && 
        (
          <Modal
          open={open}
          onClose={()=>setOpen(!open)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description" 
          >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px]  bg-white dark:bg-slate-900 rounded-[8px] p-4 shadow">

          <h1 className={`${styles.label} `}>Are you sure you want to delete this course?</h1>
          <div className="mt-4">
         
          
          <Button className={`${styles.button} bg-[#6ae246] dark:bg-[#6ae246] rounded-[10px] !my-2  !h-[40px]`}
          onClick={handleDelete}
        
          >Confirm</Button>
          <Button className={`${styles.button} bg-[#e44949] dark:bg-[#e44949]  !my-2  !h-[40px]`}
          onClick={()=>setOpen(!open)}
        
          >Cancel</Button>
          </div></Box>
          </Modal>
        )
       }
      </Box>)}
    </div>
  );
};

export default AllCourses;
