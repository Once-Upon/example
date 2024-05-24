import Image from "next/image";
import FarcasterIcon from "@/app/Logos/farcaster";
import { Github } from "lucide-react";

const Nav = () => {
  return (
    <div className="flex items-center justify-between">
      <Image
        height={30}
        width={30}
        src="/oulogo.svg"
        alt="Once Upon"
        priority
      />

      <div className="flex gap-4 items-center text-sm">
        <a
          className="hover:text-gray-700 transition duration-200"
          href="https://github.com/Once-Upon/example"
          target="_blank"
        >
          <Github size={18} strokeWidth={1.5} absoluteStrokeWidth />
        </a>

        <a
          className="hover:text-gray-700 transition duration-200"
          href="https://warpcast.com/~/channel/onceupon"
          target="_blank"
        >
          <FarcasterIcon size={18} strokeWidth={1} fill="currentColor" />
        </a>
      </div>
    </div>
  );
};

export default Nav;
