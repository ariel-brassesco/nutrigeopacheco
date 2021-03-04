import React, { FC, ReactNode } from "react";

type Props = {
  header?: ReactNode;
  footer?: ReactNode;
};

export const Page: FC<Props> = ({ header, children, footer }) => (
  <>
    {header && <>{header}</>}
    <div>{children}</div>
    {footer && <>{footer}</>}
  </>
);
export default Page;
