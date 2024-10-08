import Navbar from "./Navbar";
import { Button } from "./ui/moving-border";
import { SparklesCore } from "./ui/sparkles";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Footer from "./Footer";
import handleGithubLogin from "../utils/handleGithubLogin";
import { useAuth } from "./Layout";
import handleLogout from "../utils/handleLogout";

const Landing = () => {
  const auth = useAuth();

  return (
    <>
    <Navbar/>
    <div className="w-full h-full bg-black flex justify-center items-center flex-col pb-20">
    <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
        Grantitude
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
 
        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
 
        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
            Fuel innovation and recognize <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Open source contributions
              </span>
            </h1>
          </>
        }
      >
        <img
          src={`/landingimage.jpg`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
      <p className="text-5xl text-white pt-6">Reward open source contributions with EASE.</p>
      <p className="text-2xl text-slate-600 pt-5">Connect your Github account and reward the contributors.</p>
      <div className="mt-6"><Button 
    borderRadius="1.75rem"
    className="bg-white dark:bg-transparent text-black dark:text-white border-neutral-200 dark:border-slate-800"
    onClick={(!auth?.authStatus) ? handleGithubLogin : () => { handleLogout(); auth?.setAuthStatus(null); }}
  >
    {!auth?.authStatus ? "Login to Github" : "Logout"}
  </Button>
  </div>  
    </div>
    <Footer/>
    </>
  )
}

export default Landing