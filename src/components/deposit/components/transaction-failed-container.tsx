"use client";

import { Button } from "../../ui/button";
import { CardContent, CardFooter } from "../../ui/card";
import type { DepositWidgetContextValue } from "../types";
import { ReceiveAmountDisplay } from "./receive-amount-display";
import WidgetHeader from "./widget-header";

interface TransactionFailedContainerProps {
  widget: DepositWidgetContextValue;
  heading?: string;
  onClose?: () => void;
}

const TransactionFailedContainer = ({
  widget,
  heading,
  onClose,
}: TransactionFailedContainerProps) => {
  const handleRetry = () => {
    widget.setTxError(null);
    widget.reset();
    widget.goToStep("amount");
  };

  const handleClose = () => {
    widget.reset();
    onClose?.();
  };

  return (
    <>
      <WidgetHeader
        title={heading ?? ""}
        onClose={onClose}
        depositTargetLogo={widget?.destination?.depositTargetLogo}
      />
      <CardContent>
        <div className="flex flex-col">
          <div className="bg-card rounded-t-lg border-t border-l border-r border-border shadow-[0_1px_12px_0_rgba(91,91,91,0.05)] px-6 pt-6 pb-6 flex flex-col items-center gap-5">
            <ReceiveAmountDisplay
              label="Transaction failed"
              amount="-$0.00"
              timeLabel=""
              showClockIcon={false}
              showUsdValue={false}
            />
            <div className="w-full bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-4 overflow-hidden">
              <p className="font-sans text-sm leading-5 text-destructive break-all">
                {widget?.txError ??
                  `It's not you, it's us. Everything seems to be in order from your
                side, our engineers might have broken something.`}
              </p>
              <p className="font-sans text-sm leading-5 text-destructive mt-3">
                Retry in a bit?
              </p>
            </div>
          </div>
          <div className="flex w-full">
            <Button
              className="w-1/2 rounded-t-none rounded-br-none"
              onClick={handleRetry}
            >
              Retry
            </Button>
            <Button
              className="w-1/2 rounded-t-none rounded-bl-none"
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter />
    </>
  );
};

export default TransactionFailedContainer;
