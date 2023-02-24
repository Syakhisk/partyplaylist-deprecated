import React from "react";
import clsx from "clsx";
import {
  FieldErrors,
  FieldValues,
  // useFormContext
} from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

type Props = InputProps & React.InputHTMLAttributes<HTMLInputElement>;
type InputProps = {
  label: string;
  placeholder?: string;
  helperText?: string;
  id: string;
  required?: boolean;
  register?: any;
  formState?: any;
};

const Input = (props: Props) => {
  const {
    label,
    placeholder = " ",
    helperText = null,
    id,
    type = "text",
    readOnly = false,
    formState,
    register,
    ...rest
  } = props;

  const { errors } = formState;

  // const {
  //   register,
  //   formState: { errors },
  // } = useFormContext();

  // Object.assign(validation, {
  //   required: required && "This field is required",
  // });

  // get errors if 'id' contains '.'
  if (id.includes(".")) {
    const structure = id.split(".");
    let error: FieldErrors<FieldValues> | FieldValues = errors;
    let noError = true;
    for (const s of structure) {
      const key = Number.isNaN(+s) ? s : +s;
      if (!error[key]) {
        noError = false;
        break;
      }
      error = error[key];
    }

    errors[id] = noError ? error : undefined;
  }

  // if (required) {
  //   validation = {
  //     required,
  //     pattern: {
  //       value: /^[^\s]+(?:$|.*[^\s]+$)/,
  //       message: "Entered value cant start/end or contain only white spacing",
  //     },
  //   };
  // }

  return (
    <div className={containerCN}>
      <div className="relative">
        <input
          {...register(id)}
          {...rest}
          autoComplete={type === "password" ? "on" : undefined}
          type={type}
          name={id}
          id={id}
          readOnly={readOnly}
          className={inputCN}
          placeholder={placeholder}
          aria-describedby={id}
        />

        <label htmlFor={id} className={labelCN}>
          {label}
        </label>

        {errors[id] && (
          <div className={clsx(iconCN, "text-red-500")}>
            <ExclamationCircleIcon className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="mt-1">
        {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
        <p className="text-sm text-red-500">
          {errors[id]?.message ?? "\u00A0"}
        </p>
      </div>
    </div>
  );
};

const containerCN = clsx`
group
relative
z-0
w-full
pt-2
pb-4
`;

const iconCN = clsx`
pointer-events-none
absolute
right-0
top-[25%]
`;

const inputCN = clsx`
peer
block
w-full
appearance-none
border-0
border-b-2
border-accent-400
bg-transparent
py-2.5
px-0
text-base
text-gray
focus:border-highlight
focus:outline-none
focus:ring-0
`;

const labelCN = clsx`
absolute
top-3
-z-10
origin-[0]
-translate-y-6
scale-75
transform
text-base
font-medium
text-gray-500
duration-300
peer-placeholder-shown:translate-y-0
peer-placeholder-shown:scale-100
peer-focus:left-0
peer-focus:-translate-y-6
peer-focus:scale-75
peer-focus:text-accent-400
`;

export default Input;
