import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import ButtonCalendar from "./buttonCalendar";
import NavigatorMonth from "./navigatorMonth";
import HeaderWeek from "./headerWeek";
import GridCalendar from "./gridCalendar";
import { toLocalISODate } from "../../../util/toLocalISODate";
import { useI18n } from "../../../providers/language";

const API_KEY = "AIzaSyDzHa09zp-dEsPOTgtpQfrO-fLo4Usd5bU";
const CALENDAR_ID = "raphaeljansson@gmail.com";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

export default function Calendar({ scheduleConfig, services, locationType }) {
  // ESTADO INICIAL
  const [modo, setModo] = useState("servicos");
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [horariosPorDia, setHorariosPorDia] = useState({});
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const hoje = new Date();

  const { t } = useI18n();

  useEffect(() => {
  setModo("servicos");
  setServicoSelecionado(null);
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

            if (!conflita) {
              horarios[dataISO].push(
                startSlot.toLocaleTimeString("pt-PT", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              );
            }
          }
        }

        dia.setDate(dia.getDate() + 1);
      }

      setHorariosPorDia(horarios);
    });
  }, [currentMonth, scheduleConfig]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "310px",
        margin: "0 auto",
        minHeight: "400px",
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
          <h3>Escolha um serviço</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {services.map((servico, idx) => (
              <div
                className="button"
                key={idx}
                onClick={() => {
                  setServicoSelecionado(servico);
                  setModo("calendario");
                }}
                style={{
                  cursor: "pointer",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
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
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  <strong>{t(servico.service)}</strong>
                  <strong>{servico.price[locationType]}</strong>
                </div>
              </div>
            ))}
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
          <h3>Escolha uma data</h3>
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
          <h3>Horários disponíveis</h3>
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
          <h3>Confirmar Agendamento</h3>
          <div style={{ marginTop: "16px", fontSize: "1rem" }}>
            <p><strong>Serviço:</strong> {t(servicoSelecionado?.service)}</p>
            <p><strong>Data:</strong> {diaSelecionado && new Date(diaSelecionado).toLocaleDateString("pt-PT")}</p>
            <p><strong>Horário:</strong> {horarioSelecionado}</p>
          </div>
          <button
            onClick={() => {
              alert("Agendado com sucesso!");
              // Aqui você pode integrar com envio de evento ao Google Calendar
            }}
            className="button"
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
              backgroundColor: "#dd4f3c",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Agendar
          </button>
        </div>
      </div>

    </div>
  );

};