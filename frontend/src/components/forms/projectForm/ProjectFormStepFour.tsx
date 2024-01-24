import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';


const ProjectFormStepFour = ({form,formStep,users,selectedUsersLeft,selectedUsersRight,setSelectedUsersLeft,setSelectedUsersRight}) => {
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
    <div className="px-8  border-2 border-dark-4 flex flex-col justify-center  gap-10 min-w-[200px] flex-1 overflow-y-scroll custom-scrollbar">
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
          // console.log(form.getValues("contributors"));

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
          // console.log(form.getValues("contributors"));
        }}
      />
    </div>

    <div className="px-8 border-2 border-dark-4 flex flex-col gap-10 min-w-[200px] flex-1 overflow-y-scroll custom-scrollbar">
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
            <div className=" min-w-full w-full">{contributor}</div>
          </div>
        );
      })}
    </div>
  </div>
  )
}

export default ProjectFormStepFour