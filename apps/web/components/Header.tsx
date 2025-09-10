import { Button } from "@repo/ui/index";
import Image from "next/image";

export const Header = () => {
  return (
    <nav className="relative z-10 flex items-center justify-between p-6">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-glow font-mono">
          <a href="/">
            <Image
              src={"/icon.svg"}
              width={40}
              height={40}
              alt="a"
              className="rounded-xl"
              style={{ transform: "rotate(15deg)" }}
            /></a>
        </span>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        <a href="/about" className="text-gray-300 hover:text-amber-500 transition-colors">
          About
        </a>
        <a href="/pricing" className="text-gray-300 hover:text-amber-500 transition-colors">
          Pricing
        </a>
        <Button variant="outline" className="glow-effect bg-transparent border-gray-600 text-white hover:bg-gray-800">
          Login
        </Button>
      </div>
    </nav>
  );
};