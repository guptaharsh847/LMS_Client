'use client'
import React, { FC, useState} from 'react'
import SideBarProfile from './SideBarProfile'

import { useLogOutQuery } from '../../../redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';



type Props = {
    user:any;
}

const Profile: FC<Props> = ({user}) => {

const [scroll, setScroll] = useState(false);
const [active, setActive] = useState(0); //edit to 1
const [avatar, setAvatar] = useState(null);
const [logout, setLogout] = useState(false);

const {} =useLogOutQuery(undefined,{
    skip: logout ? true: false,
});
const logoutHandler = async() => {
    setLogout(true);
    await signOut();
    
}


if (typeof window !== "undefined") {
window.addEventListener("scroll", () => {
if (window.scrollY > 85){
setScroll(true);
} else {
setScroll(false);
}

});
}
return (

<div className="w-[85%]  flex mx-auto">

<div

className={`w-[60px] z-10 800px:w-[310px] h-[384px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] border-[#00000085] rounded-[5px] dark:shadow-sm shadow-xl mt-[80px] mb-[80px]  sticky ${scroll ? "top-[120px]": "top-[30px]"} left-[30px]`}
>
    <SideBarProfile 
    user={user}
    active ={active}
    setActive={setActive}
    avatar={avatar}
    logoutHandler={logoutHandler}
    
    />
    </div>
    {
        active === 1 && (
        <ProfileInfo avatar={avatar} user={user}/>
        )
        
    }
    {
        active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
            <ChangePassword />
            </div>
        )

    }
    {
        active === 3 && (
        <ProfileInfo avatar={avatar} user={user}/>
        )

    }


</div>

)
}
export default Profile