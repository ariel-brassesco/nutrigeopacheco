import React, { FC } from "react";

export const BannerInfo: FC = () => (
  <div className="banner-info">
    <div className="banner-info-item">
      <span className="icon banner-shipping-icon">
        <i className="fas fa-2x fa-truck"></i>
      </span>
      <div className="banner-shipping-content">
        <p className="banner-shipping-title">
          ENVÍOS GRATIS A SANTA FE Y ALREDEDORES
        </p>
        <p className="banner-shipping-additional">
          Consulta por costo de envío al resto del país.
        </p>
      </div>
    </div>
    <div className="banner-info-item banner-payment">
      <p className="banner-payment-title">MEDIOS DE PAGO</p>
      <img
        className="banner-payment-mercadopago"
        src="https://imgmp.mlstatic.com/org-img/banners/ar/medios/online/468X60.jpg"
        title="Mercado Pago - Medios de pago"
        alt="Mercado Pago - Medios de pago"
      />
      <div className="banner-payment-method">
        <span className="icon">
          <i className="fas fa-lg fa-landmark"></i>
        </span>
        <p className="banner-payment-method-title">Transferencia</p>
      </div>
      <div className="banner-payment-method">
        <span className="icon">
          <i className="fas fa-lg fa-dollar-sign"></i>
        </span>
        <p className="banner-payment-method-title">Efectivo</p>
      </div>
    </div>
  </div>
);

export const GeneralAnnouncement: FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => (
  <div className="promotions">
    <p className={className}>{text}</p>
  </div>
);
