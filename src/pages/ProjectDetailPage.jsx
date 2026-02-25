import { useEffect, useMemo, useRef, useState } from 'react'
import Calendar from '../components/booking/Calendar'
import TimeSlotSelector from '../components/booking/TimeSlotSelector'
import BookingForm from '../components/booking/BookingForm'
import Confirmation from '../components/booking/Confirmation'

const BASE_SLOT_TIMES = ['09:00', '10:00', '11:00', '13:30', '15:00', '16:30']
const DEFAULT_DISABLED_TIMES = ['11:00', '16:30']
const DATE_SLOT_OVERRIDES = {
  '2026-03-06': { disabledTimes: BASE_SLOT_TIMES },
  '2026-03-12': { disabledTimes: BASE_SLOT_TIMES },
  '2026-03-19': { disabledTimes: BASE_SLOT_TIMES },
  '2026-04-03': { disabledTimes: BASE_SLOT_TIMES },
  '2026-04-09': { disabledTimes: BASE_SLOT_TIMES },
  '2026-03-10': { disabledTimes: ['10:00', '13:30'] },
  '2026-03-17': { disabledTimes: ['09:00', '15:00'] },
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  animalType: '',
  comment: '',
}
const DESIGN_DECISIONS = [
  {
    number: '01',
    title: 'Klare Zustandslogik',
    why: 'Available, selected, disabled und error sind visuell eindeutig unterscheidbar.',
    impact: 'Sicherheit bei der Terminwahl und reduzierte Fehlinterpretation.',
  },
  {
    number: '02',
    title: 'Bewusst reduzierte Farbwelt',
    why: 'Primaergruen markiert aktive Zustaende, neutrale Grautoene halten Flaechen ruhig.',
    impact: 'Klarere Hierarchie und weniger visuelle Ueberlastung.',
  },
  {
    number: '03',
    title: 'Eine Entscheidung pro Schritt',
    why: 'Datum -> Uhrzeit -> Kontaktdaten fuehrt durch genau eine Entscheidung pro Schritt.',
    impact: 'Geringere kognitive Belastung und bessere Abschlusswahrscheinlichkeit.',
  },
]

function toIsoDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function toDateOnly(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function parseTimeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function buildSlotsForDate(date, now = new Date()) {
  const override = DATE_SLOT_OVERRIDES[toIsoDate(date)]
  const disabledTimes = override?.disabledTimes ?? DEFAULT_DISABLED_TIMES
  const disabledSet = new Set(disabledTimes)
  const isToday = toIsoDate(toDateOnly(now)) === toIsoDate(date)
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  return BASE_SLOT_TIMES.map((time) => {
    const isBlocked = disabledSet.has(time)
    const isPastTime = isToday && parseTimeToMinutes(time) < currentMinutes
    const isDisabled = isBlocked || isPastTime

    return {
      time,
      hasSlotAvailable: !isDisabled,
      isBlocked,
      isPastTime,
      isDisabled,
    }
  })
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
  const [showDesignDecisions, setShowDesignDecisions] = useState(false)
  const [highlightTimeSlotSection, setHighlightTimeSlotSection] = useState(false)
  const [timeSlots, setTimeSlots] = useState([])
  const [isTimeSlotsLoading, setIsTimeSlotsLoading] = useState(false)
  const designDecisionsRef = useRef(null)
  const timeSlotSectionRef = useRef(null)
  const bookingFormSectionRef = useRef(null)
  const flowHighlightTimerRef = useRef(null)
  const timeSlotLoadingTimerRef = useRef(null)

  const getDateBusinessState = useMemo(
    () => (date) => {
      const today = toDateOnly(new Date())
      const day = toDateOnly(date)
      const isPast = day < today
      const isWeekendClosed = day.getDay() === 0 || day.getDay() === 6
      const slotsForDate = buildSlotsForDate(day)
      const hasAvailableSlots = slotsForDate.some((slot) => slot.hasSlotAvailable)
      const isFullyBooked = !hasAvailableSlots
      const isDisabled = isPast || isFullyBooked || isWeekendClosed

      return {
        isPast,
        hasAvailableSlots,
        isFullyBooked,
        isWeekendClosed,
        isDisabled,
      }
    },
    [],
  )

  const handleDateSelect = (date) => {
    const businessState = getDateBusinessState(date)

    if (businessState.isDisabled) {
      return
    }

    setSelectedDate(date)
    setSelectedTime('')
    setErrors((prev) => ({ ...prev, date: undefined }))
    clearFieldError('time')

    setIsTimeSlotsLoading(true)
    if (timeSlotLoadingTimerRef.current) {
      clearTimeout(timeSlotLoadingTimerRef.current)
    }
    timeSlotLoadingTimerRef.current = setTimeout(() => {
      setTimeSlots(buildSlotsForDate(date))
      setIsTimeSlotsLoading(false)
      timeSlotLoadingTimerRef.current = null
    }, 180)

    if (flowHighlightTimerRef.current) {
      clearTimeout(flowHighlightTimerRef.current)
    }

    setHighlightTimeSlotSection(false)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const slotSectionElement = timeSlotSectionRef.current

        if (!slotSectionElement) {
          return
        }

        const prefersReducedMotion =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches

        slotSectionElement.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'nearest',
        })

        setHighlightTimeSlotSection(true)
        flowHighlightTimerRef.current = setTimeout(() => {
          setHighlightTimeSlotSection(false)
          flowHighlightTimerRef.current = null
        }, 900)
      })
    })
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

    requestAnimationFrame(() => {
      const bookingSectionElement = bookingFormSectionRef.current

      if (!bookingSectionElement) {
        return
      }

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      bookingSectionElement.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'nearest',
      })
    })
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

  useEffect(() => {
    const sectionElement = designDecisionsRef.current

    if (!sectionElement) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        setShowDesignDecisions(true)
        observer.disconnect()
      },
      {
        threshold: 0.2,
      },
    )

    observer.observe(sectionElement)

    return () => observer.disconnect()
  }, [])

  useEffect(
    () => () => {
      if (flowHighlightTimerRef.current) {
        clearTimeout(flowHighlightTimerRef.current)
      }

      if (timeSlotLoadingTimerRef.current) {
        clearTimeout(timeSlotLoadingTimerRef.current)
      }
    },
    [],
  )

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
        <article className="project-problem-editorial">
          <p className="project-problem-intro">
            Mobile Terminprozesse wirken oft komplexer als noetig - besonders in
            sensiblen Situationen.
          </p>

          <div className="project-problem-columns">
            <section className="project-problem-block">
              <p className="project-problem-label">Analyse</p>
              <h2>Problem</h2>
              <ul className="project-problem-list">
                <li>Unklare Verfuegbarkeiten erzeugen Unsicherheit.</li>
                <li>Fehlende Orientierung erschwert den Einstieg.</li>
                <li>Formulare wirken streng statt unterstuetzend.</li>
                <li>Fehlermeldungen sind unklar oder zu spaet sichtbar.</li>
              </ul>
            </section>

            <section className="project-problem-block">
              <p className="project-problem-label">Strategie</p>
              <h2>Ziel</h2>
              <ul className="project-problem-list">
                <li>Klare, schrittweise Nutzerfuehrung.</li>
                <li>Eindeutige UI-States: available, selected, disabled, error.</li>
                <li>Ruhige visuelle Sprache mit viel Weissraum.</li>
                <li>Vertrauen durch sofortiges Feedback.</li>
              </ul>
            </section>
          </div>

          <p className="project-problem-note">
            Demo ohne Backend - lokal im State simuliert.
          </p>
        </article>
      </section>

      <section
        ref={designDecisionsRef}
        className={`section design-decisions ${showDesignDecisions ? 'is-visible' : ''}`}
      >
        <h2>Designentscheidungen</h2>
        <div className="decision-list">
          {DESIGN_DECISIONS.map((decision, index) => (
            <article
              key={decision.number}
              className="decision-block"
              style={{ '--block-delay': `${index * 120}ms` }}
            >
              <div className="decision-heading">
                <span className="decision-number" aria-hidden="true">
                  {decision.number}
                </span>
                <h3 className="decision-title">{decision.title}</h3>
              </div>
              <div className="decision-content">
                <p className="decision-why">{decision.why}</p>
                <p className="decision-impact">
                  <strong>Wirkung:</strong> {decision.impact}
                </p>
                <p className="decision-context">Kontext: Mobile-first Booking Flow</p>
              </div>
            </article>
          ))}
        </div>
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
          getDateBusinessState={getDateBusinessState}
        />

        <div
          ref={timeSlotSectionRef}
          className={`time-slot-flow-anchor ${highlightTimeSlotSection ? 'flow-highlight' : ''}`}
        >
          <TimeSlotSelector
            slots={timeSlots}
            selectedTime={selectedTime}
            onSelectTime={handleTimeSelect}
            selectedDate={selectedDate}
            isLoading={isTimeSlotsLoading}
          />
        </div>

        <div ref={bookingFormSectionRef}>
          <BookingForm
            formData={formData}
            errors={errors}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
          />
        </div>
      </section>
    </div>
  )
}

export default ProjectDetailPage
