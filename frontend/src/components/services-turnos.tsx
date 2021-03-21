import React, { FC } from "react";

// Import Types
import { Place } from "../types";

type Props = {
  title: string;
  place: Place;
};

export const ServicesTurnos: FC<Props> = ({ title, place }) => (
  <div className="box services-turnos">
    <p className="is-size-5 has-text-weight-bold is-align-self-center">
      {title}
    </p>
    <a href={place.instagram} className="services-turnos-link">
      <i className="services-turnos-link__icon fab fa-2x fa-instagram"></i>
      <span className="services-turnos-link__label">
        @{place.instagram?.split("/").pop()}
      </span>
    </a>
    {place.whatsapp && (
      <a
        href={place.whatsapp}
        className="services-turnos-link"
        target="_blank"
        rel="noreferrer"
      >
        <i className="services-turnos-link__icon fab fa-2x fa-whatsapp"></i>
        <span className="services-turnos-link__label">
          +{place.whatsapp.split("/").pop()}
        </span>
      </a>
    )}
    <a
      href={`mailto:${place.email}?subject=Consulta`}
      className="services-turnos-link"
    >
      <i className="services-turnos-link__icon fa fa-lg fa-envelope"></i>
      <span className="services-turnos-link__label">{place.email}</span>
    </a>
    <a href={`tel:${place.phone_number}`} className="services-turnos-link">
      <i className="services-turnos-link__icon fa fa-lg fa-phone"></i>
      <span className="services-turnos-link__label">{place.phone_number}</span>
    </a>
  </div>
);
