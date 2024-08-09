import React, { useContext, useState } from "react"
import { createContext } from "react"

interface LayoutType {
  authStatus: string | null,
  setAuthStatus: React.Dispatch<React.SetStateAction<string | null>>
}

const LayoutContext = createContext<LayoutType | null>(null);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [authStatus, setAuthStatus] = useState(localStorage.getItem("token") || null)

  return (
    <LayoutContext.Provider value={{authStatus, setAuthStatus}}>
      {children}
    </LayoutContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(LayoutContext);
}

export default Layout