import { useState } from "react";
import { Button } from "./button";
import { TiTick } from "react-icons/ti";

const Stepper = ({steps,currentStep,}) => {


  const [complete,setComplete]=useState(false);

  return (
    <>
      <div className="flex justify-between  mb-8">
        {steps.map((step, i) => {
          return (
            <div
              key={i}
              className={`step-item  
              ${ currentStep === i  && "active"}
                ${(i<currentStep ||complete)&& 'complete'}
                `}
            >
              <div className="step">{
               (i<currentStep|| complete) ?<TiTick size ={24}/>: i+1 } 
              </div>
              <p className="text-sm text-gray-500">{step.name}</p>
            </div>
          );
        })}
      </div>
  
    
    </>
  );
};

export default Stepper;
