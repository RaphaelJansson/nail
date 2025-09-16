import React, { useState } from "react";
import { Image } from "./ui/image";
import { useI18n } from "../providers/language";

export const Services = (props) => {
   const { t } = useI18n();
   const [serviceType, setServiceType] = useState("hand");

   const handServices = props.data?.filter(service =>
     !service.service.includes("foot") && service.showServices === true
   ) || [];

   const footServices = props.data?.filter(service =>
     service.service.includes("foot") && service.showServices === true
   ) || [];

   const currentServices = serviceType === "hand" ? handServices : footServices;

  return (
    <section id="services" className="text-center card" role="main">
      <div className="container">
        <div className="section-title">
          <h2>{t("services-title")}</h2>
        </div>

        {/* Tabs para escolher tipo de serviço */}
        <div style={{ marginBottom: "24px", display: "flex", justifyContent: "center", gap: "16px" }}>
          <button
            onClick={() => setServiceType("hand")}
            style={{
              padding: "8px 16px",
              border: serviceType === "hand" ? "2px solid var(--primary-color)" : "1px solid #ccc",
              borderRadius: "6px",
              background: serviceType === "hand" ? "#fff3f0" : "#fff",
              cursor: "pointer",
              fontWeight: serviceType === "hand" ? "bold" : "normal",
              color: serviceType === "hand" ? "var(--primary-color)" : "#333",
            }}
          >
            {t("hand-services")}
          </button>

          <button
            onClick={() => setServiceType("foot")}
            style={{
              padding: "8px 16px",
              border: serviceType === "foot" ? "2px solid var(--primary-color)" : "1px solid #ccc",
              borderRadius: "6px",
              background: serviceType === "foot" ? "#fff3f0" : "#fff",
              cursor: "pointer",
              fontWeight: serviceType === "foot" ? "bold" : "normal",
              color: serviceType === "foot" ? "var(--primary-color)" : "#333",
            }}
          >
            {t("foot-services")}
          </button>
        </div>

        <div className="services-grid" role="list">
          {currentServices.length > 0
            ? currentServices.map((d, i) => (
              <article
                key={`${d.title}-${i}`}
                className="col-sm-5 col-md-4 col-lg-4"
                role="listitem"
              >
                <div className="card-item">
                  <Image
                    title={t('price-by-location')}
                    largeImage={d.largeImage}
                    smallImage={d.smallImage}
                    alt={`${t(d.service)} - Professional nail service by Thays Ramos`}
                    hover
                    price
                  />
                  <h3>{t(d.service)}</h3>
                </div>
              </article>
            ))
            : <div role="status" aria-live="polite">{t("loading") || "Loading services..."}</div>}
        </div>
      </div>
    </section>
  );
};
