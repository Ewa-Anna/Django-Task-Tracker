import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "../ui/textarea";
import FileUploader from "../ui/shared/FileUploader";
import { ProjectValidationSchema } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DatePicker } from "../ui/shared/DatePicker";
import { useMutation } from "react-query";
import { createProject } from "@/features/project-api/project-api";
import { useAuthContext } from "@/contexts/AuthContext";
import Stepper from "../ui/Stepper";

type ProjectFormProps = {
  title: string;
  description: string;
  file: string[];
  tags: string[];
};

const ProjectForm = ({ project, users }: ProjectFormProps) => {
  const [formStep, setFormStep] = useState(1);
  const steps = [
    "Basic Information",
    "Technology",
    "Frameworks & Libraries",
    "Members",
    "Attachments",
    "Summary",
  ];
  const [selectedUsersLeft, setSelectedUsersLeft] = useState([]);
  const [selectedUsersRight, setSelectedUsersRight] = useState([]);
  const { showToast } = useAuthContext();
  const navigate = useNavigate();

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
  console.log(`left:${selectedUsersLeft}`);
  console.log(`right:${selectedUsersRight}`);
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
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ProjectValidationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("abcdefg");
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
          <div
            className={cn("flex flex-col gap-9 w-full max-w-5xl", {
              hidden:
                formStep === 2 ||
                formStep === 3 ||
                formStep === 4 ||
                formStep === 5 ||
                formStep === 6,
            })}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">
                    Project Title
                  </FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>

                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">
                    Project overview
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="shad-textarea custom-scrollbar"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">
                    Add Tags (separated y comma " , "
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="JS, React, NextJS, Node"
                      type="text"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
          </div>

          {/* STEP 2  */}
          <div
            className={cn("flex flex-col gap-9 w-full max-w-5xl", {
              hidden:
                formStep === 1 ||
                formStep === 3 ||
                formStep === 4 ||
                formStep === 5 ||
                formStep === 6,
            })}
          >
            Select Main Stack
          </div>

          {/* STEP 3  */}
          <div
            className={cn("flex flex-col gap-9 w-full max-w-5xl", {
              hidden:
                formStep === 1 ||
                formStep === 2 ||
                formStep === 4 ||
                formStep === 5 ||
                formStep === 6,
            })}
          >
            Select technologies
          </div>

          {/* step 4  */}
          <div
            className={cn(
              "w-full min-h-[400px] max-h-[400px]  flex justify-between overflow-hidden",
              {
                hidden:
                  formStep === 1 ||
                  formStep === 2 ||
                  formStep === 3 ||
                  formStep === 5 ||
                  formStep === 6,
              }
            )}
          >
            <div className="px-8  border-2 flex flex-col justify-center  gap-10 min-w-[200px] flex-1 overflow-y-scroll custom-scrollbar">
              {users &&
                users?.results
                  .filter(
                    (availableUser) =>
                      !form.watch("contributors").includes(availableUser.email)
                  )
                  .map((user) => {
                    return (
                      <div className="flex items-start justify-between gap-5">
                        <div className="w-5 h-5">
                          <input
                            className="h-full w-full"
                            type="checkbox"
                            checked={selectedUsersLeft.includes(user.email)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsersLeft([
                                  ...selectedUsersLeft,
                                  user.email,
                                ]);
                              } else {
                                setSelectedUsersLeft(
                                  selectedUsersLeft.filter(
                                    (email) => email !== user.email
                                  )
                                );
                              }
                            }}
                          />
                        </div>

                        <div className="   w-full">{user?.email}</div>
                      </div>
                    );
                  })}
            </div>

            <div className="flex flex-col justify-between items-center min-w-[100px]">
              <ArrowRight
                className={
                  selectedUsersLeft.length === 0
                    ? "text-slate-800 pointer-events-none"
                    : "text-light-1"
                }
                onClick={() => {
                  console.log(form.getValues("contributors"));
                  console.log("ABCD");
                  form.setValue("contributors", [
                    ...form.getValues("contributors"),
                    ...selectedUsersLeft,
                  ]);
                  setSelectedUsersLeft([]);
                }}
              />
              <ArrowLeft
                className={
                  selectedUsersRight.length === 0
                    ? "text-slate-800 pointer-events-none"
                    : "text-light-1"
                }
                onClick={() => {
                  form.setValue(
                    "contributors",
                    form
                      .getValues("contributors")
                      .filter((email) => !selectedUsersRight.includes(email))
                  );
                  setSelectedUsersRight([]);
                  console.log(form.getValues("contributors"));
                }}
              />
            </div>

            <div className="px-8 border-2 flex flex-col gap-10 min-w-[200px] flex-1 overflow-y-scroll custom-scrollbar">
              {form.watch("contributors").map((contributor) => {
                return (
                  <div
                    key={contributor}
                    className="flex items-center   justify-between gap-5"
                  >
                    <div className="w-5 h-5">
                      <input
                        className="h-full w-full"
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsersRight([
                              ...selectedUsersRight,
                              contributor,
                            ]);
                          } else {
                            setSelectedUsersRight(
                              selectedUsersRight.filter(
                                (email) => email !== contributor
                              )
                            );
                          }
                        }}
                      />
                    </div>
                    <div className="border-2 min-w-full w-full">
                      {contributor}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 5  */}

          <div
            className={cn("flex flex-col gap-6", {
              hidden:
                formStep === 1 ||
                formStep === 2 ||
                formStep === 3 ||
                formStep === 4 ||
                formStep === 6,
            })}
          >
            <div className="flex gap-5 flex-wrap">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Visibility</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="shad-input">
                            <SelectValue placeholder="Select a project visibility" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem
                            className="cursor-pointer "
                            value={"public"}
                          >
                            Public
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer "
                            value={"private"}
                          >
                            Private
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage className="shad-form_message" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="leader"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Leader</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="shad-input">
                            <SelectValue placeholder="Select a project leader" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {users &&
                            users?.results.map((user) => {
                              return (
                                <SelectItem
                                  className="cursor-pointer "
                                  value={user.email}
                                >
                                  {user.email}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>

                      <FormMessage className="shad-form_message" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1 flex-col">
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Deadline</FormLabel>

                      <FormControl>
                        <DatePicker
                          onChange={(newDate) => field.onChange(newDate)}
                        />
                      </FormControl>

                      <FormMessage className="shad-form_message" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Add files</FormLabel>
                  <FormControl>
                    <FileUploader
                      fieldChange={field.onChange}
                      mediaUrl={project?.imageUrl}
                    />
                  </FormControl>

                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
          </div>

          {/* Summary Step */}
          <div
            className={cn({
              hidden:
                formStep === 1 ||
                formStep === 2 ||
                formStep === 3 ||
                formStep === 4 ||
                formStep === 5,
            })}
          >
            SUMMARY
          </div>

          <div className="flex gap-4 items-center justify-end">
            <Button
              type="button"
              className="shad-button_dark_4"
              onClick={() => navigate(-1)}
            >
              Cancel{formStep}
            </Button>
            <Button
              // shad-button_primary
              type="submit"
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
                  formStep === 4 ||
                  formStep === 5,
              })}
            >
              Create
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
                const titleState = form.getFieldState("title");
                const descriptionState = form.getFieldState("description");
                const leaderState = form.getFieldState("leader");
                const visibilityState = form.getFieldState("visibility");
                const tagsState = form.getFieldState("tags");

                if (!titleState.isDirty || titleState.invalid) return;
                if (!descriptionState.isDirty || descriptionState.invalid)
                  return;
                // if(!leaderState.isDirty || leaderState.invalid)return;
                // if(!visibilityState.isDirty || visibilityState.invalid)return;
                if (!tagsState.isDirty || tagsState.invalid) return;
                setFormStep((prev) => prev + 1);
              }}
            >
              Go to step 2
              <ArrowRight className="w-4 h-4 ml-2 " />
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

                const leaderState = form.getFieldState("leader");
                const visibilityState = form.getFieldState("visibility");

                // if (!leaderState.isDirty || leaderState.invalid) return;
                // if (!visibilityState.isDirty || visibilityState.invalid) return;

                setFormStep((prev) => prev + 1);
              }}
            >
              Go to step 3 <ArrowRight className="w-4 h-4 ml-2 " />
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

                // if (!leaderState.isDirty || leaderState.invalid) return;
                // if (!visibilityState.isDirty || visibilityState.invalid) return;

                setFormStep((prev) => prev + 1);
              }}
            >
              Go to step 4 <ArrowRight className="w-4 h-4 ml-2 " />
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
              Go to step 5<ArrowRight className="w-4 h-4 ml-2 " />
            </Button>
            <Button
              className={cn(" whitespace-nowrap ", {
                hidden:
                  formStep === 1 ||
                  formStep === 2 ||
                  formStep === 3 ||
                  formStep === 4 ||
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

                if (!leaderState.isDirty || leaderState.invalid) return;
                if (!visibilityState.isDirty || visibilityState.invalid) return;

                setFormStep((prev) => prev + 1);
              }}
            >
              Go to step 6<ArrowRight className="w-4 h-4 ml-2 " />
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProjectForm;
