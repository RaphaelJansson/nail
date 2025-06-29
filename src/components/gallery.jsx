import { useI18n } from "../providers/language";
import { Image } from "./ui/image";
import React from "react";

export const Gallery = ({ data }) => {
  console.log("Gallery props", data);
  const galleryData = data?.gallery || [];
  const contactData = data?.contact || {};

  const { t } = useI18n();
  return (
    <div id="portfolio" className="text-center card">
      <div className="container">
        <div
          className="section-title"
          style={{
            position: "relative", // base para posicionar
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: 0 }}>{t("gallery-title")}</h2>
          <a
            href={contactData.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#dd4f3c",
              fontSize: "1.5rem",
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <i className="fa fa-instagram"></i>
          </a>
        </div>


        <div className="row">
          <div className="portfolio-items">
            {galleryData.map((d, i) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
