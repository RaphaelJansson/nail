import { toLocalISODate } from "../../../util/toLocalISODate";
import ButtonCalendar from "./buttonCalendar";

export default function GridCalendar({
  currentMonth,
  hoje,
  horariosPorDia,
  diaSelecionado,
  setDiaSelecionado,
}) {
  const semanas = [];
  const primeiroDia = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const ultimoDia = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

  const diaInicio = new Date(primeiroDia);
  diaInicio.setDate(diaInicio.getDate() - diaInicio.getDay());

  const diaFim = new Date(ultimoDia);
  diaFim.setDate(diaFim.getDate() + (6 - diaFim.getDay()));

  let data = new Date(diaInicio);
  while (data <= diaFim) {
    const semana = [];
    for (let d = 0; d < 7; d++) {
      const dataISO = toLocalISODate(data);
      const foraDoMes = data.getMonth() !== currentMonth.getMonth();
      const ativo = horariosPorDia[dataISO]?.length > 0;
      // Compare dates without time to allow current day selection
      const hojeDate = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
      const dataDate = new Date(data.getFullYear(), data.getMonth(), data.getDate());
      const habilitado = ativo && !foraDoMes && dataDate >= hojeDate;

      const label = foraDoMes ? "..." : data.getDate().toString().padStart(2, "0");

      semana.push(
        <ButtonCalendar
          key={dataISO}
          dataISO={dataISO}
          label={label}
          selecionado={diaSelecionado === dataISO}
          habilitado={habilitado}
          foraDoMes={foraDoMes}
          onClick={() => setDiaSelecionado(dataISO)}
        />
      );

      data.setDate(data.getDate() + 1);
    }

    semanas.push(
      <div key={data.toISOString()} style={{ display: "flex", gap: "4px", marginBottom: "6px" }}>
        {semana}
      </div>
    );
  }

  return <>{semanas}</>;
}
