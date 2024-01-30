import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuthContext } from "@/contexts/AuthContext";
import { useAppState } from "@/contexts/formContext";
import { createProject } from "@/features/project-api/project-api";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const ProjectFormStepFive = ({ currentStep, setCurrentStep }) => {

  
  const [state, setState] = useAppState();
  const { showToast } = useAuthContext();
  const navigate = useNavigate();
  const form = useForm();
  const mutation = useMutation(createProject, {
    onSuccess: () => {
      // form.reset();

      showToast({
        message: "Project has been created",
        type: "SUCCESS",
      });
      setCurrentStep(0);
      navigate("/projects");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleCreateProject = (formData) => {
    mutation.mutate(formData);
    console.log(formData)
  };

  return (
    <div
      className={cn(
        "flex flex-col justify-around  gap-9 w-full min-h-[510px] max-h-[900px]   max-w-5xl flex-wrap h-full ",
        {
          hidden:
            currentStep === 0 ||
            currentStep === 1 ||
            currentStep === 2 ||
            currentStep === 3 ||
            currentStep === 0,
        }
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(()=>handleCreateProject(state))}>
          <div className="flex justify-end border-2">
            <Button
              type="button"
              onClick={() => {
                setCurrentStep((prev) => prev - 1);
              }}
              className={cn(" whitespace-nowrap  ", {
                hidden: currentStep === 0,
              })}
            >
              <ArrowLeft className="mr-1" />
              Go Back
            </Button>
            <Button className="shad-button_primary">
              Confirm
              <ArrowRight className="ml-1" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectFormStepFive;
