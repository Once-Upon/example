export enum CHAINS {
  All = 0,
  Ethereum = 1,
  Optimism = 10,
  Base = 8453,
  Zora = 7777777,
  PGN = 424,
  EthereumSepolia = 11155111,
  OptimismSepolia = 11155420,
  BaseSepolia = 84532,
  ZoraSepolia = 999999999,
  LyraSepolia = 901,
  LiskSepolia = 4202,
  Mode = 34443,
  ModeSepolia = 919,
  Orderly = 291,
  OrderlySepolia = 4460,
  PGNSepolia = 58008,
  EthereumGoerli = 5,
  OptimismGoerli = 420,
  BaseGoerli = 84531,
  ZoraGoerli = 999,
  FrameChain = 5101,
  Fraxtal = 252,
  FraxtalHolesky = 2522,
  Degen = 666666666,
  Stack = 78225,
  Gold = 4653,
  Cyber = 7560,
}

export const CHAIN_IDS: number[] = Object.values(CHAINS).filter(
  (x) => !isNaN(x as any) && x
) as any;

export const ALL_CHAIN_IDS = [CHAINS.All];

export const MAINNET_L1_CHAIN_IDS = [CHAINS.Ethereum];

export const MAINNET_L2_CHAIN_IDS = [
  CHAINS.Optimism,
  CHAINS.Base,
  CHAINS.Zora,
  CHAINS.PGN,
  CHAINS.Mode,
  CHAINS.Fraxtal,
  CHAINS.Orderly,
  CHAINS.Cyber,
];

export const MAINNET_L3_CHAIN_IDS = [
  CHAINS.Degen,
  CHAINS.FrameChain,
  CHAINS.Stack,
  CHAINS.Gold,
];

export const MAINNET_L1_AND_L2_CHAIN_IDS = [
  ...MAINNET_L1_CHAIN_IDS,
  ...MAINNET_L2_CHAIN_IDS,
];

export const MAINNET_CHAIN_IDS = [
  ...MAINNET_L1_CHAIN_IDS,
  ...MAINNET_L2_CHAIN_IDS,
  ...MAINNET_L3_CHAIN_IDS,
];

export const SEPOLIA_CHAIN_IDS = [
  CHAINS.EthereumSepolia,
  CHAINS.OptimismSepolia,
  CHAINS.BaseSepolia,
  CHAINS.ZoraSepolia,
  CHAINS.PGNSepolia,
  CHAINS.LyraSepolia,
  CHAINS.LiskSepolia,
  CHAINS.ModeSepolia,
  CHAINS.OrderlySepolia,
];

export const HOLESKY_CHAIN_IDS = [CHAINS.FraxtalHolesky];

export const GOERLI_CHAIN_IDS = [
  CHAINS.EthereumGoerli,
  CHAINS.OptimismGoerli,
  CHAINS.BaseGoerli,
  CHAINS.ZoraGoerli,
];

export const orderedChainIds = [
  CHAINS.All,
  ...MAINNET_CHAIN_IDS,
  ...SEPOLIA_CHAIN_IDS,
  ...HOLESKY_CHAIN_IDS,
  ...GOERLI_CHAIN_IDS,
];
export const allChainIds = [
  ...MAINNET_CHAIN_IDS,
  ...SEPOLIA_CHAIN_IDS,
  ...HOLESKY_CHAIN_IDS,
  ...GOERLI_CHAIN_IDS,
];
export const allTestnetChainIds = [
  ...SEPOLIA_CHAIN_IDS,
  ...HOLESKY_CHAIN_IDS,
  ...GOERLI_CHAIN_IDS,
];

