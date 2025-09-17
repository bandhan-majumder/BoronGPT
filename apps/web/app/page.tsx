import { Suspense } from "react";
import BoronGPTLanding from "../components/screen/Landing";
import "./globals.css";
import Loading from "./loading";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if(!session) redirect("/auth");

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-[#191A1A] text-white relative overflow-hidden">
        <BoronGPTLanding />
      </div>
    </Suspense>
  );
}
