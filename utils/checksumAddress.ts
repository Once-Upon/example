import { getAddress } from "viem";

export const checksumAddress = (address: string): string => getAddress(address);
