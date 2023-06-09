"use client"

import { User } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";

interface FriendRequestsSidebarOptionProps {
    sessionId: string | null | undefined
    initialCount: number
}

const FriendRequestsSidebarOption: FC<
  FriendRequestsSidebarOptionProps
> = ({sessionId,initialCount}) => {
    const [unseenRequestCount, setUnseenRequestCount] = useState<number>(initialCount);
  return (
    <Link
      href="/dashboard/requests"
      className="flex items-center p-2 text-sm leading-6 text-gray-700 rounded-md hover:text-indigo-500 hover:bg-gray-50 gap-x-3 group"
    >
      <div className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
        <User className="w-4 h-4" />
      </div>
      <p className="truncate">Friend requests</p>
      {unseenRequestCount > 0 ? (
        <div className='flex items-center justify-center w-5 h-5 text-xs text-white bg-indigo-600 rounded-full'>
          {unseenRequestCount}
        </div>
      ) : null}
    </Link>
  );
};

export default FriendRequestsSidebarOption;
