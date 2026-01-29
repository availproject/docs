import { type FC, useRef } from "react";

interface AmountInputProps {
  amount?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  disabled?: boolean;
}

const AmountInput: FC<AmountInputProps> = ({
  amount,
  onChange,
  onFocus,
  disabled,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex items-start gap-2 text-4xl font-medium transition-all duration-150 ease-out w-full">
      <div
        ref={mirrorRef}
        className="absolute invisible pointer-events-none text-4xl font-medium whitespace-pre"
        style={{
          fontVariantNumeric: "proportional-nums",
        }}
      >
        {amount || "0"}
      </div>

      <input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        placeholder="0"
        value={amount}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        onFocus={onFocus}
        maxLength={18}
        autoFocus
        className="bg-transparent w-full text-foreground text-4xl font-medium outline-none transition-all duration-150 placeholder-muted-foreground proportional-nums disabled:opacity-50"
        disabled={disabled}
      />
      <div className="absolute -inset-1 -z-10 blur-sm pointer-events-none opacity-0" />
    </div>
  );
};

export default AmountInput;
