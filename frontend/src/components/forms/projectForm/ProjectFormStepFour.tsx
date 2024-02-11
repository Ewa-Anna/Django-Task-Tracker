import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppState } from "@/contexts/formContext";
import { cn } from "@/lib/utils";
import { ProjectStepFourValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";

const ProjectFormStepFour = ({
  currentStep,
  users,
  selectedUsersLeft,
  selectedUsersRight,
  setSelectedUsersLeft,
  setSelectedUsersRight,
  setCurrentStep,
}) => {



  const [state, setState] = useAppState();

  const form = useForm<z.infer<typeof ProjectStepFourValidation>>({
    resolver: zodResolver(ProjectStepFourValidation),
    defaultValues: {
      assignees: [],
    },
  });

  const processForm = (data) => {
    setState({ ...state, ...data });

    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div
      className={cn(" flex-col lg:flex-col w-4/4 ", {
        hidden:
          currentStep === 0 ||
          currentStep === 1 ||
          currentStep === 3
       
         
      })}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(processForm)}
          className=" w-full"
        >
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className=" flex flex-col">
                <FormLabel className="text-xl">Assign Members</FormLabel>

                <FormControl>
                  <div className="min-w-[60vw] min-h-[600px]   flex justify-between overflow-hidden flex-col md:min-w-[55wv] lg:flex-row lg:min-w-[55vw] ">
                    <div className="px-6 py-4 border-2 rounded-[5px] border-dark-4 flex flex-col justify-start  gap-10 min-h-[250px] min-w-[250px] flex-1 overflow-y-scroll custom-scrollbar ">
                      {users &&
                        users?.results
                          .filter((availableUser) => {
                            const alreadyAsignedIds = form
                              .getValues("assignees")
                              .map((assignedUser) => assignedUser.id);
                            return !alreadyAsignedIds.includes(
                              availableUser.id
                            );
                          })
                          .map((user) => {
                            return (
                              <div key={user} className="flex  ">
                                <label
                                  className="w-full cursor-pointer  flex items-center gap-3 hover:bg-dark-3 px-1 rounded-[2px]  "
                                  htmlFor={`checkbox-${user.id}`}
                                >
                                  <input
                                    id={`checkbox-${user.id}`}
                                    className="w-[18px] h-[18px]"
                                    type="checkbox"
                                    checked={selectedUsersLeft.some(
                                      (selectedUser) =>
                                        selectedUser.id === user.id
                                    )}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedUsersLeft([
                                          ...selectedUsersLeft,
                                          { id: user.id, email: user.email },
                                        ]);
                                      } else {
                                        setSelectedUsersLeft(
                                          selectedUsersLeft.filter(
                                            (user) => user.id !== user.id
                                          )
                                        );
                                      }
                                    }}
                                  ></input>
                                  <span> {user.email}</span>
                                </label>
                              </div>
                            );
                          })}
                    </div>

                    <div className="flex flex-col justify-center gap-1 items-center min-w-[100px]  ">
                      <ArrowRight
                        className={
                          selectedUsersLeft.length === 0
                            ? "text-slate-800 pointer-events-none"
                            : "text-light-1 cursor-pointer"
                        }
                        onClick={() => {
                          // console.log(form.getValues("contributors"));

                          form.setValue("assignees", [
                            ...form.getValues("assignees"),
                            ...selectedUsersLeft,
                          ]);
                          setSelectedUsersLeft([]);
                          console.log(
                            "assignees after update:",
                            form.getValues("assignees")
                          );
                        }}
                      />
                      <ArrowLeft
                        className={
                          selectedUsersRight.length === 0
                            ? "text-slate-800 pointer-events-none"
                            : "text-light-1 cursor-pointer"
                        }
                        onClick={() => {
                          const alreadyAsigned = form.getValues("assignees");
                          const selectedUserIds = selectedUsersRight.map(
                            (user) => user.id
                          );
                          const updatedAssignees = alreadyAsigned.filter(
                            (asignedUser) =>
                              !selectedUserIds.includes(asignedUser.id)
                          );
                          form.setValue("assignees", updatedAssignees);
                          setSelectedUsersRight([]);
                          console.log(
                            "assignees after update:",
                            form.getValues("assignees")
                          );
                        }}
                      />
                    </div>

                    <div className="px-6 py-4 border-2 border-dark-4 flex flex-col justify-start  gap-10 min-h-[250px] min-w-[250px] flex-1 overflow-y-scroll custom-scrollbar ">
                      {form.watch("assignees").map((contributor) => {
                        return (
                          <div key={contributor} className="flex ">
                            <label
                              className="w-full cursor-pointer  flex items-center gap-3 hover:bg-dark-3 px-1 rounded-[2px]  "
                              htmlFor={`checkbox-${contributor.id}`}
                            >
                              <input
                                id={`checkbox-${contributor.id}`}
                                className="w-[18px] h-[18px]"
                                type="checkbox"
                                checked={selectedUsersRight.some(
                                  (selectedUser) =>
                                    selectedUser.id === contributor.id
                                )}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedUsersRight([
                                      ...selectedUsersRight,
                                      {
                                        id: contributor.id,
                                        email: contributor.email,
                                      },
                                    ]);
                                  } else {
                                    setSelectedUsersRight(
                                      selectedUsersRight.filter(
                                        (user) => user.id !== contributor.id
                                      )
                                    );
                                  }
                                }}
                              ></input>
                              <span> {contributor.email}</span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="shad-form_message" >
                {form.formState.errors.assignees && (
            form.formState.errors.assignees.message
            )}
                  </FormMessage>
              </FormItem>
            )}
          />

          <div className=" flex justify-end mt-5">
            <Button
              type="button"
              onClick={() => {
                setCurrentStep((prev) => prev - 1);
              }}
              className={cn(" whitespace-nowrap hover:bg-slate-800  ", {
                hidden: currentStep === 0,
              })}
            >
              <ArrowLeft className="mr-1 " />
              Go Back
            </Button>
            <Button className="hover:bg-violet-600" variant="ghost">
              Next
              <ArrowRight className="ml-1" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectFormStepFour;
