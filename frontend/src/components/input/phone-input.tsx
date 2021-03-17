import React, { FC, HTMLProps, ReactNode } from "react";
import { useField } from "formik";

// Import Components
import Phone from "./phone";

interface Props extends HTMLProps<HTMLInputElement> {
  mask?: any;
  label?: string;
  labelClass?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconClass?: string;
}

export const PhoneInput: FC<Props> = ({
  label,
  labelClass,
  iconLeft,
  iconRight,
  iconClass,
  ...props
}) => {
  const [field, meta] = useField(props as any);

  return (
    <div className="mb-2">
      {!!label && (
        <label className={labelClass} htmlFor={props.id ?? props.name}>
          {label}
        </label>
      )}
      <div className={iconClass}>
        <Phone {...field} {...(props as any)} />
        {!!iconLeft && iconLeft}
        {!!iconRight && iconRight}
      </div>
      {meta.touched && meta.error ? (
        <p className="help is-danger">{meta.error}</p>
      ) : null}
    </div>
  );
};
export default PhoneInput;
