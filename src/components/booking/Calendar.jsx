const WEEK_DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

function buildCalendarCells(year, month) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const offset = (firstDay.getDay() + 6) % 7
  const cells = []

  for (let i = 0; i < offset; i += 1) {
    cells.push(null)
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day))
  }

  return cells
}

function Calendar({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
  selectedDate,
  onSelectDate,
  isDateUnavailable,
}) {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const monthLabel = currentMonth.toLocaleDateString('de-DE', {
    month: 'long',
    year: 'numeric',
  })
  const cells = buildCalendarCells(year, month)

  const selectedDayKey = selectedDate ? selectedDate.toDateString() : ''

  return (
    <section className="booking-section">
      <div className="calendar-header">
        <h3>Datum auswaehlen</h3>
        <div className="calendar-controls">
          <button
            type="button"
            className="icon-btn"
            onClick={onPreviousMonth}
            aria-label="Vorheriger Monat"
          >
            ‹
          </button>
          <p className="month-label">{monthLabel}</p>
          <button
            type="button"
            className="icon-btn"
            onClick={onNextMonth}
            aria-label="Naechster Monat"
          >
            ›
          </button>
        </div>
      </div>

      <div className="calendar-grid week-days" aria-hidden="true">
        {WEEK_DAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {cells.map((date, index) => {
          if (!date) {
            return <span key={`empty-${index}`} className="calendar-cell empty" />
          }

          const unavailable = isDateUnavailable(date)
          const isSelected = selectedDayKey === date.toDateString()

          return (
            <button
              key={date.getTime()}
              type="button"
              className={`calendar-cell day ${isSelected ? 'selected' : ''}`}
              disabled={unavailable}
              aria-disabled={unavailable}
              onClick={() => onSelectDate(date)}
              aria-label={date.toLocaleDateString('de-DE', {
                weekday: 'long',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
              aria-pressed={isSelected}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default Calendar
