function TimeSlotSelector({ slots, selectedTime, onSelectTime }) {
  return (
    <section className="booking-section">
      <h3>Uhrzeit auswaehlen</h3>
      <div className="time-slot-grid">
        {slots.map((slot) => {
          const isSelected = selectedTime === slot.time
          return (
            <button
              key={slot.time}
              type="button"
              className={`time-slot ${isSelected ? 'selected' : ''}`}
              disabled={slot.disabled}
              onClick={() => onSelectTime(slot.time)}
              aria-pressed={isSelected}
            >
              {slot.time}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default TimeSlotSelector
