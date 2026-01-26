// "use client";
// import { Button } from "@/registry/nexus-elements/ui/button";
// import { ConnectKitButton } from "connectkit";
// import { truncateAddress } from "@avail-project/nexus-core";
// import { Loader2 } from "lucide-react";

// const ConnectWalletButton = () => {
//   return (
//     <ConnectKitButton.Custom>
//       {({ isConnected, isConnecting, show, address }) => {
//         return (
//           <Button variant={"outline"} size={"sm"} onClick={show}>
//             {isConnecting && <Loader2 className="size-5 animate-spin" />}
//             {isConnected ? truncateAddress(address ?? "", 4, 4) : "Connect"}
//           </Button>
//         );
//       }}
//     </ConnectKitButton.Custom>
//   );
// };

// export default ConnectWalletButton;
