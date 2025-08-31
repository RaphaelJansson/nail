import React from "react";
import { Image } from "./ui/image";
import { useI18n } from "../providers/language";

export const Services = (props) => {
   const { t } = useI18n();

  return (
    <section id="services" className="text-center card" role="main">
      <div className="container">
        <div className="section-title">
          <h2>{t("services-title")}</h2>
        </div>
        <div className="services-grid" role="list">
          {props.data
            ? props.data.map((d, i) => (
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
