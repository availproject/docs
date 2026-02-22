import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
}

const B = "currentColor";
const G = "var(--color-border)";

function Dot({ x, y, fill }: { x: number; y: number; fill: string }) {
  return <rect x={x} y={y} width={4} height={4} rx={1} fill={fill} />;
}

export function GetStartedIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-11", className)}
      aria-hidden="true"
    >
      {/* Grey trail */}
      <Dot x={15} y={10} fill={G} />
      <Dot x={15} y={15} fill={G} />
      <Dot x={15} y={20} fill={G} />
      <Dot x={15} y={25} fill={G} />
      <Dot x={15} y={30} fill={G} />
      <Dot x={15} y={35} fill={G} />
      <Dot x={15} y={40} fill={G} />
      {/* Blue arrow */}
      <Dot x={20} y={5} fill={B} />
      <Dot x={20} y={10} fill={B} />
      <Dot x={25} y={10} fill={B} />
      <Dot x={20} y={15} fill={B} />
      <Dot x={25} y={15} fill={B} />
      <Dot x={30} y={15} fill={B} />
      <Dot x={20} y={20} fill={B} />
      <Dot x={25} y={20} fill={B} />
      <Dot x={30} y={20} fill={B} />
      <Dot x={35} y={20} fill={B} />
      <Dot x={20} y={25} fill={B} />
      <Dot x={25} y={25} fill={B} />
      <Dot x={30} y={25} fill={B} />
      <Dot x={20} y={30} fill={B} />
      <Dot x={25} y={30} fill={B} />
      <Dot x={20} y={35} fill={B} />
    </svg>
  );
}

export function ConceptsIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-11", className)}
      aria-hidden="true"
    >
      {/* Blue bulb + stem */}
      <Dot x={20} y={5} fill={B} />
      <Dot x={20} y={10} fill={B} />
      <Dot x={20} y={15} fill={B} />
      <Dot x={25} y={15} fill={B} />
      <Dot x={5} y={20} fill={B} />
      <Dot x={10} y={20} fill={B} />
      <Dot x={15} y={20} fill={B} />
      <Dot x={20} y={20} fill={B} />
      <Dot x={25} y={20} fill={B} />
      <Dot x={30} y={20} fill={B} />
      <Dot x={35} y={20} fill={B} />
      <Dot x={15} y={25} fill={B} />
      <Dot x={20} y={25} fill={B} />
      <Dot x={20} y={30} fill={B} />
      <Dot x={20} y={35} fill={B} />
      {/* Grey shadow */}
      <Dot x={0} y={25} fill={G} />
      <Dot x={5} y={25} fill={G} />
      <Dot x={10} y={25} fill={G} />
      <Dot x={10} y={30} fill={G} />
      <Dot x={15} y={30} fill={G} />
      <Dot x={15} y={35} fill={G} />
      <Dot x={15} y={40} fill={G} />
    </svg>
  );
}

export function UiElementsIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-11", className)}
      aria-hidden="true"
    >
      {/* Blue grid */}
      <Dot x={10} y={10} fill={B} />
      <Dot x={15} y={10} fill={B} />
      <Dot x={20} y={10} fill={B} />
      <Dot x={25} y={10} fill={B} />
      <Dot x={30} y={10} fill={B} />
      <Dot x={10} y={15} fill={B} />
      <Dot x={15} y={15} fill={B} />
      <Dot x={20} y={15} fill={B} />
      <Dot x={25} y={15} fill={B} />
      <Dot x={30} y={15} fill={B} />
      <Dot x={10} y={20} fill={B} />
      <Dot x={15} y={20} fill={B} />
      <Dot x={20} y={20} fill={B} />
      <Dot x={25} y={20} fill={B} />
      <Dot x={30} y={20} fill={B} />
      <Dot x={10} y={25} fill={B} />
      <Dot x={15} y={25} fill={B} />
      <Dot x={20} y={25} fill={B} />
      <Dot x={25} y={25} fill={B} />
      <Dot x={30} y={25} fill={B} />
      <Dot x={10} y={30} fill={B} />
      <Dot x={15} y={30} fill={B} />
      <Dot x={20} y={30} fill={B} />
      <Dot x={25} y={30} fill={B} />
      <Dot x={30} y={30} fill={B} />
      {/* Grey edge */}
      <Dot x={5} y={15} fill={G} />
      <Dot x={5} y={20} fill={G} />
      <Dot x={5} y={25} fill={G} />
      <Dot x={5} y={30} fill={G} />
      <Dot x={5} y={35} fill={G} />
      <Dot x={10} y={35} fill={G} />
      <Dot x={15} y={35} fill={G} />
      <Dot x={20} y={35} fill={G} />
      <Dot x={25} y={35} fill={G} />
    </svg>
  );
}

