"use client";
import Link from "next/link";
import { Button } from "@repo/ui/index";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserAccountDropDown from "./UseAccountDropDown";
import Image from "next/image";

export const Header = () => {
  const { status, data } = useSession();
  const router = useRouter();

  return (
    <nav className="mx-auto wrapper top-0 z-50 flex items-center gap-2 py-6 w-full">
      <div className="flex w-[90vw] justify-between mx-auto shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-600 p-3 rounded-2xl md:w-[50vw]">
        <Link href={"/"} className="flex items-center gap-4 cursor-pointer">
          <Image
            crossOrigin="anonymous"
            src={"/icon.svg"}
            width={40}
            height={40}
            alt="logo"
            style={{ transform: "rotate(35deg)" }}
            className="rounded-full"
          />
        </Link>

        <div className="flex items-center gap-4">
          {status === "unauthenticated" ? (
            <Button
              size="lg"
              variant={"default"}
              className="p-2 bg-yellow-700 text-white rounded-xl cursor-pointer text-md"
              onClick={async () => {
                await signIn();
                router.push("/");
              }}
            >
              Login
            </Button>
          ) : (
            <UserAccountDropDown />
          )}
        </div>
      </div>
    </nav>
  );
};
