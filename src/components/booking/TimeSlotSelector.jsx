function TimeSlotSelector({ slots, selectedTime, onSelectTime }) {
  const getSlotClassName = (isSelected) => `time-slot ${isSelected ? 'selected' : ''}`

  return (
    <section className="booking-section">
      <h3>Uhrzeit auswaehlen</h3>
      <div className="time-slot-grid">
        {slots.map(({ time, disabled }) => {
          const isSelected = selectedTime === time

          return (
            <button
              key={time}
              type="button"
              className={getSlotClassName(isSelected)}
              disabled={disabled}
              aria-disabled={disabled}
              onClick={() => onSelectTime(time)}
              aria-pressed={isSelected}
            >
              {time}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default TimeSlotSelector