export const CHAIN_NAMES: any = {
  [CHAINS.Ethereum]: "Ethereum",
  [CHAINS.EthereumGoerli]: "Ethereum Goerli",
  [CHAINS.EthereumSepolia]: "Ethereum Sepolia",
  [CHAINS.Optimism]: "Optimism",
  [CHAINS.OptimismGoerli]: "Optimism Goerli",
  [CHAINS.OptimismSepolia]: "Optimism Sepolia",
  [CHAINS.Base]: "Base",
  [CHAINS.BaseGoerli]: "Base Goerli",
  [CHAINS.BaseSepolia]: "Base Sepolia",
  [CHAINS.Zora]: "Zora",
  [CHAINS.ZoraGoerli]: "Zora Goerli",
  [CHAINS.ZoraSepolia]: "Zora Sepolia",
  [CHAINS.LyraSepolia]: "Lyra Sepolia",
  [CHAINS.LiskSepolia]: "Lisk Sepolia",
  [CHAINS.Mode]: "Mode",
  [CHAINS.ModeSepolia]: "Mode Sepolia",
  [CHAINS.Orderly]: "Orderly",
  [CHAINS.OrderlySepolia]: "Orderly Sepolia",
  [CHAINS.PGN]: "PGN",
  [CHAINS.PGNSepolia]: "PGN Sepolia",
  [CHAINS.FrameChain]: "Frame",
  [CHAINS.Degen]: "Degen",
  [CHAINS.Fraxtal]: "Fraxtal",
  [CHAINS.FraxtalHolesky]: "Fraxtal Holesky",
  [CHAINS.Stack]: "Stack",
  [CHAINS.Gold]: "Gold",
  [CHAINS.Cyber]: "Cyber",
};

// Determine which chains are related to each other on chain homepages (see getRelatedChains.ts)
export const relatedChains = [
  [CHAINS.Ethereum, CHAINS.EthereumGoerli, CHAINS.EthereumSepolia],
  [CHAINS.Optimism, CHAINS.OptimismGoerli, CHAINS.OptimismSepolia],
  [CHAINS.Base, CHAINS.BaseGoerli, CHAINS.BaseSepolia],
  [CHAINS.Zora, CHAINS.ZoraGoerli, CHAINS.ZoraSepolia],
  [CHAINS.PGN, CHAINS.PGNSepolia],
  [CHAINS.Mode, CHAINS.ModeSepolia],
  [CHAINS.Orderly, CHAINS.OrderlySepolia],
  [CHAINS.Fraxtal, CHAINS.FraxtalHolesky],
  [CHAINS.Degen],
  [CHAINS.Stack],
  [CHAINS.Gold],
  [CHAINS.LyraSepolia],
  [CHAINS.LiskSepolia],
  [CHAINS.FrameChain],
  [CHAINS.Cyber],
];

const URL_CHAIN_MAP: { [key: string]: string } = {};

Object.entries(CHAIN_NAMES).forEach(([key, value]: any) => {
  // Convert the chain name to a URL-friendly format:
  // 1. Replace spaces with hyphens to handle URLs typically using hyphens instead of spaces
  // 2. Convert to lowercase to ensure uniformity and avoid case sensitivity issues in URLs
  const urlFriendlyName = value.replace(/ /g, "-").toLowerCase();

  // Map the URL-friendly chain name to the corresponding chain ID in the URL_CHAIN_MAP
  URL_CHAIN_MAP[urlFriendlyName] = key;
});

// Export the URL_CHAIN_MAP so it can be used elsewhere in the application
export const CHAIN_URL_MAP = URL_CHAIN_MAP;

// TODO: Get these for multichain from an API resource
export const GWEI_DECIMALS = 9;
export const GWEI_UNITS = "gwei";
export const ETH_DECIMALS = 18;
export const ETH_UNITS = "ETH";
export const DEGEN_UNITS = "DEGEN";

export const getNativeCurrency = (chainId: CHAINS) => {
  if (chainId === CHAINS.Degen) return DEGEN_UNITS;
  else return ETH_UNITS;
};

