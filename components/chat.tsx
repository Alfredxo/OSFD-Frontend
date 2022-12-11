import { Client } from "@xmtp/xmtp-js";
import { useReducerContext } from "../api/context";
import { ethers, Wallet } from "ethers";
import { useEffect, useState } from "react";

const Chat = () => {
  const { state, dispatch } = useReducerContext();
  const [client, setClient] = useState<Client | null>(null);

  const ethereum = typeof window !== "undefined" && window ? window.ethereum : {};

  const connectXmtp = async () => {
    const web3Provider = new ethers.providers.Web3Provider(ethereum, "any");
    const newSigner = web3Provider.getSigner(state.walletAddress);
    const xmtp = await Client.create(newSigner);
    setClient(xmtp);
  };

  return (
    <div>
      {" "}
      {state.walletAddress ? (
        <button className="btn" onClick={() => connectXmtp()}>
          Connect to XMTP
        </button>
      ) : (
        <p>Connect wallet first</p>
      )}
      {client && <div>Connected to xmtp</div>}
    </div>
  );
};

export default Chat;
