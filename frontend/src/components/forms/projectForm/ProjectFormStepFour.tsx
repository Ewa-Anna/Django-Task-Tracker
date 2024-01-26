import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ProjectFormStepFour = ({
  form,
  formStep,
  users,
  selectedUsersLeft,
  selectedUsersRight,
  setSelectedUsersLeft,
  setSelectedUsersRight,
}) => {
  return (
    <div
      className={cn(
        "w-full min-h-[500px] max-h-[500px]  flex justify-between overflow-hidden flex-col lg:flex-row",
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
      <div className="px-6 py-4 border-2 border-dark-4 flex flex-col justify-start  gap-10 min-w-[200px] flex-1 overflow-y-scroll custom-scrollbar">
        {users &&
          users?.results
            .filter((availableUser) => {
              const alreadyAsignedIds = form
                .getValues("assignees")
                .map((assignedUser) => assignedUser.id);
              return !alreadyAsignedIds.includes(availableUser.id);
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
                         (selectedUser) => selectedUser.id === user.id
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

      <div className="flex flex-col justify-center gap-1 items-center min-w-[100px]">
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
            console.log("assignees after update:", form.getValues("assignees"));
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
            const selectedUserIds = selectedUsersRight.map((user) => user.id);
            const updatedAssignees = alreadyAsigned.filter(
              (asignedUser) => !selectedUserIds.includes(asignedUser.id)
            );
            form.setValue("assignees", updatedAssignees);
            setSelectedUsersRight([]);
            console.log("assignees after update:", form.getValues("assignees"));
          }}
        />
      </div>

      <div className="px-6 py-4 border-2 border-dark-4 flex flex-col justify-start  gap-10 min-w-[200px] flex-1 overflow-y-scroll custom-scrollbar">
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
                    (selectedUser) => selectedUser.id === contributor.id
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsersRight([
                        ...selectedUsersRight,
                        { id: contributor.id, email: contributor.email },
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
  );
};

export default ProjectFormStepFour;
