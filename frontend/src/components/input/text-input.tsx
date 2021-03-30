import React, { FC, HTMLProps, ReactNode } from "react";
import classNames from "classnames";
import { useField } from "formik";

// Import Components
import { Input } from ".";

interface Props extends HTMLProps<HTMLInputElement> {
  mask?: any;
  label?: string;
  margin?: boolean;
  labelClass?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconClass?: string;
}

export const TextInput: FC<Props> = ({
  label,
  labelClass,
  margin = true,
  iconLeft,
  iconRight,
  iconClass,
  ...props
}) => {
  const [field, meta] = useField(props as any);

  return (
    <div className="field">
      {!!label && (
        <label className={labelClass} htmlFor={props.id ?? props.name}>
          {label}
        </label>
      )}
      <div className={iconClass}>
        <Input
          className={classNames({
            "border-red-500": meta.touched && meta.error,
          })}
          {...field}
          {...(props as any)}
        />
        {!!iconLeft && iconLeft}
        {!!iconRight && iconRight}
      </div>
      {meta.touched && meta.error ? (
        <p className="help is-danger">{meta.error}</p>
      ) : null}
    </div>
  );
};
export default TextInput;
