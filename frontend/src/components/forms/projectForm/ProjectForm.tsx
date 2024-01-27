import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { GiConfirmed } from "react-icons/gi";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { ProjectValidationSchema } from "@/lib/validation";
import { useNavigate } from "react-router-dom";
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

type ProjectFormProps = {
  title: string;
  description: string;
  file: string[];
  tags: string[];
};

const ProjectForm = ({
  project,
  users,
  visibilityOptions,
}: ProjectFormProps) => {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  
  const steps = [
    { id: "step_1", name: "Project Type", fields: ["visibility"] },
    {
      id: "step_2",
      name: "General Info",
      fields: ["title", "description", "owner", "deadline"],
    },
    { id: "step_3", name: "Attachments", fields: ["file", "tags"] },
    { id: "step_4", name: "Assignees", fields: ["assignees"] },
    { id: "step_5", name: "Summary", fields: ["summary"] },
  ];
  const [selectedUsersLeft, setSelectedUsersLeft] = useState([]);
  const [selectedUsersRight, setSelectedUsersRight] = useState([]);
  const { showToast } = useAuthContext();
  const navigate = useNavigate();

  const {
    formState: { errors },
  } = useForm();

  const mutation = useMutation(createProject, {
    onSuccess: () => {
      showToast({
        message: "Project has been created",
        type: "SUCCESS",
      });
      navigate("/projects");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof ProjectValidationSchema>>({
    resolver: zodResolver(ProjectValidationSchema),
    defaultValues: {
      title: project ? project.title : "",
      description: project ? project.description : "",
      file: project ? project.file : [],
      tags: project && Array.isArray(project.tags) ? project.tags : [],
      owner: project ? project.owner : "",
      visibility: project ? project.visibility : "",
      deadline: project ? project.deadline : "",
      assignees: project ? project.assignees : [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ProjectValidationSchema>) {
    // mutation.mutate(values);
  }
  type Inputs = z.infer<typeof ProjectValidationSchema>;
  type FieldName = keyof Inputs;

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    form.reset();
  };

  const handleNextStep = async () => {
    const fields = steps[currentStep].fields;

    console.log(fields);
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    // console.log(fields)
    console.log(output);
    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 1) {
        await form.handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const handlePrevtStep = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <>
      <Stepper steps={steps} currentStep={currentStep}  />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-9 w-full max-w-5xl"
        >
          <ProjectFormStepOne
            form={form}
            currentStep={currentStep}
            visibilityOptions={visibilityOptions && visibilityOptions}
          />

          <ProjectFormStepTwo
            currentStep={currentStep}
            form={form}
            users={users && users}
            visibilityOptions={visibilityOptions && visibilityOptions}
          />
          <ProjectFormStepThree
            currentStep={currentStep}
            form={form}
            project={project}
          />
          <ProjectFormStepFour
            currentStep={currentStep}
            form={form}
            users={users}
            setSelectedUsersLeft={setSelectedUsersLeft}
            selectedUsersLeft={selectedUsersLeft}
            selectedUsersRight={selectedUsersRight}
            setSelectedUsersRight={setSelectedUsersRight}
          />
          <ProjectFormStepFive form={form} currentStep={currentStep} />
          <div className="flex  gap-4 items-center justify-end">
            <Button
              type="button"
              className="shad-button_dark_4"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              // shad-button_primary
              type="button"
              className={cn(" whitespace-nowrap ", {
                hidden: currentStep === 0,
              })}
              onClick={handlePrevtStep}
            >
              <ArrowLeft className="ml-1" />
              Go back
            </Button>
            <Button
              onClick={(e) => {
                handleNextStep();
              }}
            >
             {currentStep < 4 ? "Next Step" : "Confirm"} 
             {currentStep < 4 && <ArrowRight className="ml-1" />}
             {currentStep ===4 && <GiConfirmed  className="ml-1" />}
            </Button>
          </div>
        </form>
        {/* <pre>{JSON.stringify(form.watch(), null, 2)}</pre> */}
      </Form>
    </>
  );
};

export default ProjectForm;
