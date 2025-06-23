import { useI18n } from "../providers/language";
import { Image } from "./ui/image";
import React from "react";

export const Gallery = (props) => {
  const { t } = useI18n();
  return (
    <div id="portfolio" className="text-center card">
      <div className="container">
        <div className="section-title">
          <h2>{t("gallery-title")}</h2>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {props.data
              ? props.data.map((d, i) => (
                  <div
                    key={`${d.title}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                  >
                    <Image
                      title={d.title}
                      largeImage={d.largeImage}
                      smallImage={d.smallImage}
                    />
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
