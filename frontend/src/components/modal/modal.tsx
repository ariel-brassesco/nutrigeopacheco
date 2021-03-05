import React, { FC, ReactNode, useCallback } from "react";
import { Portal } from "react-portal";
import { Button } from "./button";

export type ModalProps = {
  open?: boolean;
  onOpenChange?: Function;
  title?: ReactNode;
  icon?: ReactNode;
  ok?: ReactNode;
  width?: string | number;
};

export const Modal: FC<ModalProps> = ({
  onOpenChange,
  icon,
  title,
  children,
  ok,
  width = 500,
}) => {
  const handleClose = useCallback(() => onOpenChange && onOpenChange(false), [
    onOpenChange,
  ]);

  return (
    <Portal>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen md:p-4 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 transition-opacity"
            onClick={handleClose}
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>

          <div
            className="inline-block bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full"
            style={{ maxWidth: width }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-4 pb-4 sm:p-6 sm:pb-4">
              <div className="flex items-center">
                <div className="flex flex-col flex-0">
                  <div className="flex items-center justify-center">{icon}</div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex-1 font-medium text-lg">{title}</div>
                </div>
              </div>

              <div>
                <div className="mt-4">{children}</div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 pb-4 sm:px-6 sm:flex sm:flex-row-reverse">
              {ok ? (
                <span className="flex w-full sm:ml-3 sm:w-auto">{ok}</span>
              ) : null}

              <span className="mt-3 flex w-full sm:mt-0 sm:w-auto">
                <Button
                  className="inline-flex justify-center w-full"
                  onClick={handleClose}
                >
                  Cerrar
                </Button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
