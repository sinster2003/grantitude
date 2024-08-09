import { useEffect, useState } from "react"
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar"
import { Folders, SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import { useAuth } from "./Layout";
import { useNavigate } from "react-router-dom";

const links = [
  {
    label: "Repositories",
    href: "/dashboard/",
    icon: <div><Folders/></div>
  }
]

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState(null);
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const auth = useAuth();
  const navigation = useNavigate();
  console.log(auth);

  useEffect(() => {
    if(!code && !auth?.authStatus) {
      navigation("/");
    }
    
    const postCode = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/github/auth/callback",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ code }),
          }
        );

        const result = await response.json();
        setAuthStatus(result?.message?.split(" ")[1]);
        localStorage.setItem("token", JSON.stringify(result.token));
        auth?.setAuthStatus(result.token);
      } 
      catch (error) {
        console.log(error);
      }
    };

    if (code) {
      postCode();
    }
  }, []);

  if(code && authStatus === null) {
    return <p>Loading...</p>
  }

  if(code && authStatus === "Failure") {
    return <p>Auth Failed</p>
  }

  if((code && authStatus === "Successful") || (!code && auth?.authStatus)) {
    return (
      <div className="flex min-h-screen w-full text-white bg-neutral-800">
        <Sidebar open={open} setOpen={setOpen} animate={true}>
          <SidebarBody>
            <div className="py-4">
              {open ? <SidebarCloseIcon/> : <SidebarOpenIcon/> }
            </div>
            <div className="flex flex-col gap-2 py-4">
              {links.map((link, index) => <SidebarLink key={index} link={link} className="gap-4"/>)}
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="bg-primary w-full rounded-tl-[3rem]">
          {children}
        </div>
      </div>
    )
  }
}

export default Dashboard