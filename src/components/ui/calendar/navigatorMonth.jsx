import { useI18n } from "../../../providers/language";

export default function NavigatorMonth({ currentMonth, setCurrentMonth, hoje }) {
  const { locale } = useI18n();

  const goBack = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goForward = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const canGoBack = currentMonth > hoje;
  const canGoForward = currentMonth.getMonth() < hoje.getMonth() + 1;
  const displayLocale = locale === "en" ? "en-US" : "pt-PT";

  return (
    <div
      className="calendar-header"
    >
      <h3 >
        {currentMonth.toLocaleDateString(displayLocale, { month: "long", year: "numeric" })}
      </h3>

      <div>
        {canGoBack && (
          <button onClick={goBack} className="calendar-nav-button">
            ←
          </button>
        )}
        {canGoForward && (
          <button onClick={goForward} className="calendar-nav-button">
            →
          </button>
        )}
      </div>
    </div>
  );
}
