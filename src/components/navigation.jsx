import React from "react";
import { useI18n } from "../providers/language";

export const Navigation = (props) => {
  const { locale, setLocale, t } = useI18n();
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            {t("brand")}
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right"
            style={{ display: "flex", alignItems: "center" }}>
            <li>
              <a href="#about" className="page-scroll">
                {t("about")}
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                {t("services")}
              </a>
            </li>
            <li>
              <a href="#portfolio" className="page-scroll">
                {t("portfolio")}
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                {t("contact")}
              </a>
            </li>
            <li
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
              <img
                src={`img/flags/${locale}-flag.png`}
                alt={locale}
                style={{ width: "24px" }}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
