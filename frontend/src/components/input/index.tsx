import React, { FC, HTMLProps, InputHTMLAttributes } from "react";
import classNames from "classnames";

type Props = InputHTMLAttributes<HTMLInputElement> &
  HTMLProps<HTMLTextAreaElement> & {};

export const Input: FC<Props> = ({ className, ...props }) => {
  const classes = classNames(className, {
    textarea: props.type === "textarea",
  });

  if (props.type === "textarea") {
    return <textarea {...(props as any)} className={classes} />;
  }

  return (
    <input
      {...(props as any)}
      type={props.type ?? "text"}
      className={classes}
    />
  );
};
export default Input;
