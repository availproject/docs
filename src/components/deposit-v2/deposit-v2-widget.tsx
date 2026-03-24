"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usdFormatter } from "../common";
import { ErrorBanner } from "../deposit/components/error-banner";
import {
  ChevronDownIcon,
  CloseIcon,
  CoinIcon,
} from "../deposit/components/icons";
import { TokenIcon } from "../deposit/components/token-icon";
import {
  BALANCE_SAFETY_MARGIN,
  CHARACTER_ANIMATION_DURATION_MS,
  MAX_INPUT_WIDTH_PX,
} from "../deposit/constants/widget";
import { parseCurrencyInput } from "../deposit/utils";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { TokenSelection } from "./components/token-selection";
import { useEditTransitionDials } from "./hooks/use-edit-transition-dials";

const NUMERIC_INPUT_REGEX = /^\d*\.?\d*$/;

function formatWithCommas(value: string): string {
  if (!value) return "";
  const [integer, decimal] = value.split(".");
  const formatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimal !== undefined ? `${formatted}.${decimal}` : formatted;
}
const MOCK_BALANCE_USD = 3259.37;
const LOADING_DELAY_MS = 1500;
const BASE_FONT_SIZE = 40;
const MIN_FONT_SIZE = 18;
const MAX_TEXT_WIDTH = 200;

interface DepositV2WidgetProps {
  balance?: number;
}

