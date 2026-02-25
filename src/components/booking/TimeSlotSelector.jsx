import { useEffect, useRef, useState } from 'react'

function formatDateLabel(date) {
  return date.toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function TimeSlotSelector({ slots, selectedTime, onSelectTime, selectedDate, isLoading }) {
  const [pressedSlot, setPressedSlot] = useState('')
  const pressedSlotTimerRef = useRef(null)

  const hasSlotAvailable = slots.some((slot) => !slot.isDisabled)
  const selectedDateLabel = selectedDate ? formatDateLabel(selectedDate) : ''

  const handleSlotClick = (slot) => {
    if (slot.isDisabled) {
      return
    }

    onSelectTime(slot.time)
    setPressedSlot(slot.time)

    if (pressedSlotTimerRef.current) {
      clearTimeout(pressedSlotTimerRef.current)
    }

    pressedSlotTimerRef.current = setTimeout(() => {
      setPressedSlot('')
      pressedSlotTimerRef.current = null
    }, 220)
  }

  const getSlotClassName = (slot, isSelected) =>
    [
      'time-slot',
      isSelected ? 'selected' : '',
      slot.isPastTime ? 'is-past-time' : '',
      slot.isBlocked ? 'is-blocked' : '',
      slot.hasSlotAvailable ? 'is-available' : '',
      pressedSlot === slot.time ? 'pressing' : '',
    ]
      .filter(Boolean)
      .join(' ')

  useEffect(
    () => () => {
      if (pressedSlotTimerRef.current) {
        clearTimeout(pressedSlotTimerRef.current)
      }
    },
    [],
  )

  return (
    <section className={`booking-section time-slot-section ${isLoading ? 'is-loading' : ''}`}>
      <h3>Uhrzeit auswaehlen</h3>
      {selectedDate && <p className="time-slot-date-label">Termine am {selectedDateLabel}</p>}

      {!selectedDate && (
        <p className="time-slot-empty">Bitte waehle zuerst ein Datum aus.</p>
      )}

      {selectedDate && !isLoading && !hasSlotAvailable && (
        <p className="time-slot-empty">Fuer dieses Datum sind keine Termine verfuegbar.</p>
      )}

      <div className="time-slot-grid">
        {slots.map((slot) => {
          const isSelected = selectedTime === slot.time
          const availabilityLabel = slot.isDisabled
            ? slot.isPastTime
              ? 'bereits vergangen'
              : 'keine Termine verfuegbar'
            : 'verfuegbar'

          return (
            <button
              key={slot.time}
              type="button"
              className={getSlotClassName(slot, isSelected)}
              disabled={slot.isDisabled}
              aria-disabled={slot.isDisabled}
              onClick={() => handleSlotClick(slot)}
              aria-pressed={isSelected}
              aria-label={`Uhrzeit ${slot.time}, ${availabilityLabel}`}
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
