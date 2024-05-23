import { BigNumber, ethers } from "ethers";
import { commify, formatUnits } from "ethers/lib/utils";
import { CHAINS, orderedChainIds } from "./app/chains";
import { isAddress as isAddressViem } from "viem";
import web3 from "web3";

export function truncateMiddle(s: string) {
  if (s.length <= 10) return s;
  return `${s.substring(0, 5)}...${s.substring(s.length - 5, s.length)}`;
}
//////////////////////////////////////////////////////////////////////////////////////////
export const ETH_UNITS = "ETH";
export const DEGEN_UNITS = "DEGEN";

export const getNativeCurrency = (chainId: CHAINS) => {
  if (chainId === CHAINS.Degen) return DEGEN_UNITS;
  else return ETH_UNITS;
};
//////////////////////////////////////////////////////////////////////////////////////////
const MAX_BIG_NUM = BigNumber.from(2).pow(256).sub(1);
export function formatToken(_value: any, decimals = 18, limit = 3): string {
  try {
    const value = String(_value);
    if (MAX_BIG_NUM.toString() === value) return "ALL";
    return limitDecimals(
      commify(formatUnits(BigNumber.from(value), decimals)),
      limit
    );
  } catch (error) {
    console.log("formatToken ERROR", error);
    return "--";
  }
}
//////////////////////////////////////////////////////////////////////////////////////////
export function limitDecimals(numStr: string, limit = 3): string {
  if (numStr.indexOf(".") === -1) return numStr;
  const [whole, decimal] = numStr.split(".");
  if (whole === "0" && decimal === "0".repeat(decimal.length)) return "0";

  let fixed = limit;
  let shownDecimals = decimal.slice(0, fixed);
  while (whole === "0" && shownDecimals === "0".repeat(fixed)) {
    fixed += 1;
    shownDecimals = decimal.slice(0, fixed);
  }
  const r = limit ? `${whole}.${decimal.substring(0, fixed)}` : whole;
  return r;
}
//////////////////////////////////////////////////////////////////////////////////////////
export function getNameForAddress(address: string, tx: any): string {
  address = address?.toLowerCase();

  if (!tx || !tx.enrichedParties) {
    return shortAddress(address);
  }

  const parties = tx.enrichedParties;
  const partyOnAllChains = parties[address];
  const party = getRelevantPartyByChainPriority(partyOnAllChains);

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
//////////////////////////////////////////////////////////////////////////////////////////
export const getChainIdPriority = (chainId: number) =>
  orderedChainIds.indexOf(chainId);
//////////////////////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////////////////////////
export function shortAddress(address: string, previewChars = 3) {
  if (!address) return "";

  const isNFT = address.indexOf("-") > 0;
  const isAddress = isAddressPrimitive(address);
  if (isNFT) {
    return "#" + address.slice(address.indexOf("-") + 1);
  }
  if (isAddress) {
    const add = formatAddress(address);
    return previewChars
      ? `${add.substring(0, previewChars + 2)}...${add.substring(
          add.length - previewChars,
          add.length
        )}`
      : add;
  }
  return previewChars
    ? `${address.substring(0, previewChars + 3)}...${address.substring(
        address.length - (previewChars + 1),
        address.length
      )}`
    : address;
}
//////////////////////////////////////////////////////////////////////////////////////////
export const isAddressPrimitive = (address: string) => isAddressViem(address);
//////////////////////////////////////////////////////////////////////////////////////////
export function formatAddress(address: string) {
  try {
    return web3.utils.toChecksumAddress(address);
  } catch {
    return address;
  }
}
//////////////////////////////////////////////////////////////////////////////////////////
export const getBgColorByCategory = (category: string): string => {
  switch (category) {
    case "NFT":
      return "text-orange bg-orange-light";
    case "FUNGIBLE_TOKEN":
      return "text-green bg-green-light";
    case "CORE":
      return "text-blue bg-blue-light";
    case "IDENTITY":
      return "text-yellow bg-yellow-light";
    case "OTHER":
      return "text-gray-800 bg-gray-300";
    case "MULTICHAIN":
      return "text-red bg-red-light";
    case "DEV":
      return "text-brown bg-brown-light";
    case "UNKNOWN":
      return "text-gray-700 bg-gray-200";
    case "PROTOCOL_1":
      return "text-purple-100 bg-purple-800";
    case "PROTOCOL_2":
      return "text-purple-200 bg-purple-600";
    case "PROTOCOL_3":
      return "text-purple-600 bg-purple-300";
    case "PROTOCOL_4":
      return "text-purple-600 bg-purple-200";
    case "PROTOCOL_5":
      return "text-purple-800 bg-purple-100";
    default:
      return "text-gray-700 bg-gray-200";
  }
};