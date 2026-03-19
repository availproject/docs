"use client";
import type { NexusNetwork } from "@avail-project/nexus-core";
import { useEffect, useState } from "react";

import { useAnalytics } from "@/hooks/use-analytics";
import { NETWORK_KEY } from "@/lib/constants";
import { getItem, setItem } from "@/lib/local-storage";
import { useNexus } from "../nexus/NexusProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const NetworkToggle = () => {
  const { trackEvent } = useAnalytics();
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

    trackEvent("network_changed", {
      network: newValue as "mainnet" | "testnet",
      previous_network: currentNetwork as "mainnet" | "testnet",
    });

    setItem(NETWORK_KEY, newValue);
    setCurrentNetwork(newValue as NexusNetwork);

    // Brief delay so PostHog can send the event before page reload
    setTimeout(() => window.location.reload(), 100);
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
