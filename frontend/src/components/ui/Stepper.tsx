import { useState } from "react";
import { Button } from "./button";
import { TiTick } from "react-icons/ti";

const Stepper = ({steps,formStep,setFormStep}) => {
//   const steps = ["Step1", "Step2", "Step3"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete,setComplete]=useState(false);

  return (
    <>
      <div className="flex justify-between w-1/2 mb-20">
        {steps.map((step, i) => {
          return (
            <div
              key={i}
              className={`step-item  
              ${ formStep === i+1  && "active"}
                ${(i+1<formStep ||complete)&& 'complete'}
                `}
            >
              <div className="step">{
               (i+1<formStep|| complete) ?<TiTick size ={24}/>: i+1 } 
              </div>
              <p className="text-gray-500">{step}</p>
            </div>
          );
        })}
      </div>
  
    
    </>
  );
};

export default Stepper;
