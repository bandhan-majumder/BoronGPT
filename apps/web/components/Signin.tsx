"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/index";
import Image from "next/image";
import Link from "next/link";

const Signin = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center space-y-4">
         <Link href={"/"} className="flex items-center justify-center text-center">
          <Image
            src={"/icon.svg"}
            width={60}
            height={60}
            alt="logo"
            className="rounded-full"
          />
        </Link>

          <div className="space-y-2">
            <CardTitle className="text-2xl text-gray-200">Welcome to</CardTitle>
            <div className="text-3xl font-bold text-[#FEFCE8]">BoronGPT</div>
          </div>

          <CardDescription className="text-gray-400">
            Prompt. Edit. Ship. Faster than you can imagine.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <button
            onClick={async () => {
              await signIn("google");
              router.push("/");
            }}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-md transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              className="w-5 h-5"
            >
              <path
                fill="#4285F4"
                d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              By continuing, you agree to our{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;