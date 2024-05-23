/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import BaseLogo from "../../Logos/base";
import EthereumLogo from "../../Logos/ethereum";
import OpLogo from "../../Logos/op";
import ZoraLogo from "../../Logos/zora";
import LyraLogo from "../../Logos/lyra";
import LiskLogo from "../../Logos/lisk";
import ModeLogo from "../../Logos/mode";
import OrderlyLogo from "../../Logos/orderly";
import PGNLogo from "../../Logos/pgn";
import FrameChainLogo from "../../Logos/framechain";
import FraxtalLogo from "../../Logos/fraxtal";
import DegenChainLogo from "../../Logos/degenchain";
import StackLogo from "../../Logos/stack";
import GoldLogo from "../../Logos/gold";
import CyberLogo from "../../Logos/cyber";

import GoerliLogo from "../../../public/logos/goerli.png";
import SepoliaLogo from "../../../public/logos/sepolia.png";
import HoleskyLogo from "../../../public/logos/holesky.png";

import styles from "./styles.module.css";

const LOGO_COMPONENTS: any = {
  [CHAINS.Ethereum]: EthereumLogo,
  [CHAINS.EthereumGoerli]: EthereumLogo,
  [CHAINS.EthereumSepolia]: EthereumLogo,
  [CHAINS.Optimism]: OpLogo,
  [CHAINS.OptimismGoerli]: OpLogo,
  [CHAINS.OptimismSepolia]: OpLogo,
  [CHAINS.Base]: BaseLogo,
  [CHAINS.BaseGoerli]: BaseLogo,
  [CHAINS.BaseSepolia]: BaseLogo,
  [CHAINS.Zora]: ZoraLogo,
  [CHAINS.ZoraGoerli]: ZoraLogo,
  [CHAINS.ZoraSepolia]: ZoraLogo,
  [CHAINS.LyraSepolia]: LyraLogo,
  [CHAINS.LiskSepolia]: LiskLogo,
  [CHAINS.Mode]: ModeLogo,
  [CHAINS.ModeSepolia]: ModeLogo,
  [CHAINS.Orderly]: OrderlyLogo,
  [CHAINS.OrderlySepolia]: OrderlyLogo,
  [CHAINS.PGN]: PGNLogo,
  [CHAINS.PGNSepolia]: PGNLogo,
  [CHAINS.FrameChain]: FrameChainLogo,
  [CHAINS.Fraxtal]: FraxtalLogo,
  [CHAINS.FraxtalHolesky]: FraxtalLogo,
  [CHAINS.Degen]: DegenChainLogo,
  [CHAINS.Stack]: StackLogo,
  [CHAINS.Gold]: GoldLogo,
  [CHAINS.Cyber]: CyberLogo,
};

import { useMemo } from "react";
import {
  CHAINS,
  HOLESKY_CHAIN_IDS,
  MAINNET_CHAIN_IDS,
  SEPOLIA_CHAIN_IDS,
} from "@/app/chains";

export default function ChainLogo({
  chainId = undefined,
  size = 24,
  marginRight = 0,
  rounded = true,
}: {
  chainId?: number | undefined;
  size?: number;
  marginRight?: number;
  rounded?: boolean;
}) {
  if (!chainId) return null;

  const isSepolia = SEPOLIA_CHAIN_IDS.includes(chainId);
  const isHolesky = HOLESKY_CHAIN_IDS.includes(chainId);
  const isMainnet = MAINNET_CHAIN_IDS.includes(chainId);

  const ChainLogo = LOGO_COMPONENTS[chainId] ? LOGO_COMPONENTS[chainId] : null;
  const TestnetLogo = isSepolia
    ? SepoliaLogo
    : isHolesky
    ? HoleskyLogo
    : GoerliLogo;

  if (!ChainLogo) return null;

  const ChainLogoStyle = {
    width: `${size}px`,
    height: `${size}px`,
    marginRight: `${marginRight}px`,
    borderRadius: rounded ? "50%" : `${size / 4}px`,
  };

  const testnetSize = size * 0.5;
  const testnetOffset = testnetSize * 0.25;
  const TestnetChainLogoStyle = useMemo(
    () => ({
      width: `${size + testnetOffset}px`,
      height: `${size + testnetOffset}px`,
      marginRight: -testnetOffset,
      marginBottom: -testnetOffset,
    }),
    [size, testnetOffset]
  );
  const TestnetLogoStyle = useMemo(
    () => ({
      width: `${testnetSize}px`,
      height: `${testnetSize}px`,
      bottom: 0,
      right: 0,
    }),
    [testnetSize]
  );

  return isMainnet ? (
    <div className={styles.ChainLogo} style={ChainLogoStyle}>
      <ChainLogo width={size} height={size} />
    </div>
  ) : (
    <div className="relative" style={TestnetChainLogoStyle}>
      <div className={styles.ChainLogo} style={ChainLogoStyle}>
        <ChainLogo width={size} height={size} />
      </div>

      <img
        src={TestnetLogo.src}
        style={TestnetLogoStyle}
        className="absolute outline outline-[2px] outline-solid outline-offset-0 outline-white rounded-full"
        alt=""
      />
    </div>
  );
}
