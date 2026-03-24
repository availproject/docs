"use client";

import { useDialKit } from "dialkit";
import { useMemo } from "react";

interface ZoneTiming {
  duration: number;
  delay: number;
}

export interface EditTransitionDials {
  dotMatrix: ZoneTiming;
  zoneA: ZoneTiming;
  payingWith: ZoneTiming;
  zoneCDeposit: ZoneTiming;
  zoneCEdit: ZoneTiming;
}

export function useEditTransitionDials(
  toggleScreen: () => void,
): EditTransitionDials {
  const p = useDialKit(
    "Edit Transition",
    {
      speed: [1, 0.05, 3],

      zones: {
        dotMatrix: { duration: [500, 100, 2000], delay: [0, 0, 1000] },
        zoneA: { duration: [500, 100, 2000], delay: [0, 0, 1000] },
        payingWith: { duration: [500, 100, 2000], delay: [0, 0, 1000] },
        zoneCDeposit: { duration: [500, 100, 2000], delay: [0, 0, 1000] },
        zoneCEdit: { duration: [500, 100, 2000], delay: [0, 0, 1000] },
      },

      replay: { type: "action" as const, label: "Replay" },
      replayReverse: { type: "action" as const, label: "Replay Reverse" },
    },
    {
      onAction: () => {
        toggleScreen();
      },
    },
  );

  return useMemo(() => {
    const m = Math.max(p.speed, 0.01);
    const scale = (base: number) => Math.round(base / m);

    return {
      dotMatrix: {
        duration: scale(p.zones.dotMatrix.duration),
        delay: scale(p.zones.dotMatrix.delay),
      },
      zoneA: {
        duration: scale(p.zones.zoneA.duration),
        delay: scale(p.zones.zoneA.delay),
      },
      payingWith: {
        duration: scale(p.zones.payingWith.duration),
        delay: scale(p.zones.payingWith.delay),
      },
      zoneCDeposit: {
        duration: scale(p.zones.zoneCDeposit.duration),
        delay: scale(p.zones.zoneCDeposit.delay),
      },
      zoneCEdit: {
        duration: scale(p.zones.zoneCEdit.duration),
        delay: scale(p.zones.zoneCEdit.delay),
      },
    };
  }, [
    p.speed,
    p.zones.dotMatrix.duration,
    p.zones.dotMatrix.delay,
    p.zones.zoneA.duration,
    p.zones.zoneA.delay,
    p.zones.payingWith.duration,
    p.zones.payingWith.delay,
    p.zones.zoneCDeposit.duration,
    p.zones.zoneCDeposit.delay,
    p.zones.zoneCEdit.duration,
    p.zones.zoneCEdit.delay,
  ]);
}
