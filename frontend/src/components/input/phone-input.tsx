import React, { FC, HTMLProps } from "react";
import { useField } from "formik";

// Import Components
import Phone from "./phone";

interface Props extends HTMLProps<HTMLInputElement> {
  mask?: any;
  label?: string;
}

export const PhoneInput: FC<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props as any);

  return (
    <div className="mb-2">
      {!!label && (
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor={props.id ?? props.name}
        >
          {label}
        </label>
      )}
      <Phone {...field} {...(props as any)} />
      {meta.touched && meta.error ? (
        <div className="text-red-500 font-semibold text-xs my-2">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};
export default PhoneInput;
