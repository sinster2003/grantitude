import { useEffect, useState } from "react";
import { PinContainer } from "./ui/3d-pin";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import axios from "axios";
import Prcards from "./Prcards";

const Repositories = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const getRepos = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/github/repos`, {
                withCredentials: true
            });
            const { repos } = await response.data;
            setRepos(repos);
        }
        catch(error) {
            console.log(error);
        }
    }

    getRepos();
  }, []);

  return (
    <div>
        <div className="p-10">
            <h1 className="text-2xl text-center">Repositories</h1>
        </div>
        <BentoGrid>
            {
                repos.length > 0 && repos.map((repo: any) => {
                    return <PinContainer title={repo.name} href={`/dashboard/${repo.id}`}>
                        <BentoGridItem title={repo.name} description={repo.description}/>
                    </PinContainer>
                })

            }
        </BentoGrid>
        <p className="text-white">pr cards shift to each repo pr after clicking on repo card</p>
        <Prcards/>
    </div>
  )
}

export default Repositories