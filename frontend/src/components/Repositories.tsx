import { useEffect, useState } from "react";
import { PinContainer } from "./ui/3d-pin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Meteors } from "./ui/meteors";
import { Pagination, PaginationContent } from "./ui/pagination";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const Repositories = () => {
  const [repos, setRepos] = useState([]);
  const [pagination, setPagination] = useState<number[]>([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [pageNo, setPageNo] = useState(1);
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
            setFilteredRepos(repos.slice(0,6));
            navigation("/dashboard");
        }
        catch(error) {
            toast.error("Repositories not able to be fetched");
            console.log(error);
        }
    }

    getRepos();
  }, []);

  useEffect(() => {
    const pages = [];
    for(let i = 1; i <= Math.ceil(repos?.length / 6); i++) {
        pages.push(i);
    }
    setPagination(pages);
  }, [repos]);

  const handlePagination = (pageNo: number) => {
    setPageNo(pageNo);
    setFilteredRepos(repos?.slice((pageNo - 1) * 6, (pageNo - 1) * 6 + 6));
  }

  if(!repos || repos?.length <= 0) {
    return <div className="flex w-full h-screen justify-center items-center">
        <img src="/loader.gif" alt="loading"/>
    </div>
  }

  return (
    <div>
        <div className="fixed top-10 right-10 z-50 rounded-full">
            {/*@ts-ignore*/}
            <img src={repos?.[0]?.owner?.avatar_url} width="40px" height="40px" className="rounded-full"/>
        </div>
        <div className="flex flex-col gap-10 pt-[60px] px-10 pb-10">
            <h1 className="text-2xl text-center">Repositories</h1>
        </div>

        <div className="py-10">
            <Pagination>
                <PaginationContent>
                    <div className="flex flex-wrap gap-4">
                        {pagination?.map((page: number) => <Button key={page} className={`text-neutral-900 gap-5 hover:bg-gray-400 cursor-pointer ${ page === pageNo ? "bg-gray-400" : "bg-white" }`} onClick={() => {handlePagination(page)}}>{page}</Button>)}
                    </div>
                </PaginationContent>
            </Pagination>
        </div>

        <div className="flex flex-wrap justify-center gap-20 pt-10 py-20">
        {
            filteredRepos?.length > 0 && filteredRepos?.map((repo: any) => {
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