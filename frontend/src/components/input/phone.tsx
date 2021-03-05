import React, { FC, HTMLProps } from "react";

import Input from "react-phone-number-input/input";

export type LinkProps = HTMLProps<HTMLAnchorElement> & {
  activeClassName?: string;
};

const Phone: FC<LinkProps> = ({ className, ...props }) => {
  return <Input defaultCountry="AR" className={className} {...props} />;
};

export default Phone;
