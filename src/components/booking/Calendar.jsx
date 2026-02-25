import { useEffect, useRef, useState } from 'react'

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
  getDateBusinessState,
}) {
  const [monthTransitionDirection, setMonthTransitionDirection] = useState('next')
  const [pressedDayKey, setPressedDayKey] = useState('')
  const pressedDayTimerRef = useRef(null)

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const monthLabel = currentMonth.toLocaleDateString('de-DE', {
    month: 'long',
    year: 'numeric',
  })
  const cells = buildCalendarCells(year, month)

  const selectedDayKey = selectedDate ? selectedDate.toDateString() : ''
  const todayKey = new Date().toDateString()

  const handlePreviousMonth = () => {
    setMonthTransitionDirection('previous')
    onPreviousMonth()
  }

  const handleNextMonth = () => {
    setMonthTransitionDirection('next')
    onNextMonth()
  }

  const handleDayClick = (date) => {
    const businessState = getDateBusinessState(date)

    if (businessState.isDisabled) {
      return
    }

    const dateKey = date.toDateString()
    onSelectDate(date)
    setPressedDayKey(dateKey)

    if (pressedDayTimerRef.current) {
      clearTimeout(pressedDayTimerRef.current)
    }

    pressedDayTimerRef.current = setTimeout(() => {
      setPressedDayKey('')
      pressedDayTimerRef.current = null
    }, 220)
  }

  useEffect(
    () => () => {
      if (pressedDayTimerRef.current) {
        clearTimeout(pressedDayTimerRef.current)
      }
    },
    [],
  )

  return (
    <section className="booking-section">
      <div className="calendar-header">
        <p className="calendar-helper">Wählen Sie ein passendes Datum</p>
        <h3>Datum auswaehlen</h3>
        <div className="calendar-controls">
          <button
            type="button"
            className="icon-btn"
            onClick={handlePreviousMonth}
            aria-label="Vorheriger Monat"
          >
            ‹
          </button>
          <p
            key={`${year}-${month}`}
            className={`month-label month-label-${monthTransitionDirection}`}
          >
            {monthLabel}
          </p>
          <button
            type="button"
            className="icon-btn"
            onClick={handleNextMonth}
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

          const businessState = getDateBusinessState(date)
          const unavailable = businessState.isDisabled
          const isSelected = !unavailable && selectedDayKey === date.toDateString()
          const isToday = todayKey === date.toDateString()
          const isWeekend = date.getDay() === 0 || date.getDay() === 6
          const isPressed = pressedDayKey === date.toDateString()
          const dayAvailabilityLabel = unavailable
            ? 'keine Termine verfuegbar'
            : 'verfuegbar'
          const businessClasses = [
            businessState.isPast ? 'business-past' : '',
            businessState.isFullyBooked ? 'business-fully-booked' : '',
            businessState.isWeekendClosed ? 'business-weekend-closed' : '',
            businessState.hasAvailableSlots ? 'business-available' : '',
          ]
            .filter(Boolean)
            .join(' ')
          const dayClasses = [
            'calendar-cell',
            'day',
            businessClasses,
            isSelected ? 'selected' : '',
            isToday ? 'today' : '',
            isWeekend ? 'weekend' : '',
            isPressed ? 'pressing' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <button
              key={date.getTime()}
              type="button"
              className={dayClasses}
              disabled={unavailable}
              aria-disabled={unavailable}
              onClick={() => handleDayClick(date)}
              aria-label={`${date.toLocaleDateString('de-DE', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}, ${dayAvailabilityLabel}`}
              aria-pressed={isSelected}
              aria-current={isToday ? 'date' : undefined}
              title={unavailable ? 'Keine Termine verfuegbar' : undefined}
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
