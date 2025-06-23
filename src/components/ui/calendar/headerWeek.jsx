import { useI18n } from "../../../providers/language";

export default function HeaderWeek() {
  const { t } = useI18n();
  const days = t("days");

  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        fontWeight: "bold",
        marginBottom: "6px",
      }}
    >
      {days.map((day) => (
        <div
          key={day}
          style={{
            width: "36px",
            textAlign: "center",
          }}
        >
          {day}
        </div>
      ))}
    </div>
  );
}
