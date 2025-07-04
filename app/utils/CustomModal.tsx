import React, { FC } from 'react'
import {Modal,Box} from "@mui/material"; 
type Props={
    open:boolean,
    setOpen: (open:boolean)=>void;
    activeItem:any;
    component:any;
    setRoute?: (route:string)=>void;
    refetch?:any;
}

const CustomModal: FC<Props>=({open,setOpen,setRoute,component:Component,refetch})=> {
  return (
    <Modal
    open={open}
    onClose={()=>setOpen(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
        <Box
        className="relative top-[15%] left-[50%] -translate-x-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px]"
        >
            <Component setOpen={setOpen} setRoute={setRoute} refetch={refetch} />
        </Box>

    </Modal>
  )
}

export default CustomModal