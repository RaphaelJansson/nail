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
    <div id="booking" className="text-center card">
      <div className="container">
        <div className="section-title">
          <h2>{t("booking")}</h2>
        </div>

        {/* Tabs para escolher tipo */}
        <div style={{ marginBottom: "16px", display: "flex", justifyContent: "center", gap: "16px" }}>
          

          <button
            onClick={() => setLocationType("ajuda")}
            style={{
              padding: "8px 16px",
              border: locationType === "ajuda" ? "2px solid #dd4f3c" : "1px solid #ccc",
              borderRadius: "6px",
              background: locationType === "ajuda" ? "#fff3f0" : "#fff",
              cursor: "pointer",
              fontWeight: locationType === "ajuda" ? "bold" : "normal",
            }}
          >
            {t("booking-type-ajuda") || "At ajuda"}
          </button>

          <button
            onClick={() => setLocationType("saldanha")}
            style={{
              padding: "8px 16px",
              border: locationType === "saldanha" ? "2px solid #dd4f3c" : "1px solid #ccc",
              borderRadius: "6px",
              background: locationType === "saldanha" ? "#fff3f0" : "#fff",
              cursor: "pointer",
              fontWeight: locationType === "saldanha" ? "bold" : "normal",
            }}
          >
            {t("booking-type-saldanha") || "At the saldanha"}
          </button>
        </div>

        {/* botão de localização abaixo das tabs */}
        <div style={{ marginBottom: "10px" }}>
          <a
            href={scheduleConfig?.link || "#"}
            target="_blank"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#dd4f3c",
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
