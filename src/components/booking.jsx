import { useI18n } from "../providers/language";
import Calendar from "./ui/calendar";
import { useState } from "react";

export const Booking = ({ data }) => {
  const { t } = useI18n();
  const [locationType, setLocationType] = useState("ajuda"); // Default to "ajuda"
  const bookingData = data?.booking || [];  
  const scheduleConfig = Array.isArray(bookingData)
    ? bookingData.find((cfg) => cfg[locationType])?.[locationType]
    : null;

  return (
    <div id="booking" className="text-center card" style={{ minHeight: "auto", height: "auto", overflow: "visible", padding: "20px 0" }}>
      <div className="container" style={{ minHeight: "auto", height: "auto", overflow: "visible", maxWidth: "100%" }}>
        <div className="section-title">
          <h2>{t("booking")}</h2>
        </div>

        {/* Tabs para escolher tipo */}
        {/* <div style={{ marginBottom: "16px", display: "flex", justifyContent: "center", gap: "16px" }}>
          

          <button
            onClick={() => setLocationType("ajuda")}
            style={{
              padding: "8px 16px",
              border: locationType === "ajuda" ? "2px solid var(--primary-color)" : "1px solid #ccc",
              borderRadius: "6px",
              background: locationType === "ajuda" ? "#fff3f0" : "#fff",
              cursor: "pointer",
              fontWeight: locationType === "ajuda" ? "bold" : "normal",
            }}
          >
            {t("booking-type-ajuda") || "At ajuda"}
          </button>

        </div> */}

        {/* botão de localização abaixo das tabs */}
        <div style={{ marginBottom: "10px" }}>
          <a
            href={scheduleConfig?.link || "#"}
            target="_blank"
             rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--primary-color)",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            <i className="fa fa-map-marker" aria-hidden="true"></i>
            {t("view-location") || "Ver Localização"}
          </a>
        </div>

        {scheduleConfig ? (
          <Calendar
            scheduleConfig={scheduleConfig}
            services={data?.services}
            locationType={locationType}
          />
        ) : (
          <p style={{ opacity: 0.6 }}>
            {t("booking-no-data") || "No schedule available for this option."}
          </p>
        )}
      </div>
    </div>
  );
};
