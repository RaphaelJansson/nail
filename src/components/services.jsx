import React from "react";
import { Image } from "./ui/image";
import { useI18n } from "../providers/language";

export const Services = (props) => {
   const { t } = useI18n();

  return (
    <div id="services" className="text-center card">
      <div className="container">
        <div className="section-title">
          <h2>{t("services-title")}</h2>
        </div>
        <div >
          {props.data
            ? props.data.map((d, i) => (
              <div
                key={`${d.title}-${i}`}
                className="col-sm-5 col-md-4 col-lg-4"
              >
                <div className="card-item">
                  <Image
                    title={t('price-by-location')}
                    largeImage={d.largeImage}
                    smallImage={d.smallImage}
                    hover
                    price
                  />
                  <h3>{t(d.service)}</h3>
                </div>
              </div>
            ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
