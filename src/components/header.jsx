import React from "react";
import { useI18n } from "../providers/language";
import WhatsAppButton from "./ui/whatsApp";


export const Header = () => {
  const { t } = useI18n();
  return (
    <div id="about" className="card" style={{ marginTop: "15vh"}}>
      <div className="container">
        <div className="col-xs-12 col-md-6 text-center">
          <img src="img/head.png" className="img-responsive center-block" alt="" />
        </div>
        <div className="col-xs-12 col-md-6">
          <div className="about-text">
            <h2>
              {t("about-title_header")}
            </h2>
            <p className="about-desc">{t("about-desc")}</p>
            <div className="text-right">
              {/* <WhatsAppButton /> */}
              <a href="#booking" className="btn btn-custom page-scroll">
                {t("booking")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
