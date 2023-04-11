import { Icon, Icons } from "@/components/Icons";
import SignOutButton from "@/components/SignOutButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

interface SidebarOption {
  id: number;
  name: string;
  href: string;
  Icon: Icon;
}

const sidebarOptions: SidebarOption[] = [
  { id: 1, name: "Add Friends", href: "/dashboard/add", Icon: "UserPlus" },
];

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (session) notFound;
  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col h-full max-w-xs px-6 overflow-y-auto bg-white border-r border-gray-300 grow gap-y-5">
        <Link href="/dashboard" className="flex items-center h-16 shrink-0">
          <Icons.Logo className="w-auto h-8 text-indigo-600" />
        </Link>
        <div className="text-xs font-semibold leading-6 text-gray-400">
          Your chats
        </div>
        <nav className="flex flex-col flex-1">
          <ul role="list" className="flex flex-col flex-1 gap-y-7">
            <li>Chats user has</li>
            <div className="text-xs font-semibold leading-6 text-gray-400">
              Overview
            </div>
            <li>
              <ul role="list" className="mt-2 -mx-2 space-y-1">
                {sidebarOptions.map((option) => {
                  const Icon = Icons[option.Icon];
                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className="flex gap-3 p-2 text-sm font-semibold leading-6 text-gray-700 rounded-md hover:text-indigo-600 hover:bg-gray-50 group"
                      >
                        <span className="flex items-center justify-center w-6 h-6 text-gray-400 border border-gray-200 rounded-lg group-hover:border-indigo-600 group-hover:text-indigo-600 shrink-0 text-[0.625rem] font-medium bg-white">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="truncate">{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="flex items-center mt-auto -mx-6">
              <div className="flex items-center flex-1 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 gap-x-4">
                <div className="relative w-8 h-8 bg-gray-50">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session?.user.image || ""}
                    alt="Your profile picture"
                  /> 
                </div>
                <span className="sr-only">Your Profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{session?.user.name}</span>
                  <span className="text-xs text-zinc-400" aria-hidden="true">{session?.user.email}</span>
                </div>
              </div>
              
              <SignOutButton className="h-full aspect-square" />
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;
