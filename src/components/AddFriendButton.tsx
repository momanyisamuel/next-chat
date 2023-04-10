"use client";

import { FC } from "react";
import Button from "./ui/Button";

interface AddFriendButtonProps {}

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
  return (
    <form className="max-w-sm">
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add friend by email
      </label>
      <div className="flex gap-4 mt-2">
        <input
          type="text"
          className="block w-full border-0 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="example@mail.com"
        />
        <Button>Add</Button>
      </div>
    </form>
  );
};

export default AddFriendButton;