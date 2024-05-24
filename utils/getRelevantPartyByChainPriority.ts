import { orderedChainIds } from "./chains";

export const getChainIdPriority = (chainId: number) =>
  orderedChainIds.indexOf(chainId);

export function getRelevantPartyByChainPriority(partyWithChains: any[]): any {
  if (!partyWithChains || partyWithChains.length === 0) {
    return null;
  }

  if (partyWithChains.length === 1) {
    return partyWithChains[0];
  } else {
    const parties = [...partyWithChains];
    parties.sort(
      (a, b) => getChainIdPriority(a.chainId) - getChainIdPriority(b.chainId)
    );
    return parties[0];
  }
}
