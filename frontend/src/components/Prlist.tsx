import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Prcards from "./Prcards";
import SortButton from "./ui/SortButton";
import toast from "react-hot-toast";

const Prlist = () => {
  const { owner, name } = useParams();
  const [prs, setPrs] = useState([]);
  const [filteredPrs, setFilteredPrs] = useState(prs);
  const [buttonStatus, setButtonStatus] = useState("All");
  const [length, setLength] = useState(null);
  
  useEffect(() => {
    toast.error("Ensure the contributor has his/her wallet public address in their github bio.", {
        duration: 3000
    });

    const getPrs = async () => {
        try {
            const response = await axios.get(`https://grantitude-backend.onrender.com/api/github/repos/${owner}/${name}`, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("token") as string)
                }
            });
            const result = await response.data;
            setPrs(result.prs);
            setFilteredPrs(result.prs);
            setLength(result.prs.length);
        }
        catch(error) {
            toast.error("Something went wrong")
            console.log(error);
        }
    }

    getPrs();
  }, []);

  if(length !== null && length === 0) {
    return <div className="flex w-full h-screen justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-5">
            <img src="/404.svg" alt="No pull requests found" width="400px"/>
            <p className="text-lg">No pull requests found on {name}</p>
        </div>
    </div>
  }

  if(!prs || prs?.length <= 0) {
    return <div className="flex w-full h-screen justify-center items-center">
        <img src="/loader.gif" alt="loading"/>
    </div>
  }

  return (
    <div>
        <div className="pt-[60px] px-10 pb-10">
            <h1 className="text-2xl text-center">Pull Requests from {name}</h1>
        </div>
        
        <div className="flex gap-5 justify-center pb-10">
            <SortButton onClick={() => {
                prs?.length > 0 && setFilteredPrs(prs.filter((pr: any) => pr.merged_at !== null));
                setButtonStatus("Merged");
            }} name="Merged" buttonStatus={buttonStatus} />

            <SortButton onClick={() => {
                prs?.length > 0 && setFilteredPrs(prs.filter((pr: any) => pr.closed_at !== null));
                setButtonStatus("Closed");
            }} name="Closed" buttonStatus={buttonStatus} />

            <SortButton onClick={() => {
                prs?.length > 0 && setFilteredPrs(prs.filter((pr: any) => pr.closed_at === null));
                setButtonStatus("Open");    
            }} name="Open" buttonStatus={buttonStatus} />
            
            <SortButton onClick={() => { 
                setFilteredPrs(prs);
                setButtonStatus("All");    
            }} name="All" buttonStatus={buttonStatus} />
        </div>
        
        <div className="flex flex-wrap gap-20 justify-center">
            {filteredPrs?.length > 0 && filteredPrs?.map((pr: any) => <div key={pr.id}>
                <Prcards username={pr.user.login} bio={pr.author_association.toLowerCase()}
                userImg={pr.user.avatar_url} prUrl={pr.html_url} number={pr.number}/>
            </div>)}
        </div>
    </div>
  )
}

export default Prlist