import { CHAINS } from "./chains";

export const ETH_UNITS = "ETH";
export const DEGEN_UNITS = "DEGEN";

export const getNativeCurrency = (chainId: CHAINS) => {
  if (chainId === CHAINS.Degen) return DEGEN_UNITS;
  else return ETH_UNITS;
};
