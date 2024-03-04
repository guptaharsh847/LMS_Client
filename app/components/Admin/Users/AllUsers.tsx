"use client";
import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateRoleMutation } from "@/redux/features/user/userApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/styles";
import toast from "react-hot-toast";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open,setOpen]= useState(false);
  const [userID, setuserID] = useState('');
  const [updateRole,{error:updateError,isSuccess}] =useUpdateRoleMutation({});
  const [deleteUser,{error:deleteError,isSuccess:deleteSuccess}] =useDeleteUserMutation({})

  
  const { isLoading,  data, refetch} = useGetAllUsersQuery({},{refetchOnMountOrArgChange : true});

  useEffect(() => {
    if(updateError ){
      if("data" in updateError)
      {
        const errorMEssage = updateError as any
        toast.error(errorMEssage.data.error)
      }}
      if(deleteError){
      if("data" in deleteError)
      {
        const errorMEssage = deleteError as any
        toast.error(errorMEssage.data.error)
      }
      }
    if(deleteSuccess){
      toast.success("User deleted")
    }
    
    if(isSuccess){
      toast.success("Role updated")
    }
  
   
  }, [deleteError, deleteSuccess, isSuccess, updateError])
  

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined", flex: 0.5 },
    {
      field: "",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button
            onClick={
              ()=>{setOpen(!open);
            setuserID(params.row.id)}}
          >
            
            <AiOutlineDelete size={20} className="dark:text-white text-black" />
          </Button>
        );
      },
    },
    {
      field: " ",
      headerName: "Mail",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto: ${params.row.email}`}>
              <Button>
                <AiOutlineMail
                  size={20}
                  className="dark:text-white text-black"
                />
              </Button>
            </a>
          </>
        );
      },
    },
  ];
  const rows: any = [];
  if (isTeam) {
    const newData = data?.users.filter((item: any) => item.role === "admin");
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }
  const handleDelete =  async(e: any) => {
    //delte user by id
    await deleteUser(userID);
    refetch();
    setOpen(false);
   }
  const handleSubmit = async(e: any) => {
   await updateRole({email,role});
   refetch();
   setActive(false);
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          { isTeam && (<div className="w-full flex justify-end">
            <div className={`${styles.button} !w-[230px] text-[18px] font-[400] !h-[30px]`}
            onClick={()=>setActive(!active)}
            >
              Add New Member
            </div>
          </div>)}
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
        active && 
        (
          <Modal
          open={active}
          onClose={()=>setActive(!active)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description" 
          >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px]  bg-white dark:bg-slate-900 rounded-[8px] p-4 shadow">

          <h1 className={`${styles.label} text-[24px] items-center font-[500] justify-center flex`}>Add New Member</h1>
          <div className="mt-4">
          <input type="email" placeholder="Email.." value={email} onChange={(e)=>setEmail(e.target.value)} className={`${styles.input}`}/>
          <select className={`${styles.input} !mt-6`} value={role} onChange={(e)=>setRole(e.target.value)}>
            <option className="dark:text-white text-black dark:bg-slate-900" value="admin">Admin</option>
            <option className="dark:bg-slate-900 dark:text-white text-black" value="user">User</option>
          </select>
          <br />
          <Button className={`${styles.button} bg-[#6ae246] dark:bg-[#6ae246]   !my-6  !h-[40px]`}
          onClick={handleSubmit}
        
          >Add Member</Button>
          <Button className={`${styles.button} bg-[#e44949] dark:bg-[#e44949]  !my-2  !h-[40px]`}
          onClick={()=>setOpen(!open)}
        
          >Cancel</Button>
          </div></Box>
          </Modal>
        )
       }
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

          <h1 className={`${styles.label} `}>Are you sure you want to delete this user?</h1>
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
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
