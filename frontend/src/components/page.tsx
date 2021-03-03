import classNames from "classnames";
import React, { FC, ReactNode } from "react";

type Props = {
  header?: ReactNode;
  footer?: ReactNode;
  fullWidth?: boolean;
};

export const Page: FC<Props> = ({ header, children, footer, fullWidth }) => (
  <>
    <div
      className={classNames("mx-auto h-full overflow-auto px-2", {
        "container max-w-screen-xl": !fullWidth,
        "w-full max-page-width": fullWidth,
      })}
    >
      {header && <div className="py-4">{header}</div>}
      <div className="flex flex-col flex-1 overflow-auto pt-4">{children}</div>
    </div>
    {footer && <>{footer}</>}
  </>
);
export default Page;