const DepositV2Widget = ({
  balance = MOCK_BALANCE_USD,
}: DepositV2WidgetProps) => {
  const [screen, setScreen] = useState<"deposit" | "edit">("deposit");
  const [amount, setAmount] = useState("");
  const [inputWidth, setInputWidth] = useState(0);
  const [animatingIndices, setAnimatingIndices] = useState<Set<number>>(
    new Set(),
  );
  const [payingWithLoading, setPayingWithLoading] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [selectedTokens, setSelectedTokens] = useState<Set<string>>(
    () => new Set(["USDC", "ETH"]),
  );

  const prevLengthRef = useRef(0);
  const prevExceedsRef = useRef(false);
  const prevNumericAmountRef = useRef(0);
  const measureRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevHasAmountRef = useRef(false);
  const editSnapshotRef = useRef<Set<string>>(new Set());

  const displayValue = formatWithCommas(amount);
  const measureText = displayValue || "0";
  const displayChars = displayValue.split("");

  const numericAmount = useMemo(() => {
    if (!amount) return 0;
    const parsed = Number.parseFloat(amount.replace(/,/g, ""));
    return Number.isNaN(parsed) ? 0 : parsed;
  }, [amount]);

  const hasAmount = numericAmount > 0;

  const exceedsBalance = useMemo(() => {
    if (!amount) return false;
    const num = Number.parseFloat(amount.replace(/,/g, ""));
    return !Number.isNaN(num) && num > balance;
  }, [amount, balance]);

  // Shake error banner only when numeric amount increases while already exceeding balance
  useEffect(() => {
    if (
      exceedsBalance &&
      prevExceedsRef.current &&
      numericAmount > prevNumericAmountRef.current
    ) {
      setShakeKey((k) => k + 1);
    }
    prevExceedsRef.current = exceedsBalance;
    prevNumericAmountRef.current = numericAmount;
  }, [numericAmount, exceedsBalance]);

  // Character animation — animate newly added digits
  useEffect(() => {
    const currentLength = displayValue.length;
    const prevLength = prevLengthRef.current;

    if (currentLength > prevLength) {
      const newIndices = new Set<number>();
      for (let i = prevLength; i < currentLength; i++) {
        newIndices.add(i);
      }
      setAnimatingIndices(newIndices);

      const timer = setTimeout(() => {
        setAnimatingIndices(new Set());
      }, CHARACTER_ANIMATION_DURATION_MS);

      prevLengthRef.current = currentLength;
      return () => clearTimeout(timer);
    }

    prevLengthRef.current = currentLength;
  }, [displayValue]);

  // Measure text width for invisible input sizing
  // biome-ignore lint/correctness/useExhaustiveDependencies: measureText triggers re-render of the hidden span
  useEffect(() => {
    if (measureRef.current) {
      setInputWidth(measureRef.current.offsetWidth);
    }
  }, [measureText]);

  // Shrink font to fit when text overflows available width
  const fontSize = useMemo(() => {
    if (inputWidth <= MAX_TEXT_WIDTH) return BASE_FONT_SIZE;
    const scale = MAX_TEXT_WIDTH / inputWidth;
    return Math.max(Math.round(BASE_FONT_SIZE * scale), MIN_FONT_SIZE);
  }, [inputWidth]);

  // "Paying with" loading skeleton when amount first entered
  useEffect(() => {
    if (hasAmount && !prevHasAmountRef.current) {
      setPayingWithLoading(true);
      const timer = setTimeout(
        () => setPayingWithLoading(false),
        LOADING_DELAY_MS,
      );
      prevHasAmountRef.current = hasAmount;
      return () => clearTimeout(timer);
    }
    prevHasAmountRef.current = hasAmount;
  }, [hasAmount]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = parseCurrencyInput(e.target.value);
      if (rawValue === "" || NUMERIC_INPUT_REGEX.test(rawValue)) {
        setAmount(rawValue);
      }
    },
    [],
  );

  const handleMaxClick = useCallback(() => {
    const safeBalance = balance * BALANCE_SAFETY_MARGIN;
    const formatted = usdFormatter.format(safeBalance).replace("$", "");
    setAmount(formatted);
  }, [balance]);

  const handleDoubleClick = useCallback(() => {
    inputRef.current?.select();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "a") {
        e.preventDefault();
        inputRef.current?.select();
      }
    },
    [],
  );

  /* ─────────────────────────────────────────────────────────
   * ANIMATION STORYBOARD — Edit Transition (Forward)
   *
   *    0ms   User clicks Edit on Paying With card
   *    0ms   Zone A (top bar + amount card) fades out + collapses
   *    0ms   Zone B (Paying With) morphs: bg, border, shadow, content
   *    0ms   Zone C-deposit (proceed button) collapses
   *    0ms   Zone C-edit (token list) expands + fades in
   *
   * Reverse (Close): all animations play backward
   * ───────────────────────────────────────────────────────── */

  const toggleScreen = useCallback(() => {
    setScreen((s) => {
      if (s === "deposit") {
        editSnapshotRef.current = new Set(selectedTokens);
        return "edit";
      }
      return "deposit";
    });
  }, [selectedTokens]);

  const dials = useEditTransitionDials(toggleScreen);

  const isEditing = screen === "edit";
  const canEdit = hasAmount && !exceedsBalance && !payingWithLoading;

  return (
    <Card className="relative w-full max-w-[340px] gap-0 overflow-hidden rounded-2xl border-0 bg-secondary p-0 shadow-[0_1px_12px_0_rgba(91,91,91,0.05)]">
      {/* Dot matrix background — fades with deposit content */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity ease-spring motion-reduce:transition-none ${
          isEditing ? "opacity-0" : ""
        }`}
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--muted-foreground) 0.6px, transparent 0.6px)",
          backgroundSize: "14px 14px",
          opacity: isEditing ? 0 : 0.07,
          transitionDuration: `${dials.dotMatrix.duration}ms`,
          transitionDelay: `${dials.dotMatrix.delay}ms`,
        }}
      />

      {/* Zone A: Deposit content — collapses in edit mode */}
      <div
        className={`grid transition-[grid-template-rows,opacity] ease-spring motion-reduce:transition-none ${
          isEditing
            ? "grid-rows-[0fr] opacity-0"
            : "grid-rows-[1fr] opacity-100"
        }`}
        style={{
          transitionDuration: `${dials.zoneA.duration}ms`,
          transitionDelay: `${dials.zoneA.delay}ms`,
        }}
      >
        <div className="overflow-hidden">
          {/* Top bar */}
          <div className="relative flex h-[52px] items-center justify-between px-4">
            <div className="size-5" aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              <span className="ui-14 text-foreground">Deposit to</span>
              <button
                type="button"
                className="flex cursor-pointer items-center gap-1 rounded bg-muted px-2 py-1 transition-colors duration-150 hover:bg-muted/70"
              >
                <span className="font-mono text-xs font-medium text-muted-foreground">
                  Aave
                </span>
                <ChevronDownIcon className="size-3 text-muted-foreground" />
              </button>
            </div>
            <button
              type="button"
              className="flex size-5 cursor-pointer items-center justify-center"
            >
              <CloseIcon
                size={20}
                className="text-muted-foreground transition-colors duration-150 hover:text-foreground"
              />
            </button>
          </div>

          {/* Amount card */}
          <div className="relative px-3">
            {/* biome-ignore lint/a11y/noStaticElementInteractions: click-to-focus wrapper for the input */}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: keyboard focus handled by the input itself */}
            <div
              className="relative flex min-h-[214px] cursor-text flex-col rounded-lg border bg-card shadow-[0_1px_12px_0_rgba(91,91,91,0.05)]"
              onClick={() => inputRef.current?.focus()}
            >
              {/* Hidden span for measuring input text width */}
              <span
                ref={measureRef}
                className="invisible absolute whitespace-pre font-display text-[40px] font-medium tracking-[0.8px] tabular-nums"
                aria-hidden="true"
              >
                {measureText}
              </span>

              {/* Token + animated amount input + MAX button */}
              <div className="flex items-center justify-center gap-3 py-14">
                <TokenIcon
                  tokenSrc="/usdc.svg"
                  protocolSrc="/aave.svg"
                  tokenAlt="USDC"
                  protocolAlt="Aave"
                  size="md"
                />
                <div className="relative">
                  {/* Animated digits layer */}
                  <div
                    className="pointer-events-none flex items-center"
                    aria-hidden="true"
                  >
                    {displayChars.map((char, index) => (
                      <span
                        key={`${index}-${char}-${animatingIndices.has(index) ? "anim" : "static"}`}
                        style={{ fontSize: `${fontSize}px` }}
                        className={`inline-block font-display font-medium tracking-[0.8px] tabular-nums transition-[font-size] duration-150 ease-out ${
                          animatingIndices.has(index) ? "animate-digit-in" : ""
                        } ${amount ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {char}
                      </span>
                    ))}
                    {displayValue.length === 0 && (
                      <span
                        style={{ fontSize: `${fontSize}px` }}
                        className="font-display font-medium tracking-[0.8px] tabular-nums text-muted-foreground"
                      >
                        0
                      </span>
                    )}
                  </div>

                  {/* Real input overlaid with transparent text */}
                  <input
                    ref={inputRef}
                    type="text"
                    inputMode="decimal"
                    value={displayValue}
                    onChange={handleInputChange}
                    onDoubleClick={handleDoubleClick}
                    onKeyDown={handleKeyDown}
                    placeholder="0"
                    style={{
                      fontSize: `${fontSize}px`,
                      width:
                        inputWidth > 0
                          ? Math.min(inputWidth + 4, MAX_INPUT_WIDTH_PX)
                          : undefined,
                      maxWidth: "calc(100vw - 160px)",
                    }}
                    className="absolute inset-0 min-w-[22px] border-none bg-transparent font-display font-medium tracking-[0.8px] tabular-nums text-transparent caret-card-foreground outline-none placeholder:text-transparent"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleMaxClick}
                  className="cursor-pointer rounded bg-muted px-2 py-1 font-mono text-sm text-muted-foreground transition-colors duration-150 hover:bg-muted/70 hover:text-card-foreground"
                >
                  MAX
                </button>
              </div>

              {/* Balance */}
              <div className="px-4 pb-3 pt-0">
                <p className="text-center text-[13px] text-muted-foreground">
                  Balance: {usdFormatter.format(balance)}
                </p>
              </div>

              {/* Error banner */}
              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-spring motion-reduce:transition-none ${
                  exceedsBalance ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div
                    key={shakeKey}
                    className={`px-3 pb-3 ${shakeKey > 0 ? "animate-shake motion-reduce:animate-none" : ""}`}
                  >
                    <ErrorBanner message="You don't have enough wallet balance" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zone B: Paying With — always visible, morphs between states */}
      <div
        className="px-3 pb-3 transition-[padding] ease-spring motion-reduce:transition-none"
        style={{
          paddingTop: isEditing ? "0.5rem" : "0.75rem",
          transitionDuration: `${dials.zoneA.duration}ms`,
          transitionDelay: `${dials.zoneA.delay}ms`,
        }}
      >
        {canEdit || isEditing ? (
          /* Morphing container — border/bg/shadow transition on one persistent element */
          <div
            className={`rounded-lg p-4 transition-[background-color,border-color,box-shadow] ease-spring motion-reduce:transition-none ${
              isEditing
                ? "border border-transparent bg-transparent shadow-none"
                : "border bg-card shadow-[0_1px_12px_0_rgba(91,91,91,0.05)]"
            }`}
            style={{
              transitionDuration: `${dials.payingWith.duration}ms`,
              transitionDelay: `${dials.payingWith.delay}ms`,
            }}
          >
            <div className="grid [grid-template:1fr/1fr]">
              {/* Layer 1: Edit header (fades in when editing) */}
              <div
                className={`col-start-1 row-start-1 transition-opacity ease-spring motion-reduce:transition-none ${isEditing ? "z-10" : "z-0"}`}
                style={{
                  opacity: isEditing ? 1 : 0,
                  pointerEvents: isEditing ? "auto" : "none",
                  transitionDuration: `${dials.payingWith.duration}ms`,
                  transitionDelay: `${dials.payingWith.delay}ms`,
                }}
                aria-hidden={!isEditing}
                {...(!isEditing && { inert: true })}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CoinIcon className="size-5 shrink-0 text-muted-foreground" />
                    <div className="flex flex-col gap-1">
                      <span className="ui-14 text-foreground">Paying with</span>
                      <span className="text-[13px] leading-[18px] text-muted-foreground">
                        {selectedTokens.size} asset(s) selected
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setScreen("deposit")}
                    className="flex size-5 cursor-pointer items-center justify-center"
                    aria-label="Close token selection"
                  >
                    <CloseIcon
                      size={20}
                      className="text-muted-foreground transition-colors duration-150 hover:text-foreground"
                    />
                  </button>
                </div>
              </div>

              {/* Layer 2: Deposit card (fades out when editing) */}
              <div
                className={`col-start-1 row-start-1 transition-opacity ease-spring motion-reduce:transition-none ${isEditing ? "z-0" : "z-10"}`}
                style={{
                  opacity: isEditing ? 0 : 1,
                  pointerEvents: isEditing ? "none" : "auto",
                  transitionDuration: `${dials.payingWith.duration}ms`,
                  transitionDelay: `${dials.payingWith.delay}ms`,
                }}
                aria-hidden={isEditing}
                {...(isEditing && { inert: true })}
              >
                <button
                  type="button"
                  onClick={() => {
                    editSnapshotRef.current = new Set(selectedTokens);
                    setScreen("edit");
                  }}
                  className="flex w-full cursor-pointer items-center text-left transition-opacity duration-150 hover:opacity-70"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex shrink-0">
                      <Image
                        src="/ethereum.svg"
                        alt="ETH"
                        width={24}
                        height={24}
                        className="relative z-10 rounded-full"
                      />
                      <Image
                        src="/usdc.svg"
                        alt="USDC"
                        width={24}
                        height={24}
                        className="-ml-2 rounded-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="ui-14 text-card-foreground">
                        Paying with
                      </span>
                      <span className="text-[13px] leading-[18px] text-muted-foreground">
                        {(() => {
                          const tokens = Array.from(selectedTokens);
                          if (tokens.length <= 2) return tokens.join(", ");
                          return `${tokens.slice(0, 2).join(", ")} +${tokens.length - 2} more`;
                        })()}
                      </span>
                    </div>
                  </div>
                  <span className="ml-auto ui-14 text-muted-foreground">
                    Edit
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Deposit mode — inactive: no amount or exceeds balance */
          <div
            className="flex items-center rounded-lg border bg-secondary p-4 transition-all ease-spring motion-reduce:transition-none"
            style={{
              transitionDuration: `${dials.payingWith.duration}ms`,
              transitionDelay: `${dials.payingWith.delay}ms`,
            }}
          >
            <div className="flex items-center gap-3">
              <CoinIcon className="size-5 shrink-0 text-muted-foreground" />
              <div className="flex flex-col gap-1">
                <span className="ui-14 text-card-foreground">Paying with</span>
                {payingWithLoading ? (
                  <Skeleton className="h-[14px] w-40 animate-pulse rounded-sm bg-muted-foreground/20" />
                ) : (
                  <span className="ui-14 text-muted-foreground">
                    Auto-selected based on amount
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Zone C-deposit: Proceed button — collapses in edit mode */}
      <div
        className={`grid transition-[grid-template-rows] ease-spring motion-reduce:transition-none ${
          !isEditing && canEdit ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
        style={{
          transitionDuration: `${dials.zoneCDeposit.duration}ms`,
          transitionDelay: `${dials.zoneCDeposit.delay}ms`,
        }}
      >
        <div className="overflow-hidden">
          <div className="px-3 pb-3 pt-2">
            <button
              type="button"
              className="h-12 w-full cursor-pointer rounded-[8px] bg-[#006bf4] font-medium text-sm text-white shadow-[0_1px_4px_0_rgba(85,85,91,0.05)] transition-colors duration-150 hover:bg-[#0059cc]"
            >
              Proceed to Deposit
            </button>
          </div>
        </div>
      </div>

      {/* Zone C-edit: Token selection — expands in edit mode */}
      <div
        className={`grid transition-[grid-template-rows,opacity] ease-spring motion-reduce:transition-none ${
          isEditing
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
        style={{
          transitionDuration: `${dials.zoneCEdit.duration}ms`,
          transitionDelay: `${dials.zoneCEdit.delay}ms`,
        }}
      >
        <div className="overflow-hidden">
          <TokenSelection
            hideHeader
            requiredAmount={numericAmount}
            onClose={() => setScreen("deposit")}
            onDone={(tokens) => {
              setSelectedTokens(tokens);
              setScreen("deposit");
            }}
            selected={selectedTokens}
            onSelectedChange={setSelectedTokens}
            initialSelected={editSnapshotRef.current}
          />
        </div>
      </div>
    </Card>
  );
};

export default DepositV2Widget;
