"use client";

import { MyUserContextProvider } from "@/hooks/useUser";
import React, { ReactNode } from "react";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
