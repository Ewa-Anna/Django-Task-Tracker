import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useAccountStore } from "../../store";

const OnboardingForm: React.FC = ({ onSave }) => {
  const csrfToken = useAccountStore((state) => state.csrfToken);
  const [deadlineDateError, setDeadlineDateError] = useState("");
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gender: "",
      birthday: "",
      avatar: "",
      phone: "",
      bio: "",
      theme: "default",
    },
  });
  const handleDateChange = (date) => {
    setValue("birthday", date);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const genderTypes = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const themeTypes = [
    { label: "Default", value: "default" },
    { label: "Dark", value: "dark" },
    { label: "DarkBlue", value: "darkBlue" },
    { label: "Slate", value: "slate" },
  ];

  const handleSave = handleSubmit((data) => {
    console.log(data);
    onSave({ csrfToken: csrfToken, formData: data });
  });

  return (
    <form
      onSubmit={handleSave}
      className="flex flex-col w-full gap-9 items-center max-w-3xl mx-auto"
    >
      <div className="flex flex-col w-full">
        <span className="text-slate-500 text-sm">Gender</span>
        <div className=" grid-row-5 gap-3 md:grid-cols-2 md:gap-3 lg:grid">
          {genderTypes.map(({ label, value }, index) => {
            return (
              <label
                key={index}
                htmlFor={label}
                className={`${watch("gender") === value ? "bg-[#a5b4fc] text-white font-bold" : "bg-gray-200"} text-sm flex gap-1 text-gray-700 cursor-pointer rounded p-4 mt-3 truncate md:mt-2`}
              >
                <input
                  {...register("gender", {
                    required: "Please select gender",
                  })}
                  name="gender"
                  type="radio"
                  value={value}
                  id={label}
                  hidden={true}
                />
                {label}
              </label>
            );
          })}
          {errors.gender && (
            <span className="text-xs text-rose-500">
              {errors.gender?.message}
            </span>
          )}
        </div>
      </div>
      <div className="w-full">
        <span className="text-sm block font-semibold text-gray-700">
          Birthday
        </span>
        <DatePicker
          startDate={watch("birthday")}
          selected={watch("birthday") ? watch("birthday") : null}
          minDate={minDate}
          maxDate={maxDate}
          onChange={(date) => handleDateChange(date as Date)}
          selectsStart
          placeholderText="birthday"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
        {deadlineDateError && (
          <span className="text-orange-600">{deadlineDateError}</span>
        )}
      </div>

      <div className="w-full flex flex-col">
        <label htmlFor="phone" className="text-slate-500 text-sm ">
          Phone
        </label>
        <input
          id="phone"
          {...register("phone", {
            validate: (value) => {
              const phoneNumber = Number(value.trim());
              if (isNaN(phoneNumber)) {
                return "Invalid number";
              }
              if (value.trim().length < 9 || value.trim().length > 12) {
                return "Phone number should have 9 to 12 digits";
              }

              return true;
            },
          })}
          type="text"
          className="py-2"
        />
        {errors?.phone && (
          <span className="text-xs text-rose-500 mt-2">
            {errors?.phone?.message}
          </span>
        )}
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="">Prolfile photo</label>
        <input type="file" />
      </div>
      <div className="w-full flex flex-col">
        <span>Bio</span>
        <textarea {...register("bio")} rows={2} />
      </div>

      <div className="flex flex-col  w-full">
        <span>Theme</span>
        <div className=" grid-row-5 gap-3 md:grid-cols-2 md:gap-3 lg:grid">
          {themeTypes.map(({ label, value }, index) => {
            const isChecked = watch("theme") === value;
            console.log("isChecked");
            console.log(isChecked);
            return (
              <label
                key={index}
                htmlFor={label}
                className={`${watch("theme") === value ? " bg-[#a5b4fc] text-white font-bold" : "bg-gray-200"} text-sm flex gap-1 text-gray-700 cursor-pointer  rounded p-4 mt-3 truncate md:mt-2`}
              >
                <input
                  {...register("theme", {
                    required: "Please chose gender",
                  })}
                  name="theme"
                  type="radio"
                  value={value}
                  id={label}
                  hidden={true}
                  defaultChecked={isChecked}
                />
                {label}
              </label>
            );
          })}
        </div>
      </div>

      <button
        className="bg-blue-500 rounded text-slate-100 font-semibold w-full py-1.5"
        type="submit"
      >
        Confirm
      </button>
    </form>
  );
};

export default OnboardingForm;
