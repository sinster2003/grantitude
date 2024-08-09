import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Prcards from "./Prcards";

const Prlist = () => {
  const { owner, name } = useParams();
  const [prs, setPrs] = useState([]);
  
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
        }
        catch(error) {
            console.log(error);
        }
    }

    getPrs();
  }, []);

  console.log(prs);

  return (
    <div className="flex flex-wrap gap-20 justify-center">
        {prs?.length > 0 && prs?.map((pr: any) => <div key={pr.id}>
            <Prcards username={pr.user.login} bio={pr.author_association.toLowerCase()
} userImg={pr.user.avatar_url} prUrl={pr.html_url} number={pr.number}/>
        </div>)}
    </div>
  )
}

export default Prlist