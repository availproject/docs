"use client";
import { NexusNetwork } from "@avail-project/nexus-core";
import React, { useState, useEffect } from "react";

import { getItem, setItem } from "@/lib/local-storage";
import { NETWORK_KEY } from "@/providers/Web3Provider";
import { useNexus } from "../nexus/NexusProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const NetworkToggle = () => {
  const { nexusSDK, deinitializeNexus } = useNexus();
  const [currentNetwork, setCurrentNetwork] = useState<NexusNetwork>("mainnet");

  useEffect(() => {
    // Read from localStorage on client side only
    const storedNetwork = getItem(NETWORK_KEY) as NexusNetwork | null;
    if (
      storedNetwork &&
      (storedNetwork === "mainnet" || storedNetwork === "testnet")
    ) {
      setCurrentNetwork(storedNetwork);
    } else {
      setCurrentNetwork("mainnet");
    }
  }, []);

  const handleNetworkChange = async (newValue: string) => {
    if (nexusSDK) {
      await deinitializeNexus();
    }

    setItem(NETWORK_KEY, newValue);
    setCurrentNetwork(newValue as NexusNetwork);
    window.location.reload();
  };

  return (
    <div className="flex items-center space-x-2">
      <Select
        value={currentNetwork as string}
        onValueChange={handleNetworkChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a network" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="testnet">Testnet</SelectItem>
          <SelectItem value="mainnet">Mainnet</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default NetworkToggle;
