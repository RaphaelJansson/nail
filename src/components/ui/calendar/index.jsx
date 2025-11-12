import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import ButtonCalendar from "./buttonCalendar";
import NavigatorMonth from "./navigatorMonth";
import HeaderWeek from "./headerWeek";
import GridCalendar from "./gridCalendar";
import { toLocalISODate } from "../../../util/toLocalISODate";
import { useI18n } from "../../../providers/language";
import { WhatsApp } from "../../../service/whatsApp";

const API_KEY = "AIzaSyCos8y4S6alkKXMOFU6WhxHbdOVoNcAfGY";
const CALENDAR_ID = "licettithays25@gmail.com";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

export default function Calendar({ scheduleConfig, services, locationType }) {
  // ESTADO INICIAL
  const [modo, setModo] = useState("servicos");
  const [servicosSelecionados, setServicosSelecionados] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [horariosPorDia, setHorariosPorDia] = useState({});
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [serviceType, setServiceType] = useState("hand");
  const hoje = new Date();

  const handServices = services?.filter(service =>
    !service.service.includes("foot") && service.showSchedule === true
  ) || [];

  const footServices = services?.filter(service =>
    service.service.includes("foot") && service.showSchedule === true
  ) || [];

  const currentServices = serviceType === "hand" ? handServices : footServices;

  const { t } = useI18n();

  useEffect(() => {
  setModo("servicos");
  setServicosSelecionados([]);
  setDiaSelecionado(null);
  setHorarioSelecionado(null);
}, [locationType]);

  useEffect(() => {
    setDiaSelecionado(null);
    gapi.load("client", async () => {
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
      });

      const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

      const eventos = await gapi.client.calendar.events.list({
        calendarId: CALENDAR_ID,
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
      });

      const ocupados = eventos.result.items?.map((ev) => ({
        start: new Date(ev.start.dateTime || ev.start.date),
        end: new Date(ev.end.dateTime || ev.end.date),
      })) ?? [];

      const horarios = {};
      const dia = new Date(start);

      while (dia < end) {
        const dataISO = toLocalISODate(dia);
        horarios[dataISO] = [];

        const diaSemana = dia.getDay();
        const regrasDia = scheduleConfig.allowedDays[diaSemana];

        if (regrasDia) {
          for (let h = regrasDia.start; h < regrasDia.end; h++) {
            const startSlot = new Date(dia);
            startSlot.setHours(h, 0, 0, 0);
            const endSlot = new Date(startSlot.getTime() + 60 * 60 * 1000);

            const conflita = ocupados.some(
              (e) => e.start < endSlot && e.end > startSlot
            );

            const isToday = dia.toDateString() === hoje.toDateString();
            const isPastTime = isToday && startSlot <= hoje;

            if (!conflita && !isPastTime) {
              horarios[dataISO].push(
                startSlot.toLocaleTimeString("pt-PT", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              );
            }
          }
        } else {
          console.log(`No rules found for day ${diaSemana} (${dia.toDateString()})`);
        }

        dia.setDate(dia.getDate() + 1);
      }

      setHorariosPorDia(horarios);
    });
  }, [currentMonth, scheduleConfig]);

  const toggleServiceSelection = (servico) => {
    setServicosSelecionados(prev => {
      const isSelected = prev.some(s => s.service === servico.service);
      if (isSelected) {
        return prev.filter(s => s.service !== servico.service);
      } else {
        return [...prev, servico];
      }
    });
  };

  const handleSendMessage = () => {
    const whatsApp = new WhatsApp();
    whatsApp.generateMultipleServicesMessage(servicosSelecionados, locationType, diaSelecionado, horarioSelecionado, t);
    whatsApp.sendMessage()
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "310px",
        margin: "0 auto",
        minHeight: "464px",
        overflow: "hidden",
      }}
    >
      {/* Etapa: SERVIÇOS */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          transition: "all 0.4s ease",
          transform: modo === "servicos" ? "translateX(0)" : "translateX(-100%)",
          opacity: modo === "servicos" ? 1 : 0,
          pointerEvents: modo === "servicos" ? "auto" : "none",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <h3>{t("choose-service")}</h3>

          {/* Tabs para escolher tipo de serviço + Botão Carrinho */}
          <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setServiceType("hand")}
                style={{
                  padding: "8px 16px",
                  fontSize: "1rem",
                  border: serviceType === "hand" ? "2px solid var(--primary-color)" : "1px solid #ccc",
                  borderRadius: "6px",
                  background: serviceType === "hand" ? "#fff3f0" : "#fff",
                  cursor: "pointer",
                  fontWeight: serviceType === "hand" ? "bold" : "normal",
                  color: serviceType === "hand" ? "var(--primary-color)" : "#333",
                }}
              >
                {t("hand-services")}
              </button>

              <button
                onClick={() => setServiceType("foot")}
                style={{
                  padding: "8px 16px",
                  fontSize: "1rem",
                  border: serviceType === "foot" ? "2px solid var(--primary-color)" : "1px solid #ccc",
                  borderRadius: "6px",
                  background: serviceType === "foot" ? "#fff3f0" : "#fff",
                  cursor: "pointer",
                  fontWeight: serviceType === "foot" ? "bold" : "normal",
                  color: serviceType === "foot" ? "var(--primary-color)" : "#333",
                }}
              >
                {t("foot-services")}
              </button>
            </div>

            <button
              onClick={() => servicosSelecionados.length > 0 && setModo("calendario")}
              disabled={servicosSelecionados.length === 0}
              style={{
                padding: "0",
                backgroundColor: "transparent",
                border: "none",
                cursor: servicosSelecionados.length > 0 ? "pointer" : "not-allowed",
                position: "relative",
              }}
            >
              <i
                className="fa fa-cart-arrow-down"
                style={{
                  fontSize: "18px",
                  width: "42px",
                  height: "42px",
                  padding: "12px 0",
                  background: servicosSelecionados.length > 0
                    ? "linear-gradient(to right, var(--primary-color) 0%, var(--primary-color-light) 100%)"
                    : "#ccc",
                  color: "#fff",
                  borderRadius: "50%",
                  transition: "all 0.3s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              ></i>
              {servicosSelecionados.length > 0 && (
                <span style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  backgroundColor: "#ff4444",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  border: "2px solid #fff"
                }}>
                  {servicosSelecionados.length}
                </span>
              )}
            </button>
          </div>

          <div style={{
            maxHeight: "300px",
            overflowY: "scroll",
            paddingRight: "4px"
          }}>
            <div className="calendar-services-grid" style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "space-between",
              paddingBottom: "8px"
            }}>
              {currentServices.map((servico, idx) => {
                const isSelected = servicosSelecionados.some(s => s.service === servico.service);
                return (
                  <div
                    className="button calendar-service-item"
                    key={idx}
                    onClick={() => toggleServiceSelection(servico)}
                    style={{
                      cursor: "pointer",
                      border: isSelected ? "2px solid var(--primary-color)" : "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "8px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      width: "calc(50% - 4px)",
                      minHeight: "120px",
                      backgroundColor: isSelected ? "#fff3f0" : "#fff",
                      position: "relative",
                    }}
                  >
                    {isSelected && (
                      <div style={{
                        position: "absolute",
                        top: "4px",
                        right: "4px",
                        backgroundColor: "var(--primary-color)",
                        color: "white",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "bold"
                      }}>
                        ✓
                      </div>
                    )}
                  <img
                    src={servico.smallImage}
                    alt={servico.title}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", fontSize: "15px" }}>
                    <strong>{t(servico.service)}</strong>
                    <strong style={{ color: "var(--primary-color)" }}>{t(servico.price[locationType])}</strong>
                  </div>
                </div>
              );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Etapa: CALENDÁRIO */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          transition: "all 0.4s ease",
          transform: modo === "calendario" ? "translateX(0)" : modo === "horarios" ? "translateX(-100%)" : "translateX(100%)",
          opacity: modo === "calendario" ? 1 : 0,
          pointerEvents: modo === "calendario" ? "auto" : "none",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            position: "relative",
          }}
        >
          <button
            onClick={() => setModo("servicos")}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "none",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
          <h3>{t("choose-date")}</h3>
          <NavigatorMonth
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            hoje={hoje}
          />
          <HeaderWeek />
          <GridCalendar
            currentMonth={currentMonth}
            hoje={hoje}
            horariosPorDia={horariosPorDia}
            diaSelecionado={diaSelecionado}
            setDiaSelecionado={(dia) => {
              setDiaSelecionado(dia);
              setModo("horarios");
            }}
          />
        </div>
      </div>

      {/* Etapa: HORÁRIOS */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          transition: "all 0.4s ease",
          transform:
            modo === "horarios"
              ? "translateX(0)"
              : modo === "resumo"
                ? "translateX(-100%)"
                : "translateX(100%)",
          opacity: modo === "horarios" ? 1 : 0,
          pointerEvents: modo === "horarios" ? "auto" : "none",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 6px rgba(25, 6, 6, 0.05)",
            position: "relative",
          }}
        >
          <button
            onClick={() => setModo("calendario")}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "none",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
          <h3>{t("available-times")}</h3>
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {diaSelecionado &&
              new Date(diaSelecionado).toLocaleDateString("pt-PT")}
          </div>
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "12px",
            }}
          >
            {horariosPorDia[diaSelecionado]?.map((hora, idx) => (
              <ButtonCalendar
                key={idx}
                id={`${diaSelecionado}-${hora}`}
                hour
                label={hora}
                selecionado={false}
                habilitado={true}
                onClick={() => {
                  setHorarioSelecionado(hora);
                  setModo("resumo");
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Etapa: RESUMO */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          transition: "all 0.4s ease",
          transform: modo === "resumo" ? "translateX(0)" : "translateX(100%)",
          opacity: modo === "resumo" ? 1 : 0,
          pointerEvents: modo === "resumo" ? "auto" : "none",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            position: "relative",
          }}
        >
          <button
            onClick={() => setModo("horarios")}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "none",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
          <h3>{t("confirm-booking")}</h3>
          <div style={{ marginTop: "16px", fontSize: "1rem" }}>
            <p><strong>{servicosSelecionados.length === 1 ? t("service") : t("services")}:</strong></p>
            <ul style={{ margin: "8px 0", paddingLeft: "20px", textAlign: "left"}}>
              {servicosSelecionados.map((servico, idx) => (
                <li key={idx} style={{ marginBottom: "4px", fontSize: "15px"   }}>
                  {t(servico.service)} - {servico.price[locationType]}
                </li>
              ))}
            </ul>
            <p><strong>{t("date")}:</strong> {diaSelecionado && new Date(diaSelecionado).toLocaleDateString("pt-PT")}</p>
            <p><strong>{t("time")}:</strong> {horarioSelecionado}</p>
          </div>
          <button
            onClick={handleSendMessage}
            className="button"
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
              backgroundColor: "var(--primary-color)",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {t("schedule")}
          </button>
        </div>
      </div>

    </div>
  );

};