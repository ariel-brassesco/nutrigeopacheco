import React, { FC, HTMLProps } from "react";
import classNames from "classnames";
import { useField } from "formik";

// Import Components
import { Input } from ".";

interface Props extends HTMLProps<HTMLInputElement> {
  mask?: any;
  label?: string;
  margin?: boolean;
  labelClass?: string;
}

export const TextInput: FC<Props> = ({
  label,
  labelClass,
  margin = true,
  ...props
}) => {
  const [field, meta] = useField(props as any);

  return (
    <div className={classNames({ "mb-2": margin })}>
      {!!label && (
        <label className={labelClass} htmlFor={props.id ?? props.name}>
          {label}
        </label>
      )}
      <Input
        className={classNames({
          "border-red-500": meta.touched && meta.error,
        })}
        data-testid="input"
        {...field}
        {...(props as any)}
      />
      <span className="icon is-small is-right">
        <i className="fas fa-exclamation-triangle"></i>
      </span>
      {meta.touched && meta.error ? (
        <p className="help is-danger">{meta.error}</p>
      ) : null}
    </div>
  );
};
export default TextInput;
