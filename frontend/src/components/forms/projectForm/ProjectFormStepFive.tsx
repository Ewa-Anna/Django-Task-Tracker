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
      console.log(error.response.data.title);
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleCreateProject = (formData) => {
    const transformedFormData = {
      ...formData,
      assignees: state.assignees.map(({ id }) => {
        return id;
      }),
      tags: state.tags.map(({ id }) => {
        return id;
      }),
    };

    mutation.mutate(transformedFormData);
    console.log(transformedFormData);
  };

  console.log(state);
  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <div
      className={cn(
        "flex flex-col justify-around  gap-9 w-full mb-8  max-w-5xl flex-wrap h-full ",
        {
          hidden:
            currentStep === 0 ||
            currentStep === 1 ||
            currentStep === 2 ||
            currentStep === 0,
        }
      )}
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-9 w-full max-w-5xl  justify-evenly"
          onSubmit={form.handleSubmit(() => handleCreateProject(state))}
        >
          <div className=" h-full flex flex-col gap-2 ">
            {/* Start */}
            <div className="border-2 rounded-md  border-dark-4 px-5 py-4">
              <div className="flex justify-between">
                <div>
                  <span className="text-slate-500 font-semibold text-sm">Project Type</span>
                </div>

                <div>
                  <Button type="button" onClick={() => setCurrentStep(0)}>
                    Edit
                  </Button>
                </div>
              </div>
              <div className=" flex flex-wrap gap-5">
              <div className="flex flex-col w-full  break-all">
                  <span className="mb-3 text-sm">Visibility</span>
                  <p>{state.visibility}</p>
                </div>
              </div>
            </div>

            <div className="border-2 border-dark-4  rounded-md  px-5 py-4 ">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold text-sm">
                  General Info
                </span>
                <Button type="button" onClick={()=>setCurrentStep(1)} variant={"ghost"}>
                  Edit
                </Button>
              </div>

              <div className="flex flex-wrap gap-5">
                <div className="flex flex-col  break-all">
                  <span className="mb-3 text-sm">Title</span>
                  <p>{state.title}</p>
                </div>
                <div className="flex flex-col w-full  break-all">
                  <span className="mb-3 text-sm">Description</span>
                  <p>{state.description}</p>
                </div>

                <div className="flex flex-col w-full    break-all">
                  <span>Deadline</span>
                  <p>
                    {state.deadline &&
                      state.deadline.toLocaleString("en-EN", options)}
                  </p>
                </div>
                <div className="flex flex-col w-full    break-all">
                  <span>Leader</span>
                  <p>
                    {state.owner &&
                      state.owner}
                  </p>
                </div>
                <div className="flex flex-col w-full  break-all">
                  <span className="mb-3 text-sm">Tags</span>
                  <div className="flex gap-2 flex-wrap">
                    {state.tags &&
                      state.tags.map((tag)=>{
                        return(
                        <div className="text-sm text-slate-300 font-semibold px-2 rounded-[3px] bg-blue-600">
                        {  tag.name}
                        </div>
                        )
                      })}
                  </div>
                </div>
                <div className="flex flex-col   break-all">
                  <span className="mb-3 text-sm">Assignees</span>
                  <div className="flex gap-2 flex-wrap">
                    {state?.assignees &&
                      state?.assignees
                      .map((member)=>{
                        return(
                        <div className="text-sm text-slate-300 font-semibold px-2 rounded-[3px] bg-blue-600">
                        {  member.email}
                        </div>
                        )
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end flex-1 gap-3">
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
               Back
            </Button>
            <Button className="hover:bg-green-600" >
              Confirm
             
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectFormStepFive;
