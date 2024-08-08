import { useState } from "react"
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar"
import { Folders, SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";

const links = [
  {
    label: "Repositories",
    href: "/dashboard/",
    icon: <div><Folders/></div>
  }
]

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen w-full text-white bg-neutral-800">
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
      <div className="h-screen bg-primary w-full rounded-tl-[3rem]">
        {children}
      </div>
    </div>
  )
}

export default Dashboard