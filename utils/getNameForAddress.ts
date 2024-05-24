import { getPartyForAddress } from "./getPartyFromAddress";
import { shortAddress } from "./shortAddress";

export function getNameForAddress(address: string, parties: any): string {
  const party = getPartyForAddress(address, parties);

  if (!party) {
    return shortAddress(address);
  }

  if (party.tokenStandard === "erc20") {
    if (party.symbol) {
      return party.symbol;
    } else if (party.label && party.label.public) {
      return party.label.public;
    }
  } else {
    if (party.label && party.label.public) {
      return party.label.public;
    } else if (party.symbol) {
      return party.symbol;
    }
  }

  if (party.farcaster && party.farcaster.handle) {
    return `@${party.farcaster.handle}`;
  } else if (party.ensNew && party.ensNew.handle) {
    return party.ensNew.handle;
  } else {
    return shortAddress(address);
  }
}