export function NexusSdkIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-11", className)}
      aria-hidden="true"
    >
      {/* Blue code brackets */}
      <Dot x={5} y={10} fill={B} />
      <Dot x={25} y={10} fill={B} />
      <Dot x={30} y={10} fill={B} />
      <Dot x={35} y={10} fill={B} />
      <Dot x={5} y={15} fill={B} />
      <Dot x={10} y={15} fill={B} />
      <Dot x={30} y={15} fill={B} />
      <Dot x={35} y={15} fill={B} />
      <Dot x={5} y={20} fill={B} />
      <Dot x={10} y={20} fill={B} />
      <Dot x={15} y={20} fill={B} />
      <Dot x={35} y={20} fill={B} />
      <Dot x={5} y={25} fill={B} />
      <Dot x={10} y={25} fill={B} />
      <Dot x={30} y={25} fill={B} />
      <Dot x={35} y={25} fill={B} />
      <Dot x={5} y={30} fill={B} />
      <Dot x={25} y={30} fill={B} />
      <Dot x={30} y={30} fill={B} />
      <Dot x={35} y={30} fill={B} />
      {/* Grey shadow */}
      <Dot x={0} y={15} fill={G} />
      <Dot x={20} y={15} fill={G} />
      <Dot x={25} y={15} fill={G} />
      <Dot x={0} y={20} fill={G} />
      <Dot x={25} y={20} fill={G} />
      <Dot x={30} y={20} fill={G} />
      <Dot x={0} y={25} fill={G} />
      <Dot x={0} y={30} fill={G} />
      <Dot x={0} y={35} fill={G} />
      <Dot x={20} y={35} fill={G} />
      <Dot x={25} y={35} fill={G} />
      <Dot x={30} y={35} fill={G} />
    </svg>
  );
}

export function BuildIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-11", className)}
      aria-hidden="true"
    >
      {/* Blue hollow hexagon — flat top/bottom */}
      <Dot x={10} y={5} fill={B} />
      <Dot x={15} y={5} fill={B} />
      <Dot x={20} y={5} fill={B} />
      <Dot x={25} y={5} fill={B} />
      <Dot x={30} y={5} fill={B} />
      <Dot x={5} y={10} fill={B} />
      <Dot x={35} y={10} fill={B} />
      <Dot x={5} y={15} fill={B} />
      <Dot x={35} y={15} fill={B} />
      <Dot x={5} y={20} fill={B} />
      <Dot x={35} y={20} fill={B} />
      <Dot x={10} y={25} fill={B} />
      <Dot x={15} y={25} fill={B} />
      <Dot x={20} y={25} fill={B} />
      <Dot x={25} y={25} fill={B} />
      <Dot x={30} y={25} fill={B} />
      {/* Grey shadow */}
      <Dot x={10} y={10} fill={G} />
      <Dot x={15} y={10} fill={G} />
      <Dot x={20} y={10} fill={G} />
      <Dot x={25} y={10} fill={G} />
      <Dot x={0} y={15} fill={G} />
      <Dot x={30} y={15} fill={G} />
      <Dot x={0} y={20} fill={G} />
      <Dot x={30} y={20} fill={G} />
      <Dot x={0} y={25} fill={G} />
      <Dot x={5} y={30} fill={G} />
      <Dot x={10} y={30} fill={G} />
      <Dot x={15} y={30} fill={G} />
      <Dot x={20} y={30} fill={G} />
      <Dot x={25} y={30} fill={G} />
    </svg>
  );
}

