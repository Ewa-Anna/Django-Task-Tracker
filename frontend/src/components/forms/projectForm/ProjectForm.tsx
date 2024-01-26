import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
  const [formStep, setFormStep] = useState(1);
  const steps = [
    "Visibility",
    "General info",
    "Attachments",
    "Members",
    "Summary",
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

  const handleNextStep = () => {
    form.trigger([
      "title",
      "description",
      "owner",
      "deadline",
      "assignees",
      "file",
      "tags",
    ]);

    if (formStep === 1) {
      const visibilityState = form.getFieldState("visibility");
      if (!visibilityState.isDirty || visibilityState.invalid) return;
    }

    if (formStep === 2) {
      const titleState = form.getFieldState("title");
      const descriptionState = form.getFieldState("description");
      const leaderState = form.getFieldState("owner");
      const deadlineState = form.getFieldState("deadline");
      if (!titleState.isDirty || titleState.invalid) return;
      if (!descriptionState.isDirty || descriptionState.invalid) return;
      if (!leaderState.isDirty || leaderState.invalid) return;
      if (!deadlineState.isDirty || deadlineState.invalid) return;
    }

    if (formStep === 4) {
      const asigneesState = form.getFieldState("assignees");
      if (!asigneesState.isDirty || asigneesState.invalid) return;
    }

    setFormStep((prev) => prev + 1);
  };

  return (
    <>
      <Stepper steps={steps} formStep={formStep} setFormStep={setFormStep} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-9 w-full max-w-5xl"
        >
          {/* <CSRFToken/> */}
          <ProjectFormStepOne
            form={form}
            formStep={formStep}
            visibilityOptions={visibilityOptions && visibilityOptions}
          />

          {/* STEP 2  */}
          <ProjectFormStepTwo
            formStep={formStep}
            form={form}
            users={users && users}
            visibilityOptions={visibilityOptions && visibilityOptions}
          />

          {/* STEP 3  */}
          <ProjectFormStepThree
            formStep={formStep}
            form={form}
            project={project}
          />

          {/* step 4  */}
          <ProjectFormStepFour
            formStep={formStep}
            form={form}
            users={users}
            setSelectedUsersLeft={setSelectedUsersLeft}
            selectedUsersLeft={selectedUsersLeft}
            selectedUsersRight={selectedUsersRight}
            setSelectedUsersRight={setSelectedUsersRight}
          />

          {/* Summary Step */}
          <ProjectFormStepFive form={form} formStep={formStep} />

          <div className="flex gap-4 items-center justify-end">
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
                hidden: formStep === 1,
              })}
              onClick={() => setFormStep((prev) => prev - 1)}
            >
              <ArrowLeft />
              Go back
            </Button>
            {/* <Button
              // shad-button_primary
              type="submit"
              className={cn(" whitespace-nowrap ", {
                hidden:
                  formStep === 1 ||
                  formStep === 2 ||
                  formStep === 3 ||
                  formStep === 4,
              })}
            >
              Create
            </Button> */}

            <Button
              className={cn("whitespace-nowrap", {
                hidden: formStep === 6,
              })}
              type={formStep === 5 ? "submit" : ""}
              variant="ghost"
              onClick={() => handleNextStep()}
            >
              {formStep === 5 ? "Create" : "Next step"}
              {formStep !== 5 && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProjectForm;
