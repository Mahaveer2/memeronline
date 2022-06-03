import Image from 'next/image'
import { HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import React from 'react'
import SidebarLink from './SidebarLink'
import { signOut, useSession } from 'next-auth/react';

function Sidebar() {
  const {data:session} = useSession();
  return (
    <div className='hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full'>
      <div className='flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24'>
        <Image src='/memer.png' width={40} height={40}/>
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      <button className='hidden xl:inline ml-auto bg-[#f01d5c] rounded-full w-56 h-[52px] text-xl text-white font-bold shadow-md hover:bg-[#b81a2f]'>Meme</button>
      <div onClick={signOut} className='text-[#d9d9d9] flex items-center justify-center
      hoverAnimation mt-auto xl:ml-auto xl:-mr-5'>
        <img src={session.user.image}
        className='rounded-full h-10 w-10 xl:mr-2.5' alt="" />
        <div className='hidden xl:inline leading-5'>
          <h4 className='font-bold'>{session.user.name}</h4>
          <p className='text-[#6e767d]'>{session.user.tag}</p>
        </div>
        <DotsHorizontalIcon className='h-10 hidden xl:inline ml-14' />
      </div>
      
    </div>
  )
}

export default Sidebar