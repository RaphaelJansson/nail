import React from "react";
import { useI18n } from "../providers/language";

export const Navigation = (props) => {
  const { locale, setLocale, t } = useI18n();
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          {/* botão hambúrguer continua no DOM mas será escondido no mobile */}
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>

          <a className="navbar-brand page-scroll" href="#page-top">
            <img src="ThaysRamos-light.png" className="img-logo desktop-logo" alt="Thays Ramos logo" />
            <img src="favicon-light.png" className="img-logo mobile-logo" alt="Thays Ramos logo mobile" />
          </a>

          {/* FLAG MOBILE — fora do collapse */}
          <div
            className="lang-switch-mobile"
            onClick={() => setLocale(locale === "pt" ? "en" : "pt")}
            aria-label="Change language"
          >
            <img src={`img/flags/${locale}-flag.png`} alt={locale} className="flag-img" />
          </div>
        </div>

        {/* NAV DESKTOP */}
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right nav-desktop" style={{ display: "flex", alignItems: "center" }}>
            <li><a href="#about" className="page-scroll">{t("about")}</a></li>
            <li><a href="#services" className="page-scroll">{t("services")}</a></li>
            <li><a href="#portfolio" className="page-scroll">{t("portfolio")}</a></li>
            <li><a href="#contact" className="page-scroll">{t("contact")}</a></li>

            {/* FLAG DESKTOP (opcional manter) */}
            <li
              className="lang-switch-desktop"
              style={{
                listStyle: "none",
                marginTop: "5px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "4px 8px",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setLocale(locale === "pt" ? "en" : "pt")}
            >
              <img src={`img/flags/${locale}-flag.png`} alt={locale} style={{ width: "24px" }} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
