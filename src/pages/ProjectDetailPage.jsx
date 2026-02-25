import { useMemo, useState } from 'react'
import Calendar from '../components/booking/Calendar'
import TimeSlotSelector from '../components/booking/TimeSlotSelector'
import BookingForm from '../components/booking/BookingForm'
import Confirmation from '../components/booking/Confirmation'

const BLOCKED_DAYS = [
  '2026-03-06',
  '2026-03-12',
  '2026-03-19',
  '2026-04-03',
  '2026-04-09',
]

const TIME_SLOTS = [
  { time: '09:00', disabled: false },
  { time: '10:00', disabled: false },
  { time: '11:00', disabled: true },
  { time: '13:30', disabled: false },
  { time: '15:00', disabled: false },
  { time: '16:30', disabled: true },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  animalType: '',
  comment: '',
}

function toIsoDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function validate(formData, selectedDate, selectedTime) {
  const nextErrors = {}

  if (!formData.name.trim()) {
    nextErrors.name = 'Bitte gib deinen Namen an.'
  }

  if (!formData.email.trim()) {
    nextErrors.email = 'Bitte gib deine E-Mail-Adresse an.'
  } else if (!EMAIL_PATTERN.test(formData.email)) {
    nextErrors.email = 'Bitte gib eine gueltige E-Mail-Adresse ein.'
  }

  if (!formData.phone.trim()) {
    nextErrors.phone = 'Bitte gib eine Telefonnummer an.'
  }

  if (!formData.animalType) {
    nextErrors.animalType = 'Bitte waehle eine Tierart aus.'
  }

  if (!selectedDate) {
    nextErrors.date = 'Bitte waehle ein Datum aus.'
  }

  if (!selectedTime) {
    nextErrors.time = 'Bitte waehle eine Uhrzeit aus.'
  }

  return nextErrors
}

function ProjectDetailPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1))
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState(() => ({ ...INITIAL_FORM_DATA }))

  const blockedDaysSet = useMemo(() => new Set(BLOCKED_DAYS), [])

  const isDateUnavailable = (date) => {
    const day = date.getDay()
    const isWeekend = day === 0 || day === 6
    const isBlocked = blockedDaysSet.has(toIsoDate(date))
    return isWeekend || isBlocked
  }

  const handleDateSelect = (date) => {
    if (isDateUnavailable(date)) {
      return
    }

    setSelectedDate(date)
    setErrors((prev) => ({ ...prev, date: undefined }))
  }

  const clearFieldError = (fieldName) => {
    setErrors((prev) => ({ ...prev, [fieldName]: undefined }))
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    clearFieldError(name)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    clearFieldError('time')
  }

  const shiftCurrentMonth = (offset) => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validate(formData, selectedDate, selectedTime)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setSubmitted(true)
  }

  if (submitted && selectedDate && selectedTime) {
    return (
      <section className="section">
        <Confirmation
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          name={formData.name}
        />
      </section>
    )
  }

  return (
    <div className="project-page">
      <section className="section">
        <p className="eyebrow">Projekt-Detail</p>
        <h1>Tierarzt Terminbuchung</h1>
        <p className="lead">
          Diese Demo zeigt, wie eine sensible Buchungsstrecke fuer Tierhalterinnen
          und Tierhalter klar, ruhig und vertrauensvoll gestaltet werden kann.
        </p>
      </section>

      <section className="section split">
        <article className="card">
          <h2>Ziel & Problem</h2>
          <p>
            Viele Terminprozesse sind auf mobilen Geraeten zu kompliziert.
            Unsicherheit entsteht besonders bei gesperrten Zeiten und unklaren
            Formularanforderungen.
          </p>
        </article>
        <article className="card">
          <h2>Designentscheidungen</h2>
          <p>
            Fokus auf mobile Lesbarkeit, klare Zustandsdarstellung (selected,
            disabled, error) und eine reduzierte visuelle Sprache mit viel
            Weissraum.
          </p>
        </article>
      </section>

      <section className="section demo-shell">
        <h2>Interaktive Demo</h2>
        <p className="demo-intro">
          Die Buchung wird ohne Backend simuliert. Alle Daten bleiben lokal im
          State.
        </p>

        <Calendar
          currentMonth={currentMonth}
          onPreviousMonth={() => shiftCurrentMonth(-1)}
          onNextMonth={() => shiftCurrentMonth(1)}
          selectedDate={selectedDate}
          onSelectDate={handleDateSelect}
          isDateUnavailable={isDateUnavailable}
        />

        <TimeSlotSelector
          slots={TIME_SLOTS}
          selectedTime={selectedTime}
          onSelectTime={handleTimeSelect}
        />

        <BookingForm
          formData={formData}
          errors={errors}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
        />
      </section>
    </div>
  )
}

export default ProjectDetailPage
