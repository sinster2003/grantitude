import { useState } from "react"
import { Sidebar, SidebarBody } from "./ui/sidebar"
import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="">
          {open ? <SidebarCloseIcon color="white"/> : <SidebarOpenIcon color="white"/> }
          <div className="flex flex-col gap-2">
          </div>
        </SidebarBody>
      </Sidebar>
      <div>

      </div>
    </div>
  )
}

export default Dashboard