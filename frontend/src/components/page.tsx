import React, { FC, ReactNode } from "react";

type Props = {
  header?: ReactNode;
  footer?: ReactNode;
};

export const Page: FC<Props> = ({ header, children, footer }) => (
  <>
    {header && <>{header}</>}
    {children}
    {footer && <>{footer}</>}
  </>
);
export default Page;
