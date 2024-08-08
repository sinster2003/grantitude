import { useEffect, useState } from "react";
import { PinContainer } from "./ui/3d-pin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Meteors } from "./ui/meteors";

const Repositories = () => {
  const [repos, setRepos] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    const getRepos = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/github/repos`, {
                headers: {
                    "Authorization": JSON.parse(localStorage.getItem("token") as string)
                }
            });
            const repos = await response.data;
            setRepos(repos);
            navigation("/dashboard")
        }
        catch(error) {
            console.log(error);
        }
    }

    getRepos();
  }, []);

  return (
    <div className="">
        <div className="p-10">
            <h1 className="text-2xl text-center">Repositories</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-20 py-20">
        {
            repos?.length > 0 && repos?.map((repo: any) => {
                return <PinContainer key={repo.id} title={repo.name} href={`/dashboard/${repo.owner.login}/${repo.name}/pulls`}>
                    <div className="flex flex-col rounded-2xl h-[20rem] w-[20rem] p-10">
                        <p>{repo.name}</p>
                        <p>{repo.description}</p>
                        <Meteors number={5}/>
                    </div>
                </PinContainer>
            })
        }
        </div>
    </div>
  )
}

export default Repositories