export function OperateIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-11", className)}
      aria-hidden="true"
    >
      {/* Blue diamond */}
      <Dot x={20} y={10} fill={B} />
      <Dot x={15} y={15} fill={B} />
      <Dot x={20} y={15} fill={B} />
      <Dot x={25} y={15} fill={B} />
      <Dot x={10} y={20} fill={B} />
      <Dot x={15} y={20} fill={B} />
      <Dot x={20} y={20} fill={B} />
      <Dot x={25} y={20} fill={B} />
      <Dot x={30} y={20} fill={B} />
      <Dot x={15} y={25} fill={B} />
      <Dot x={20} y={25} fill={B} />
      <Dot x={25} y={25} fill={B} />
      <Dot x={20} y={30} fill={B} />
      {/* Grey shadow */}
      <Dot x={5} y={25} fill={G} />
      <Dot x={10} y={25} fill={G} />
      <Dot x={10} y={30} fill={G} />
      <Dot x={15} y={30} fill={G} />
      <Dot x={15} y={35} fill={G} />
    </svg>
  );
}

export function UserGuidesIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-11", className)}
      aria-hidden="true"
    >
      {/* Blue cursor arrow — tilted, tip at top */}
      <Dot x={15} y={0} fill={B} />
      <Dot x={10} y={5} fill={B} />
      <Dot x={15} y={5} fill={B} />
      <Dot x={10} y={10} fill={B} />
      <Dot x={15} y={10} fill={B} />
      <Dot x={5} y={15} fill={B} />
      <Dot x={10} y={15} fill={B} />
      <Dot x={15} y={15} fill={B} />
      <Dot x={20} y={15} fill={B} />
      <Dot x={5} y={20} fill={B} />
      <Dot x={10} y={20} fill={B} />
      <Dot x={15} y={20} fill={B} />
      <Dot x={20} y={20} fill={B} />
      <Dot x={25} y={20} fill={B} />
      <Dot x={5} y={25} fill={B} />
      <Dot x={10} y={25} fill={B} />
      <Dot x={15} y={25} fill={B} />
      <Dot x={20} y={25} fill={B} />
      <Dot x={10} y={30} fill={B} />
      <Dot x={15} y={30} fill={B} />
      <Dot x={15} y={35} fill={B} />
      <Dot x={20} y={35} fill={B} />
      <Dot x={20} y={40} fill={B} />
      {/* Grey shadow */}
      <Dot x={5} y={10} fill={G} />
      <Dot x={0} y={20} fill={G} />
      <Dot x={0} y={25} fill={G} />
      <Dot x={0} y={30} fill={G} />
      <Dot x={5} y={30} fill={G} />
      <Dot x={15} y={30} fill={G} />
      <Dot x={20} y={30} fill={G} />
      <Dot x={5} y={35} fill={G} />
      <Dot x={10} y={35} fill={G} />
      <Dot x={10} y={40} fill={G} />
      <Dot x={15} y={40} fill={G} />
    </svg>
  );
}

export function ApiReferenceIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-11", className)}
      aria-hidden="true"
    >
      {/* Blue > prompt */}
      <Dot x={10} y={5} fill={B} />
      <Dot x={10} y={10} fill={B} />
      <Dot x={15} y={10} fill={B} />
      <Dot x={10} y={15} fill={B} />
      <Dot x={15} y={15} fill={B} />
      <Dot x={20} y={15} fill={B} />
      <Dot x={10} y={20} fill={B} />
      <Dot x={15} y={20} fill={B} />
      <Dot x={10} y={25} fill={B} />
      {/* Blue underscore */}
      <Dot x={25} y={25} fill={B} />
      <Dot x={30} y={25} fill={B} />
      <Dot x={35} y={25} fill={B} />
      {/* Grey shadow */}
      <Dot x={5} y={10} fill={G} />
      <Dot x={5} y={15} fill={G} />
      <Dot x={5} y={20} fill={G} />
      <Dot x={5} y={25} fill={G} />
      <Dot x={5} y={30} fill={G} />
      <Dot x={20} y={30} fill={G} />
      <Dot x={25} y={30} fill={G} />
      <Dot x={30} y={30} fill={G} />
    </svg>
  );
}

