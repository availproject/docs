"use client";
import { type FC, useState } from "react";
import { Input } from "../../ui/input";
import { Check, Edit } from "lucide-react";
import { Button } from "../../ui/button";
import { useNexus } from "../../nexus/NexusProvider";
import { type Address } from "viem";

interface RecipientAddressProps {
  address?: Address;
  onChange: (address: string) => void;
  disabled?: boolean;
}

const RecipientAddress: FC<RecipientAddressProps> = ({
  address,
  onChange,
  disabled,
}) => {
  const { nexusSDK } = useNexus();
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="w-full">
      {isEditing ? (
        <div className="flex items-center w-full justify-between gap-x-4">
          <Input
            value={address}
            placeholder="Enter Recipient Address"
            onChange={(e) => onChange(e.target.value)}
            className="w-full"
          />
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => {
              setIsEditing(false);
            }}
          >
            <Check className="size-5" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full justify-between">
          <p className="font-light text-base">Recipient Address</p>
          <div className="flex items-center gap-x-3 ">
            {address && (
              <p className="font-light text-base">
                {nexusSDK?.utils?.truncateAddress(address, 6, 6)}
              </p>
            )}

            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                setIsEditing(true);
              }}
              className="px-0 size-5"
              disabled={disabled}
            >
              <Edit className="size-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipientAddress;
