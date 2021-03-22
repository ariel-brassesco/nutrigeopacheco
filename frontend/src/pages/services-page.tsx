import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Import Components
import { ServicesTurnos } from "../components/services-turnos";
// Import Actions
import { fetchPlace } from "../store/place";
// Import Getters
import { getPlace } from "../store/place";
// IMport Types
import { Place } from "../types";

const ServicesPage: FC = () => {
  const dispatch = useDispatch();
  const place = useSelector(getPlace);

  useEffect(() => {
    dispatch(fetchPlace());
  }, [dispatch]);

  return (
    <>
      <div className="box services-card">
        <div className="services-image-container">
          <figure className="image is-5by4">
            <img
              className="services-image"
              src="/static/images/consultorio.jpeg"
              alt="consultorio"
            />
          </figure>
        </div>
        <div>
          <h2 className="services-title">CONSULTORIO VIRTUAL</h2>
          <div className="content">
            <p>
              Como ya sabemos esta modalidad viene para quedarse, me costó
              construir esta nueva forma de intercambio, pero no solo veo
              resultados en cada consulta sino que considero que hago un mejor
              seguimiento y apoyo para la construcción de cambio de hábitos.
            </p>
            <p>Dinámica de la consulta:</p>
            <ol>
              <li>
                A través de mensaje privado empiezo a interactuar para coordinar
                fecha y horario. Siempre trato de que nos quede cómodo y se
                amolde a las rutinas individuales.
              </li>
              <li>
                Seguimos la charla en Whatsapp y ya registramos día y hora, y
                medio de comunicación.
              </li>
              <li>
                El pago se hace por transferencia bancaria y por mercado pago.{" "}
                <strong className="is-uppercase">No se abona dieta</strong>,
                pues no trabajo de esa forma.
              </li>
              <li>
                Llega el día de la consulta y trato de ayudarlos y motivarlos a
                cambiar de a poco sus hábitos. Siempre digo, pasos firmes y que
                queden para siempre.
              </li>
              <li>
                Seguimos las consultas cada 15-20 días, según necesidad del
                paciente.
              </li>
              <li>
                Hay cambios y muchos logran transitarlo con naturalidad, y ahí
                siento que vamos bien! hubo cambio real!
              </li>
            </ol>
            <p className="is-size-5">
              No dudes en consultarme. Muchas gracias!
            </p>
          </div>
        </div>
        <ServicesTurnos title="TURNOS" place={place as Place} />
      </div>
      <div className="box services-card">
        <div className="services-image-container">
          <figure className="image is-5by4">
            <img
              className="services-image"
              src="/static/images/virtual.jpeg"
              alt="consultorio"
            />
          </figure>
        </div>
        <div>
          <h2 className="services-title">CONSULTA PRESENCIAL</h2>
          <div className="content">
            <p>
              Actualmente, el consultorio presencial lo llevo a cabo en Santa Fe
              Capital.
            </p>
            <p>
              La calidad de la consulta es exactamente igual a la virtual. Lo
              que difiere es que desde la primera consulta vas poder obtener una
              evaluación de bioimpedancia.
            </p>
            <p>
              Esto significa que obtendrás el porcentaje de masa muscular, masa
              grasa, el puntaje de grasa visceral y edad metabólica.
            </p>
            <p>
              De esta forma podrás acceder a un Tratamiento Nutricional
              completo, con todas las herramientas necesarias para que veas tus
              progresos.
            </p>
            <p className="is-size-5">
              No dudes en consultarme. Muchas gracias!
            </p>
          </div>
        </div>
        <ServicesTurnos title="TURNOS" place={place as Place} />
      </div>
      <div className="box services-card">
        <div className="services-image-container">
          <figure className="image is-5by4">
            <img
              className="services-image"
              src="/static/images/empresa.jpeg"
              alt="consultorio"
            />
          </figure>
        </div>
        <div>
          <h2 className="services-title">ASESORAMIENTO PARA EMPRESAS</h2>
          <div className="content">
            <p>
              Se plantea un esquema en cuatro segmentos, para el manejo integral
              y el bienestar de los empleados que trabajan activamente, con el
              objetivo de la prevención y tratamiento de comorbilidades
              derivadas de una alimentación deficiente o inadecuada que
              repercuten tanto en la salud del trabajador, como en el
              desenvolvimiento y rendimiento de sus tareas laborales. Así, se
              busca mejorar en nivel de motivación, presentismo y cuidado
              personal.
            </p>
            <ul>
              <li>
                <strong>CONSULTORIO NUTRICIONAL:</strong> tareas de
                asesoramiento y coaching.
              </li>
              <li>
                <strong>PLANIFICACIÓN NUTRICIONAL:</strong> se trabaja sobre
                sustentabilidad alimentaria, optimizando los recursos y
                presupuestos.
              </li>
              <li>
                <strong>SUPERVISIÓN Y AUDITORÍA DEL COMEDOR:</strong>{" "}
                actividades de control de higiene y seguridad alimentaria.
              </li>
              <li>
                <strong>CAPACITACIONES Y EDUCACIÓN ALIMENTARIA:</strong> se
                organizan eventos-charlas en salud, según las necesidades que se
                detecten y evalúen.
              </li>
            </ul>
          </div>
        </div>
        <ServicesTurnos title="CONSULTAS" place={place as Place} />
      </div>
      <div className="box services-card">
        <div className="services-image-container">
          <figure className="image is-5by4">
            <img
              className="services-image"
              src="/static/images/consultorio.jpg"
              alt="consultorio"
            />
          </figure>
        </div>
        <div>
          <h2 className="services-title">TALLERES ONLINE</h2>
          <div className="content">
            <p>
              Próximamente estará disponible en la tienda online, la posibilidad
              de acceder a talleres grabados con la posibilidad de verlos cuándo
              quieras.
            </p>
            <p>
              Talleres destinados a cambiar tus hábitos de manera rápida y
              sencilla.
            </p>
          </div>
        </div>
        <ServicesTurnos title="QUERES SABER MÁS?" place={place as Place} />
      </div>
    </>
  );
};

export default ServicesPage;
