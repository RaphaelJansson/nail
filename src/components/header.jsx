import React, { useEffect, useState } from "react";
import { useI18n } from "../providers/language";

export const Header = () => {
  const { t } = useI18n();
    const [aboutText, setAboutText] = useState(t("about-desc"));

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 767) {
        setAboutText(t("about-desc-mobile"));
      } else {
        setAboutText(t("about-desc"));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [t]);


  return (
    <div id="about" className="card" style={{ marginTop: "12vh"}}>
      <div className="container">
        <div className="col-xs-12 col-md-6 text-center" style={{ padding: 0}}>
          <img src="img/head.png" className="img-responsive center-block" alt="" />
        </div>
        <div className="col-xs-12 col-md-6" style={{ padding: 0}}>
          <div className="about-text">
            <h2>
              {t("about-title_header")}
            </h2>
            <p className="about-desc">{aboutText}</p>
            <div className="text-right">
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
