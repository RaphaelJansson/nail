import { useI18n } from "../providers/language";
import Calendar from "./ui/calendar";
import { useState } from "react";

export const Booking = ({ data }) => {
  const { t } = useI18n();
  const [locationType, setLocationType] = useState("salon");
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
            onClick={() => setLocationType("salon")}
            style={{
              padding: "8px 16px",
              border: locationType === "salon" ? "2px solid #dd4f3c" : "1px solid #ccc",
              borderRadius: "6px",
              background: locationType === "salon" ? "#fff3f0" : "#fff",
              cursor: "pointer",
              fontWeight: locationType === "salon" ? "bold" : "normal",
            }}
          >
            {t("booking-type-salon") || "At the Salon"}
          </button>

          <button
            onClick={() => setLocationType("home")}
            style={{
              padding: "8px 16px",
              border: locationType === "home" ? "2px solid #dd4f3c" : "1px solid #ccc",
              borderRadius: "6px",
              background: locationType === "home" ? "#fff3f0" : "#fff",
              cursor: "pointer",
              fontWeight: locationType === "home" ? "bold" : "normal",
            }}
          >
            {t("booking-type-home") || "At Home"}
          </button>
        </div>

        {scheduleConfig ? (
          <Calendar scheduleConfig={scheduleConfig} services={data?.services} locationType={locationType} />
        ) : (
          <p style={{ opacity: 0.6 }}>{t("booking-no-data") || "No schedule available for this option."}</p>
        )}
      </div>
    </div>
  );
};
