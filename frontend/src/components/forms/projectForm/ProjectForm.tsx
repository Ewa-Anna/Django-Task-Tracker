import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "../../ui/textarea";
import FileUploader from "../../ui/shared/FileUploader";
import { ProjectValidationSchema } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Divide } from "lucide-react";
import { DatePicker } from "../../ui/shared/DatePicker";
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

const ProjectForm = ({ project, users,visibilityOptions }: ProjectFormProps) => {
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
  const { watch } = useForm();
  const selectedStack = watch("stack");

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
      tags: project ? project.tags : "",
      leader: project ? project.leader : "",
      visibility: project ? project.visibility : "",
      deadline: project ? project.deadline : "",
      contributors: project ? project.contributors : [],
      stack: project ? project.stac : "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ProjectValidationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
console.log(values)
console.log('Submitting form...', values);
    mutation.mutate(values);
  }

  return (
    <>
      <Stepper steps={steps} formStep={formStep} setFormStep={setFormStep} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-9 w-full max-w-5xl"
        >
          <ProjectFormStepOne formStep={formStep} form={form} visibilityOptions={visibilityOptions&&visibilityOptions} />

          {/* STEP 2  */}
          <ProjectFormStepTwo formStep={formStep} form={form} users={users&&users} visibilityOptions={visibilityOptions&&visibilityOptions}/>

          {/* STEP 3  */}
          <ProjectFormStepThree formStep={formStep} form={form} project ={project}  />

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

          {/* STEP 5  */}

          {/* <ProjectFormStepFive form={form} formStep={formStep} project={project} users={users}/> */}

          {/* Summary Step */}
      <ProjectFormStepFive form={form} formStep={formStep}/>

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
              // type="submit"
              className={cn(" whitespace-nowrap ", {
                hidden: formStep === 1,
              })}
              onClick={() => setFormStep((prev) => prev - 1)}
            >
              <ArrowLeft />
              Go back
            </Button>
            <Button
              // shad-button_primary
              type="submit"
           
              className={cn(" whitespace-nowrap ", {
                hidden:
                  formStep === 1 ||
                  formStep === 2 ||
                  formStep === 3 ||
                  formStep === 4
                  
              })}
            >
              Create
            </Button>
            <Button
              className={cn(" whitespace-nowrap ", {
                hidden:
                  formStep === 1 ||
                  formStep === 3 ||
                  formStep === 4 ||
                  formStep === 5 ||
                  formStep === 6,
              })}
              variant="ghost"
              onClick={() => {
                form.trigger([
                  "title",
                  "description",
                  "leader",
                  "visibility",
                  "tags",
                ]);
                const titleState = form.getFieldState("title");
                const descriptionState = form.getFieldState("description");
                const leaderState = form.getFieldState("leader");
                const visibilityState = form.getFieldState("visibility");
                // const tagsState = form.getFieldState("tags");

                if (!titleState.isDirty || titleState.invalid) return;
                if (!descriptionState.isDirty || descriptionState.invalid)
                  return;
                if(!leaderState.isDirty || leaderState.invalid)return;
                // if(!visibilityState.isDirty || visibilityState.invalid)return;
                // if (!tagsState.isDirty || tagsState.invalid) return;
                setFormStep((prev) => prev + 1);
              }}
            >
              {/* Go to step 3 */} Next Step
              <ArrowRight className="w-4 h-4 ml-2 " />
            </Button>
            <Button
              className={cn(" whitespace-nowrap ", {
                hidden:
                  formStep === 2 ||
                  formStep === 3 ||
                  formStep === 4 ||
                  formStep === 5 ||
                  formStep === 6,
              })}
              variant="ghost"
              onClick={() => {
                form.trigger([
                  "title",
                  "description",
                  "leader",
                  "visibility",
                  "tags",
                ]);

                const leaderState = form.getFieldState("leader");
                const visibilityState = form.getFieldState("visibility");
                const stackState = form.getFieldState("stack");
               

                if (!visibilityState.isDirty || visibilityState.invalid) return;

                setFormStep((prev) => prev + 1);
              }}
            >
              {/* Go to step 2 */} Next Step<ArrowRight className="w-4 h-4 ml-2 " />
            </Button>

            <Button
              className={cn(" whitespace-nowrap ", {
                hidden:
                  formStep === 1 ||
                  formStep === 2 ||
                  formStep === 4 ||
                  formStep === 5 ||
                  formStep === 6,
              })}
              variant="ghost"
              onClick={() => {
                form.trigger([
                  "title",
                  "description",
                  "leader",
                  "visibility",
                  "tags",
                ]);

                const leaderState = form.getFieldState("leader");
                const visibilityState = form.getFieldState("visibility");

                // if(!stackState.isDirty|| stackState.invalid)return
                // if (!leaderState.isDirty || leaderState.invalid) return;
                // if (!visibilityState.isDirty || visibilityState.invalid) return;

                setFormStep((prev) => prev + 1);
              }}
            >
            {/* Go to step 4 */} Next Step <ArrowRight className="w-4 h-4 ml-2 " />
            </Button>
            <Button
              className={cn(" whitespace-nowrap ", {
                hidden:
                  formStep === 1 ||
                  formStep === 2 ||
                  formStep === 3 ||
                  formStep === 5 ||
                  formStep === 6,
              })}
              variant="ghost"
              onClick={() => {
                form.trigger([
                  "title",
                  "description",
                  "leader",
                  "visibility",
                  "tags",
                ]);

                const leaderState = form.getFieldState("leader");
                const visibilityState = form.getFieldState("visibility");

                setFormStep((prev) => prev + 1);
              }}
            >
             {/* Go to step 5 */} Next Step<ArrowRight className="w-4 h-4 ml-2 " />
            </Button>
            
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProjectForm;
