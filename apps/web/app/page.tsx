import { Suspense } from "react";
import BoronGPTLanding from "../components/screen/Landing";
import "./globals.css";
import Loading from "./loading";

export default function LandingPage() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-[#191A1A] text-white relative overflow-hidden">
        <BoronGPTLanding />
      </div>
    </Suspense>
  );
}
