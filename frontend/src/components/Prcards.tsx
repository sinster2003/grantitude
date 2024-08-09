import React from 'react'
import { ethers, parseEther } from "ethers";
import { BrowserProvider } from "ethers";
import abi from "../../Bounty.json"
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "./ui/glowing-stars";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./ui/animated-modal";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";  
import { motion } from "framer-motion";
import { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Prcards = ({ username, bio, userImg, number, prUrl }: { username: string, bio: string, userImg: string, number: number, prUrl: string }) => {
  const [currentWalletAddress, setCurrentWalletAddress] = useState("Not connected to any account")
  const [inputValue, setInputValue] = useState("");
  let toastLoadingId: string | null = null;

  async function makeTransaction()
  { // input validations
    if(Number.isNaN(Number(inputValue))){
      toast.error("Invalid bounty value, its should be in ETH.(Eg:0.01)")
    }
    else{
      //@ts-ignore
      if(!window.ethereum){
        toast.error("Wallet not connected, please install metamask");
      }
      else{
        try {
          toastLoadingId = toast.loading("Transaction under process! Do not press refresh or back button!")
          //@ts-ignore
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const bountyContract = new ethers.Contract(import.meta.env.VITE_APP_CONTRACT_ADDRESS_DEPLOYED, abi.abi, signer);
          const contributorAddress = await axios.get(`https://grantitude-backend.onrender.com/api/github/users/${username}`, {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("token") as string)
            }
          });

          const tx = await bountyContract.awardBounty(contributorAddress.data, {
            value: parseEther(inputValue)
          });
          await tx.wait();
          if(toastLoadingId) { toast.dismiss(toastLoadingId) }
          toast.success(`Transaction successful! Bounty sent to ${username}`);       
        }
        catch(error) {
          //@ts-ignore
          if(error.code === "INSUFFICIENT_FUNDS") {
            toast.error("INSUFFICIENT_FUNDS in your metamask wallet!")
            if(toastLoadingId) { toast.dismiss(toastLoadingId) }
          }
          else {
            toast.error("Something went wrong! Maybe github bio doesn't have a metamask address.")
            if(toastLoadingId) { toast.dismiss(toastLoadingId) }
          }
          console.log(error);
        }
      }
    }    
  }

  async function connectWallet(){
    //check whether metamask exists
    //@ts-ignore
    if(window.ethereum){
      toast.success("Meta mask detected")
      try{
        //@ts-ignore
        const accounts = await window.ethereum.request({
          method:"eth_requestAccounts"
        })
        setCurrentWalletAddress(accounts[0])
      }catch(error){
        toast.error("Metamask could not be requested!");
        console.log(error);
      }
    }
    else{
      toast.error("Metamask wallet not found")
    }
  }
  
  const placeholders = [
    "Set the bounty value for each pull request",
    "Encourage open source contributors",
    "Fuel innovation and excellence",
    "Seamlessly send ETH to contributors",
    "Recognize developers across globe",
    "Set the value in ETH (Eg:0.01)",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }; 

  const images = [
    "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvbnRyaWJ1dGlvbnMlMjBvbiUyMGdpdGh1YiUyMGNvZGV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1649274496773-c40eacd66e2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXRoZXJldW0lMjBjb2lufGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1666625519702-7270420bb4f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGV0aGVyZXVtJTIwd2FsbGV0fGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2l0aHViJTIwYm91bnR5fGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1518107616985-bd48230d3b20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGdpdGh1YnxlbnwwfHwwfHx8MA%3D%3D",
  ];

  return (
    <div className="flex flex-col py-10 items-center justify-center antialiased">
      <Link to={prUrl} target='_blank'>
      <GlowingStarsBackgroundCard className='min-w-[480px]'>
        <GlowingStarsTitle>{`${username} #${number}`}</GlowingStarsTitle>
        <div className="flex justify-between items-center">
          <GlowingStarsDescription>
            {bio}
          </GlowingStarsDescription>
          <img src={userImg} alt={username} className='rounded-full w-10 h-10'/>
        </div>
      </GlowingStarsBackgroundCard>
      </Link>
      <div className="py-4 flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Add bounty
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
          🏅
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
            Set bounties that reflect  {" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
              true
              </span>{" "}
              worth. 🏅
            </h4>
            <div className="flex justify-center items-center">
              {images.map((image, idx) => (
                <motion.div
                  key={"images" + idx}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                >
                  <img
                    src={image}
                    alt="bounty images"
                    width="500"
                    height="500"
                    className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                  />
                </motion.div>
              ))}
            </div>
            <div className="py-10 flex gap-x-4 gap-y-6 items-center justify-center">

            <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={makeTransaction}
      />
            </div>
            <p className='text-white text-center'>The wallet address is : {currentWalletAddress}</p>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Later,not now!
            </button>
            <button onClick={connectWallet} className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Connect Wallet
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
    </div>
  );
}

export default Prcards