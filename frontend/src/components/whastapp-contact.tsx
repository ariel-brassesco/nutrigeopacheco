import React, { FC } from "react";

type Props = {
  url: string;
};
export const WhatsappContact: FC<Props> = ({ url }) => (
  <a
    href={`${url}?text=Hola quisiera consultarte sobre `}
    className="icon whatsapp-contact"
    target="_blank"
    rel="noreferrer"
  >
    <i className="fab fa-2x fa-whatsapp"></i>
  </a>
);
