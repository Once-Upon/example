import { getAddress, isAddress as isAddressViem } from "viem";

export function shortAddress(fullAddress: string): string {
  if (!fullAddress) return "";

  const isNFT = fullAddress.includes("-");
  if (isNFT) return `#${fullAddress.split("-")[1]}`;

  const isAddress = isAddressViem(fullAddress);
  if (isAddress) {
    const address = getAddress(fullAddress); // checksum address
    return `${address.substring(0, 5)}...${address.slice(-3)}`;
  }

  return `${fullAddress.substring(0, 6)}...${fullAddress.slice(-2)}`;
}
