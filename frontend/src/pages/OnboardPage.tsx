import React from "react";
import OnboardingForm from "./forms/OnboardingForm";
import { images } from "../constants";

const OnboardPage: React.FC = () => {
  return (
    <div className="w-full mx-auto py-6 flex">
      <div className="w-1/2 flex flex-col  gap-28 bg-blue-200 py-10 ">
        <h1 className="mx-auto text-4xl font-bold text-white">BugbBard</h1>
        <img
          src={images.OnboardingImage}
          alt=""
          className="max-w-[600px] h-auto"
        />
      </div>
      <div className="w-1/2 py-8 px-12">
        <h2 className="text-center text-3xl text-slate-400 mb-10 ">
          Personal information
        </h2>
        <OnboardingForm />
      </div>
    </div>
  );
};

export default OnboardPage;
