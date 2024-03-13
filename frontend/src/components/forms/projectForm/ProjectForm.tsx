import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { GiConfirmed } from "react-icons/gi";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { ProjectValidationSchema } from "@/lib/validation";
import {
  Route,
  BrowserRouter as Router,
  useNavigate,
  Routes,
} from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMutation } from "react-query";
import { createProject } from "@/features/project-api/project-api";
import { useAuthContext } from "@/contexts/AuthContext";
import Stepper from "../../ui/Stepper";
import ProjectFormStepTwo from "./ProjectFormStepTwo";
import ProjectFormStepOne from "./ProjectFormStepOne";
import ProjectFormStepThree from "./ProjectFormStepThree";
import ProjectFormStepFour from "./ProjectFormStepFour";
import ProjectFormStepFive from "./ProjectFormStepFive";
import { ProjectFormProvider } from "@/contexts/formContext";

type ProjectFormProps = {
  
  title: string;
  description: string;
  file: string[];
  tags: string[];
};

const ProjectForm = ({
  tags,
  project,
  users,
  visibilityOptions,
}: ProjectFormProps) => {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const [formState, setFormState] = useState({
    visibility: "",
  });

  const steps = [
    { id: "step_1", name: "Project Type", fields: ["visibility"] },
    {
      id: "step_2",
      name: "General Info",
      fields: ["title", "description", "owner", "deadline"],
    },

    { id: "step_3", name: "Assignees", fields: ["assignees"] },
    {id:"step_4",name:"Summary"}
  ];
  const [selectedUsersLeft, setSelectedUsersLeft] = useState([]);
  const [selectedUsersRight, setSelectedUsersRight] = useState([]);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { showToast } = useAuthContext();
  const navigate = useNavigate();

  const {
    formState: { errors },
  } = useForm();

  // 1. Define your form.
  // const form = useForm<z.infer<typeof ProjectValidationSchema>>({
  //   resolver: zodResolver(ProjectValidationSchema),
  //   defaultValues: {
  //     title: project ? project.title : "",
  //     description: project ? project.description : "",
  //     file: project ? project.file : [],
  //     tags: project && Array.isArray(project.tags) ? project.tags : [],
  //     owner: project ? project.owner : "",
  //     visibility: project ? project.visibility : "",
  //     deadline: project ? project.deadline : "",
  //     assignees: project ? project.assignees : [],
  //   },
  // });

  // // 2. Define a submit handler.
  // function onSubmit(values: z.infer<typeof ProjectValidationSchema>) {
  //   // mutation.mutate(values);
  // }
  // type Inputs = z.infer<typeof ProjectValidationSchema>;
  // type FieldName = keyof Inputs;

  // const processForm: SubmitHandler<Inputs> = (data) => {
  //   mutation.mutate(data);
  // };

  // const handleNextStep = async () => {
  //   const fields = steps[currentStep].fields;

  //   console.log(fields);
  //   const output = await form.trigger(fields as FieldName[], {
  //     shouldFocus: true,
  //   });

  //   console.log(output);
  //   if (!output) return;

  //   if (currentStep < steps.length - 1) {
  //     if (currentStep === steps.length - 2) {
  //       await form.handleSubmit(processForm)();
  //     }
  //     setPreviousStep(currentStep);
  //     setCurrentStep((step) => step + 1);
  //   }
  // };

  // const handlePrevtStep = () => {
  //   if (currentStep > 0) {
  //     setPreviousStep(currentStep);
  //     setCurrentStep((step) => step - 1);
  //   }
  // };

  return (
    <ProjectFormProvider>
      <>
      <Stepper steps={steps} currentStep={currentStep}/>
        <ProjectFormStepOne
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          visibilityOptions={visibilityOptions && visibilityOptions}
        />
   
        <ProjectFormStepTwo
         tags={tags}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          users={users && users}
        />


        <ProjectFormStepFour
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          users={users && users}
          setSelectedUsersLeft={setSelectedUsersLeft}
          selectedUsersLeft={selectedUsersLeft}
          selectedUsersRight={selectedUsersRight}
          setSelectedUsersRight={setSelectedUsersRight}
        />
        <ProjectFormStepFive
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />

      </>
    </ProjectFormProvider>
  );
};

export default ProjectForm;
