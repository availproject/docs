// "use client";
// import * as React from "react";
// import registry from "@/registry.json";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import { Copy } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "../ui/button";

// type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

// type DepsInstallProps = {
//   name: string;
//   className?: string;
//   defaultPm?: PackageManager;
// };

// export function DepsInstall({
//   name,
//   className,
//   defaultPm = "pnpm",
// }: Readonly<DepsInstallProps>) {
//   const [pm, setPm] = React.useState<PackageManager>(defaultPm);

//   // Gather dependencies from registry.json for the given component name
//   const deps: string[] = React.useMemo(() => {
//     const items = Array.isArray(
//       (registry as unknown as { items: unknown[] })?.items,
//     )
//       ? ((registry as unknown as { items: unknown[] }).items as Array<{
//           name: string;
//           dependencies?: string[];
//         }>)
//       : [];
//     const item = items.find((i) => i.name === name);
//     const unique = new Set<string>(item?.dependencies ?? []);
//     return Array.from(unique);
//   }, [name]);

//   const getCommand = (): string => {
//     const pkgList = deps.join(" ");
//     if (!pkgList) return "";
//     switch (pm) {
//       case "npm":
//         return `npm install ${pkgList}`;
//       case "yarn":
//         return `yarn add ${pkgList}`;
//       case "bun":
//         return `bun add ${pkgList}`;
//       default:
//         return `pnpm add ${pkgList}`;
//     }
//   };

//   const onCopy = async () => {
//     const cmd = getCommand();
//     if (!cmd) return;
//     try {
//       await navigator.clipboard.writeText(cmd);
//     } catch {
//       // no-op
//     }
//   };

//   // If there are no dependencies, avoid rendering an empty box
//   if (deps.length === 0) {
//     return null;
//   }

//   return (
//     <div
//       className={cn(
//         "rounded-lg border bg-background overflow-hidden",
//         className,
//       )}
//     >
//       <div className="flex items-center justify-between px-4 py-2.5 border-b bg-muted/50">
//         <div className="flex items-center gap-2">
//           <div className="flex items-center justify-center w-5 h-5 rounded bg-muted/20 text-[10px] font-medium text-muted-foreground">
//             {">_"}
//           </div>
//           <ToggleGroup
//             type="single"
//             value={pm}
//             onValueChange={(val) => val && setPm(val as PackageManager)}
//             variant="outline"
//             size="sm"
//             spacing={0}
//             className="h-auto"
//           >
//             <ToggleGroupItem value="pnpm" className="h-7 px-3 text-xs">
//               pnpm
//             </ToggleGroupItem>
//             <ToggleGroupItem value="npm" className="h-7 px-3 text-xs">
//               npm
//             </ToggleGroupItem>
//             <ToggleGroupItem value="yarn" className="h-7 px-3 text-xs">
//               yarn
//             </ToggleGroupItem>
//             <ToggleGroupItem value="bun" className="h-7 px-3 text-xs">
//               bun
//             </ToggleGroupItem>
//           </ToggleGroup>
//         </div>
//         <Button
//           size="sm"
//           variant="ghost"
//           onClick={onCopy}
//           className="h-7 w-7 p-0"
//         >
//           <Copy className="h-3.5 w-3.5" />
//         </Button>
//       </div>

//       <div className="px-4 py-3.5">
//         <code className="text-sm">{getCommand()}</code>
//       </div>
//     </div>
//   );
// }
