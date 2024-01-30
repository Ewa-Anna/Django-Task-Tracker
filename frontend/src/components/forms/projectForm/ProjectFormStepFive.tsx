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
      console.log(error.response.data.title)
      showToast({ message: error.message, type: "ERROR" });
    },
    
  });

  const handleCreateProject = (formData) => {
    mutation.mutate(formData);
    console.log(formData)
  };


  const options = { year: 'numeric', month: 'long', day: 'numeric' };


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
        <form 
        className="flex flex-col gap-9 w-full max-w-5xl min-h-[600px] max-h-[500px] justify-evenly"
        onSubmit={form.handleSubmit(()=>handleCreateProject(state))}>
          <div className=" h-full flex flex-col gap-2 ">

  {/* Start */}
<div className="border-2 rounded-md  border-dark-4 px-5 py-4">
<div className="flex justify-between">
  <div>
Step 1
  </div>
  <div>
<Button>Edit</Button>
</div>
</div>
<p>Visibility</p>
<p>{state.visibility}</p>
</div>


<div className="border-2 border-dark-4  rounded-md  px-5 py-4 ">
<div className="flex justify-between items-center">
 <span>Step 2</span>
<Button className="hover:bg-violet-900" variant={"ghost"}>Edit</Button>
</div>
<div className="flex flex-col">
<div className="flex flex-wrap">
<div className="flex-1">
  <p>Title</p>
{state.title}
</div>
<div className="flex-1">
<p>Description</p>
{state.description}
</div>
</div>
<div className="flex flex-wrap">
<div className="flex-1">
  <p>Leader</p>
{state.owner}
</div>
<div className="flex-1">
<p>Deadline</p>
<p>{state.deadline&& state.deadline.toLocaleString('en-EN', options)}</p>
</div>
</div>
</div>






</div>
          </div>
          <div className="flex justify-end border-2 flex-1">
            <Button
              type="button"
              onClick={() => {
                setCurrentStep((prev) => prev - 1);
              }}
              className={cn(" whitespace-nowrap hover:bg-slate-800", {
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
