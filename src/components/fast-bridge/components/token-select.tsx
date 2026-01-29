import {
  type SUPPORTED_CHAINS_IDS,
  type SUPPORTED_TOKENS,
} from "@avail-project/nexus-core";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Label } from "../../ui/label";
import { useNexus } from "../../nexus/NexusProvider";
import { useMemo } from "react";

interface TokenSelectProps {
  selectedToken?: SUPPORTED_TOKENS;
  selectedChain: SUPPORTED_CHAINS_IDS;
  handleTokenSelect: (token: SUPPORTED_TOKENS) => void;
  isTestnet?: boolean;
  disabled?: boolean;
  label?: string;
}

const TokenSelect = ({
  selectedToken,
  selectedChain,
  handleTokenSelect,
  isTestnet = false,
  disabled = false,
  label,
}: TokenSelectProps) => {
  const { supportedChainsAndTokens } = useNexus();
  const tokenData = useMemo(() => {
    return supportedChainsAndTokens
      ?.filter((chain) => chain.id === selectedChain)
      .flatMap((chain) => chain.tokens);
  }, [selectedChain, supportedChainsAndTokens]);

  const selectedTokenData = tokenData?.find((token) => {
    return token.symbol === selectedToken;
  });

  return (
    <Select
      value={selectedToken}
      onValueChange={(value) =>
        !disabled && handleTokenSelect(value as SUPPORTED_TOKENS)
      }
    >
      <div className="flex flex-col items-start gap-y-1">
        {label && <Label className="text-sm font-semibold">{label}</Label>}
        <SelectTrigger
          disabled={disabled}
          className="w-full h-12! text-base font-light"
        >
          <SelectValue placeholder="Select a token" className="w-full">
            {selectedChain && selectedTokenData && (
              <div className="flex items-center gap-x-2 w-full">
                <img
                  src={selectedTokenData?.logo}
                  alt={selectedTokenData?.symbol}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                {selectedToken}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
      </div>

      <SelectContent>
        <SelectGroup>
          {tokenData?.map((token) => (
            <SelectItem key={token.symbol} value={token.symbol}>
              <div className="flex items-center gap-x-2 my-1">
                <img
                  src={token.logo}
                  alt={token.symbol}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span>
                    {isTestnet ? `${token.symbol} (Testnet)` : token.symbol}
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TokenSelect;
