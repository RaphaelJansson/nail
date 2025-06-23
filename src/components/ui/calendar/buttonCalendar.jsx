export default function ButtonCalendar({
  id,
  label,
  selecionado,
  habilitado,
  hour = false,
  dimmed,
  onClick
}) {
  const classes = [
    hour ? 'button-hour' : 'button-calendar',
    selecionado && 'selected',
    dimmed && 'dimmed',
  ].filter(Boolean).join(' ');

  return (
    <button
      key={id}
      className={`${classes} button`}
      disabled={!habilitado}
      onClick={habilitado ? onClick : undefined}
    >
      {label}
    </button>
  );
}
