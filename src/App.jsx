import { useState } from "react";
import { ethers } from "ethers";

export default function App() {
  const [amount,setAmount]=useState("");
  const [status,setStatus]=useState("");

  const ROUTER="YOUR_ROUTER";

  async function connect(){
    if(!window.ethereum)return alert("Install wallet");
    await window.ethereum.request({method:"eth_requestAccounts"});
  }

  async function swap(){
    try{
      const provider=new ethers.BrowserProvider(window.ethereum);
      const signer=await provider.getSigner();
      const router=new ethers.Contract(ROUTER,["function swapExactTokensForTokens(uint,address[])"],signer);

      const tx=await router.swapExactTokensForTokens(
        ethers.parseUnits(amount,9),
        ["TOKEN_A","TOKEN_B"]
      );

      setStatus("Sending...");
      await tx.wait();
      setStatus("Success!");
    }catch(e){
      setStatus("Error");
    }
  }

  return (
    <div style={{padding:40}}>
      <h1>DEX</h1>
      <input value={amount} onChange={e=>setAmount(e.target.value)} />
      <button onClick={connect}>Connect</button>
      <button onClick={swap}>Swap</button>
      <p>{status}</p>
    </div>
  );
}
