"use client";

import { SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  formatExpiryDate,
  generateMockHistory,
  getStatus,
  TOKEN_METADATA,
} from "./mock-history-data";

const StatusBadge = ({ status }: { status: string }) => {
  const getVariant = (s: string) => {
    if (s === "Fulfilled") return "default";
    if (s === "Deposited") return "secondary";
    if (s === "Refunded") return "outline";
    if (s === "Failed") return "destructive";
    return "default";
  };

  return (
    <Badge variant={getVariant(status)} className="px-3 py-1">
      <p className="text-xs font-semibold tracking-wide">{status}</p>
    </Badge>
  );
};

const ViewHistoryDemo = () => {
  const [history] = useState(generateMockHistory);

  return (
    <div className="flex flex-col gap-y-3 max-h-96 no-scrollbar overflow-y-auto w-full max-w-md">
      {history.map((pastIntent) => (
        <Card
          key={pastIntent.id}
          className="p-4 hover:shadow-md transition-shadow duration-200 border-border/50 gap-3"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Destination token icons */}
              <div className="flex items-center">
                {pastIntent.destinations.map((dest, index) => (
                  <div
                    key={dest.token.symbol}
                    className={cn(
                      "rounded-full transition-transform hover:scale-110",
                      index > 0 && "-ml-2",
                    )}
                    style={{
                      zIndex: pastIntent.destinations.length - index,
                    }}
                  >
                    <img
                      src={TOKEN_METADATA[dest.token.symbol]?.icon ?? ""}
                      alt={TOKEN_METADATA[dest.token.symbol]?.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium">
                  {pastIntent.destinations
                    .map((d) => d.token.symbol)
                    .join(", ")}
                </p>
                <p className="text-xs text-muted-foreground">
                  Intent #{pastIntent.id}
                </p>
              </div>
            </div>
            <StatusBadge status={getStatus(pastIntent)} />
          </div>

          <Separator className="my-1" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center justify-between gap-x-3 flex-1 w-full sm:min-w-fit">
              {/* Source chain icons */}
              <div className="flex items-center">
                {pastIntent.sources.map((source, index) => (
                  <div
                    key={source.chain.id}
                    className={cn(
                      "rounded-full transition-transform hover:scale-110",
                      index > 0 && "-ml-2",
                    )}
                    style={{
                      zIndex: pastIntent.sources.length - index,
                    }}
                  >
                    <img
                      src={source.chain.logo}
                      alt={source.chain.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-px w-8 bg-border" />
                <span className="text-xs">→</span>
                <div className="h-px w-8 bg-border" />
              </div>
              <div className="rounded-full hover:scale-110">
                <img
                  src={pastIntent.destinationChain.logo}
                  alt={pastIntent.destinationChain.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-x-2 w-full">
              <div className="text-left sm:text-right">
                <p className="text-xs text-muted-foreground">Expiry</p>
                <p className="text-xs font-medium">
                  {formatExpiryDate(pastIntent.expiry)}
                </p>
              </div>
              <a href={pastIntent.explorerUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" size="icon">
                  <SquareArrowOutUpRight className="size-4" />
                </Button>
              </a>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ViewHistoryDemo;
