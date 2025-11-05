import React from "react";
import Image from "next/image";
import Background from "@/public/backj.png";
import Riskcard from "@/components/lower";

const homepage = () => {
  return (
    <div className=" bg-gray-200">
      <div>
        <div className="  px-4 py-28 flex ">
          <div className=" px-12">
            <div className="inline-flex  rounded-full bg-blue-50/80 ring-1 ring-blue-200 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              Early Detection Saves Lives
            </div>

            <div className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900">
              Predict Your Diabetes Risk
            </div>

            <div className="mt-5 max-w-3xl text-lg sm:text-xl leading-8 text-slate-600">
              Use our advanced AI model to assess your diabetes risk based on
              key health metrics. Get personalized recommendations for a
              healthier future.
            </div>
            <div className=" py-16 flex">
              <div>Instant Analysis</div>
              <div className="px-32">Private & Secure</div>
              <div className="px-20">Personalized Care</div>
            </div>
          </div>
          <Image src={Background} alt="" width={700} height={200} />
        </div>
        <div className="py-32">
          <Riskcard />
        </div>
      </div>
    </div>
  );
};

export default homepage;
