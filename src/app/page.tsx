import Category from "@/components/Category";
import CoverSwiper from "@/components/CoverSwiper";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="mt-1">
        <CoverSwiper />
      </div>
      <div className="text-center">
        <h1 className="font-bold text-3xl p-5"> Categories</h1>
        <Category />
      </div>
    </>
  );
}