export const BLOCK_EXPLORER_NAMES = {
  [CHAINS.Ethereum]: "Etherscan",
  [CHAINS.EthereumGoerli]: "Etherscan",
  [CHAINS.EthereumSepolia]: "Etherscan",
  [CHAINS.Optimism]: "Optimistic Etherscan",
  [CHAINS.OptimismGoerli]: "Optimistic Etherscan",
  [CHAINS.OptimismSepolia]: "Optimistic Etherscan",
  [CHAINS.Base]: "Basescan",
  [CHAINS.BaseGoerli]: "Basescan",
  [CHAINS.Zora]: "Zora Blockscout",
  [CHAINS.FrameChain]: "Frame Blockscout",
  [CHAINS.Degen]: "Degen Blockscout",
  [CHAINS.Fraxtal]: "Fraxscan",
  [CHAINS.Gold]: "Gold Blockscout",
  [CHAINS.Stack]: "Stack Blockscout",
};

export enum BLOCK_EXPLORER_PLATFORMS {
  Etherscan = "etherscan",
  Blockscout = "blockscout",
}
export const BLOCK_EXPLORER_PLATFORM_MAP = {
  [CHAINS.Ethereum]: BLOCK_EXPLORER_PLATFORMS.Etherscan,
  [CHAINS.EthereumGoerli]: BLOCK_EXPLORER_PLATFORMS.Etherscan,
  [CHAINS.EthereumSepolia]: BLOCK_EXPLORER_PLATFORMS.Etherscan,
  [CHAINS.Optimism]: BLOCK_EXPLORER_PLATFORMS.Etherscan,
  [CHAINS.OptimismGoerli]: BLOCK_EXPLORER_PLATFORMS.Etherscan,
  [CHAINS.OptimismSepolia]: BLOCK_EXPLORER_PLATFORMS.Etherscan,
  [CHAINS.Base]: BLOCK_EXPLORER_PLATFORMS.Etherscan,
  [CHAINS.BaseGoerli]: BLOCK_EXPLORER_PLATFORMS.Etherscan,
  [CHAINS.Zora]: BLOCK_EXPLORER_PLATFORMS.Blockscout,
  [CHAINS.FrameChain]: BLOCK_EXPLORER_PLATFORMS.Blockscout,
  [CHAINS.Degen]: BLOCK_EXPLORER_PLATFORMS.Blockscout,
  [CHAINS.Fraxtal]: BLOCK_EXPLORER_PLATFORMS.Etherscan,
  [CHAINS.FraxtalHolesky]: BLOCK_EXPLORER_PLATFORMS.Etherscan,
  [CHAINS.Gold]: BLOCK_EXPLORER_PLATFORMS.Blockscout,
  [CHAINS.Stack]: BLOCK_EXPLORER_PLATFORMS.Blockscout,
};

// Note: No trailing slashes should be used below!
export const BLOCK_EXPLORER_HOSTNAMES = {
  [CHAINS.Ethereum]: "https://etherscan.io",
  [CHAINS.EthereumGoerli]: "https://goerli.etherscan.io",
  [CHAINS.EthereumSepolia]: "https://sepolia.etherscan.io",
  [CHAINS.Optimism]: "https://optimistic.etherscan.io",
  [CHAINS.OptimismGoerli]: "https://goerli-optimism.etherscan.io",
  [CHAINS.OptimismSepolia]: "https://sepolia-optimism.etherscan.io",
  [CHAINS.Base]: "https://basescan.org",
  [CHAINS.BaseGoerli]: "https://goerli.basescan.org",
  [CHAINS.Zora]: "https://explorer.zora.energy",
  [CHAINS.FrameChain]: "https://explorer-frame.syndicate.io",
  [CHAINS.Degen]: "https://explorer.degen.tips",
  [CHAINS.Fraxtal]: "https://fraxscan.com",
  [CHAINS.FraxtalHolesky]: "https://holesky.fraxscan.com",
  [CHAINS.Gold]: "https://explorer.gold.dev",
  [CHAINS.Stack]: "https://explorer.stack.so",
};
