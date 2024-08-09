import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Prcards from "./Prcards";
import SortButton from "./ui/SortButton";

const Prlist = () => {
  const { owner, name } = useParams();
  const [prs, setPrs] = useState([]);
  const [filteredPrs, setFilteredPrs] = useState(prs);
  
  useEffect(() => {
    const getPrs = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/github/repos/${owner}/${name}`, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("token") as string)
                }
            });
            const result = await response.data;
            setPrs(result.prs);
            setFilteredPrs(result.prs);
        }
        catch(error) {
            console.log(error);
        }
    }

    getPrs();
  }, []);

  console.log(prs);

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
            }} name="Merged"/>
            <SortButton onClick={() => {
                prs?.length > 0 && setFilteredPrs(prs.filter((pr: any) => pr.closed_at !== null));
            }} name="Closed"/> 
            <SortButton onClick={() => {
                prs?.length > 0 && setFilteredPrs(prs.filter((pr: any) => pr.closed_at === null));
            }} name="Open"/>
            <SortButton onClick={() => { setFilteredPrs(prs) }} name="All"/>
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