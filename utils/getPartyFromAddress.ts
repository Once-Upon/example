import { getRelevantPartyByChainPriority } from "./getRelevantPartyByChainPriority";
import { shortAddress } from "./shortAddress";

export function getPartyForAddress(address: string, parties: any) {
  address = address?.toLowerCase();

  if (!parties) {
    return shortAddress(address);
  }

  const partyOnAllChains = parties[address];
  const party = getRelevantPartyByChainPriority(partyOnAllChains);
  return party;
}