export function CookbookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-11", className)}
      aria-hidden="true"
    >
      {/* Blue clipboard — tab + body */}
      <Dot x={15} y={5} fill={B} />
      <Dot x={20} y={5} fill={B} />
      <Dot x={25} y={5} fill={B} />
      <Dot x={10} y={10} fill={B} />
      <Dot x={15} y={10} fill={B} />
      <Dot x={20} y={10} fill={B} />
      <Dot x={25} y={10} fill={B} />
      <Dot x={30} y={10} fill={B} />
      <Dot x={10} y={15} fill={B} />
      <Dot x={15} y={15} fill={B} />
      <Dot x={20} y={15} fill={B} />
      <Dot x={25} y={15} fill={B} />
      <Dot x={30} y={15} fill={B} />
      <Dot x={10} y={20} fill={B} />
      <Dot x={15} y={20} fill={B} />
      <Dot x={20} y={20} fill={B} />
      <Dot x={25} y={20} fill={B} />
      <Dot x={30} y={20} fill={B} />
      <Dot x={10} y={25} fill={B} />
      <Dot x={15} y={25} fill={B} />
      <Dot x={20} y={25} fill={B} />
      <Dot x={25} y={25} fill={B} />
      <Dot x={30} y={25} fill={B} />
      <Dot x={10} y={30} fill={B} />
      <Dot x={15} y={30} fill={B} />
      <Dot x={20} y={30} fill={B} />
      <Dot x={25} y={30} fill={B} />
      <Dot x={30} y={30} fill={B} />
      {/* Grey shadow */}
      <Dot x={5} y={15} fill={G} />
      <Dot x={5} y={20} fill={G} />
      <Dot x={5} y={25} fill={G} />
      <Dot x={5} y={30} fill={G} />
      <Dot x={5} y={35} fill={G} />
      <Dot x={10} y={35} fill={G} />
      <Dot x={15} y={35} fill={G} />
      <Dot x={20} y={35} fill={G} />
      <Dot x={25} y={35} fill={G} />
    </svg>
  );
}

export function SupportedChainsIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-11", className)}
      aria-hidden="true"
    >
      {/* Blue chain — two linked rings */}
      <Dot x={10} y={5} fill={B} />
      <Dot x={15} y={5} fill={B} />
      <Dot x={5} y={10} fill={B} />
      <Dot x={20} y={10} fill={B} />
      <Dot x={5} y={15} fill={B} />
      <Dot x={20} y={15} fill={B} />
      <Dot x={10} y={20} fill={B} />
      <Dot x={15} y={20} fill={B} />
      <Dot x={20} y={20} fill={B} />
      <Dot x={25} y={20} fill={B} />
      <Dot x={15} y={25} fill={B} />
      <Dot x={30} y={25} fill={B} />
      <Dot x={15} y={30} fill={B} />
      <Dot x={30} y={30} fill={B} />
      <Dot x={20} y={35} fill={B} />
      <Dot x={25} y={35} fill={B} />
      {/* Grey shadow */}
      <Dot x={0} y={15} fill={G} />
      <Dot x={0} y={20} fill={G} />
      <Dot x={5} y={25} fill={G} />
      <Dot x={10} y={25} fill={G} />
      <Dot x={10} y={30} fill={G} />
      <Dot x={10} y={35} fill={G} />
      <Dot x={15} y={40} fill={G} />
      <Dot x={20} y={40} fill={G} />
      <Dot x={25} y={35} fill={G} />
    </svg>
  );
}
