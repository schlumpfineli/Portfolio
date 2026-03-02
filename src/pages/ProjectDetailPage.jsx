import { useEffect, useMemo, useRef, useState } from 'react'
import Calendar from '../components/booking/Calendar'
import TimeSlotSelector from '../components/booking/TimeSlotSelector'
import BookingForm from '../components/booking/BookingForm'

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
    why: 'Primärgrün markiert aktive Zustände, neutrale Grautöne halten Flächen ruhig.',
    impact: 'Klarere Hierarchie und weniger visuelle Überlastung.',
  },
  {
    number: '03',
    title: 'Eine Entscheidung pro Schritt',
    why: 'Datum -> Uhrzeit -> Kontaktdaten führt durch genau eine Entscheidung pro Schritt.',
    impact: 'Geringere kognitive Belastung und bessere Abschlusswahrscheinlichkeit.',
  },
]

const IMPACT_INTRO_PARAGRAPHS = [
  'Die Wirkung dieser Buchungsstrecke zeigt sich weniger in visuellen Effekten als in emotionaler Entlastung. Im Care-Kontext buchen Menschen häufig in Situationen, die bereits mit Unsicherheit verbunden sind. Ziel war es daher, nicht nur einen funktionierenden Flow zu gestalten, sondern einen Prozess, der Stabilität vermittelt.',
  'Die Kombination aus klarer Zustandslogik, sichtbaren Verfügbarkeiten und unmittelbarem Feedback sorgt dafür, dass Nutzer:innen jederzeit verstehen, was möglich ist, was als Nächstes folgt und wann der Prozess verlässlich abgeschlossen ist.',
]

const IMPACT_BLOCKS = [
  {
    id: 'impact-reduced-uncertainty',
    title: 'Reduzierte Unsicherheit',
    paragraphs: [
      'Unsicherheit entsteht vor allem dort, wo Systeme unklar reagieren oder Optionen nicht eindeutig kommunizieren. Durch klar unterscheidbare Zustände (available, selected, disabled, error) wird Interpretationsspielraum reduziert. Entscheidungen fühlen sich nicht zufällig an, sondern nachvollziehbar.',
      'Sofortiges, ruhiges Feedback während der Eingabe verhindert, dass Zweifel erst am Ende des Prozesses auftreten. Fehler werden nicht bestraft, sondern frühzeitig aufgefangen. Dadurch entsteht ein Gefühl von Kontrolle – ein zentraler Faktor in sensiblen Nutzungssituationen.',
    ],
  },
  {
    id: 'impact-lower-cognitive-load',
    title: 'Geringere kognitive Belastung',
    paragraphs: [
      'Die schrittweise Struktur – Datum → Uhrzeit → Kontaktdaten – reduziert die Entscheidungsdichte pro Bildschirm. Nutzer:innen müssen zu keinem Zeitpunkt mehrere komplexe Entscheidungen gleichzeitig treffen.',
      'Eine bewusst reduzierte Farbwelt, klare Typografie und großzügiger Weißraum unterstützen diese Entlastung zusätzlich. Statt zusätzliche Reize zu erzeugen, wird die Aufmerksamkeit gezielt geführt. Das System hilft bei der Entscheidung, anstatt sie zu erschweren.',
    ],
  },
  {
    id: 'impact-trust-through-behavior',
    title: 'Vertrauen durch erklärbares Verhalten',
    paragraphs: [
      'Vertrauen entsteht hier nicht durch visuelle Signale allein, sondern durch konsistentes Systemverhalten. Validierungen erfolgen nachvollziehbar, Fehlermeldungen sind konkret formuliert und der Success-State beendet die Interaktion bewusst.',
      'Der klare Abschluss des Flows verhindert Restunsicherheit („Wurde meine Anfrage gespeichert?“). Durch die Zusammenfassung der gewählten Daten wird Transparenz geschaffen. Das System zeigt nicht nur, dass es funktioniert – sondern wie es funktioniert.',
    ],
  },
  {
    id: 'impact-hypothetical-metrics',
    title: 'Hypothetische Metriken',
    paragraphs: [
      'In einem realen Produktkontext würde die Wirkung dieser Entscheidungen anhand folgender Kennzahlen überprüft werden:',
    ],
    listItems: [
      {
        label: 'Abbruchrate im Formular',
        text: 'Indikator dafür, ob Zustandslogik und Fehlermeldungen ausreichend Orientierung geben oder weiterhin Überforderung erzeugen.',
      },
      {
        label: 'Time-to-Completion',
        text: 'Zeigt, ob die Schrittführung effizient unterstützt oder unnötige Reibung erzeugt.',
      },
      {
        label: 'Fehlermeldungs-Häufigkeit pro Feld',
        text: 'Hilft zu identifizieren, welche Eingaben weiterhin missverständlich sind.',
      },
      {
        label: 'Mobile Completion Rate',
        text: 'Besonders relevant, da Terminbuchungen häufig mobil erfolgen.',
      },
    ],
    trailingParagraph:
      'Diese Metriken würden nicht nur Effizienz bewerten, sondern vor allem Prozesssicherheit und mentale Stabilität.',
  },
  {
    id: 'impact-product-perspective',
    title: 'Produktperspektive',
    paragraphs: [
      'Die hier entwickelte State-Logik ist nicht nur eine visuelle Entscheidung, sondern strukturelle Produktarbeit. Sie definiert, wann Interaktion möglich ist, wie Fehler behandelt werden und wie ein Prozess sauber endet.',
      'Dieses Muster lässt sich auf andere Care-Kontexte übertragen – etwa Intake-Flows, Nachsorge-Prozesse oder medizinische Terminbuchungen. Entscheidend ist dabei nicht die Oberfläche, sondern die konsequente Reduktion von Unsicherheit durch erklärbares Systemverhalten.',
    ],
  },
]

const REFLECTION_INTRO_PARAGRAPHS = [
  'Die entwickelte Buchungsstrecke zeigt, wie durch klare Zustandslogik und reduzierte Interaktion Unsicherheit verringert werden kann. Gleichzeitig bleibt sie eine erste Iteration – bewusst fokussiert auf Struktur, Feedback und mentale Entlastung.',
  'In einem realen Produktkontext würden die folgenden Punkte weiter vertieft und getestet.',
]

const REFLECTION_BLOCKS = [
  {
    id: 'reflection-validation-timing',
    title: '1. Validierungs-Timing weiter optimieren',
    paragraphs: [
      'Die aktuelle Lösung setzt auf kontextsensitives Feedback mit verzögerter Validierung. In einer nächsten Iteration würde geprüft, ob bestimmte Felder noch früher unterstützend reagieren können – etwa durch Inline-Hinweise vor einem Fehlerzustand.',
      'Ziel wäre es, Fehler nicht nur korrekt anzuzeigen, sondern sie möglichst zu verhindern.',
    ],
  },
  {
    id: 'reflection-progress-indicator',
    title: '2. Progress-Indikator für mehr Transparenz',
    paragraphs: [
      'Obwohl der Flow bewusst reduziert ist, könnte ein subtiler Fortschrittsindikator zusätzliche Orientierung bieten – insbesondere für Nutzer:innen, die Prozesslänge abschätzen möchten.',
      'Ein diskreter Step-Indicator (z. B. „Schritt 2 von 3“) würde Erwartungssicherheit weiter erhöhen, ohne visuelle Unruhe zu erzeugen.',
    ],
  },
  {
    id: 'reflection-contextual-help',
    title: '3. Kontextuelle Hilfestellungen',
    paragraphs: [
      'In sensiblen Situationen entstehen häufig Rückfragen. Eine nächste Iteration könnte kontextabhängige Micro-Hilfen integrieren – etwa kurze Hinweise bei gesperrten Terminen oder erklärende Texte bei bestimmten Eingaben.',
      'Wichtig wäre dabei, Hilfe nur bei Bedarf sichtbar zu machen, um die visuelle Ruhe nicht zu stören.',
    ],
  },
  {
    id: 'reflection-edge-cases',
    title: '4. Edge Cases & Ausnahmezustände',
    paragraphs: [
      'Die aktuelle Demo simuliert einen idealen Flow. In einem realen System müssten zusätzlich behandelt werden:',
    ],
    listItems: [
      'Terminüberschneidungen',
      'kurzfristige Absagen',
      'Netzwerkunterbrechungen',
      'Systemfehler',
    ],
    trailingParagraph:
      'Gerade im Care-Kontext ist ein transparenter Umgang mit Ausnahmezuständen entscheidend für langfristiges Vertrauen.',
  },
  {
    id: 'reflection-accessibility',
    title: '5. Accessibility-Vertiefung',
    paragraphs: [
      'Die bestehende Struktur berücksichtigt Fokus-Zustände und klare Beschriftungen. In einer weiteren Iteration würde die Barrierefreiheit systematisch geprüft, insbesondere im Hinblick auf:',
    ],
    listItems: [
      'Screenreader-Kompatibilität',
      'Kontrastwerte',
      'Tastaturnavigation',
      'Fehlermeldungs-Verknüpfungen (aria-describedby)',
    ],
    trailingParagraph: 'Care-Produkte müssen nicht nur ruhig, sondern zugänglich sein.',
  },
  {
    id: 'reflection-personal-insight',
    title: 'Persönliche Erkenntnis',
    paragraphs: [
      'Die Arbeit an dieser Buchungsstrecke hat gezeigt, dass State-Logik nicht nur visuelle Konsistenz bedeutet, sondern psychologische Stabilität. Kleine Entscheidungen – etwa wann ein Fehler erscheint oder wie ein Prozess endet – beeinflussen maßgeblich, wie sicher sich Menschen im System fühlen.',
      'Die Reduktion von Unsicherheit ist weniger eine Designfrage als eine strukturelle Produktentscheidung.',
    ],
  },
]

function ProjectImpactBlock({ block }) {
  return (
    <article className="project-impact-block">
      <h3>{block.title}</h3>
      {block.paragraphs.map((paragraph, index) => (
        <p key={`${block.id}-paragraph-${index}`}>{paragraph}</p>
      ))}

      {block.listItems ? (
        <ul className="project-impact-metrics">
          {block.listItems.map((item, index) => (
            <li key={`${block.id}-item-${index}`}>
              {typeof item === 'string' ? (
                item
              ) : (
                <>
                  <strong>{item.label}:</strong> {item.text}
                </>
              )}
            </li>
          ))}
        </ul>
      ) : null}

      {block.trailingParagraph ? <p>{block.trailingParagraph}</p> : null}
    </article>
  )
}

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

function ProjectDetailPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1))
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectionErrors, setSelectionErrors] = useState({})
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [isContactFormLocked, setIsContactFormLocked] = useState(false)
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
    setBookingSuccess(false)
    setSelectionErrors((prev) => ({ ...prev, date: undefined }))
    clearSelectionError('time')

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

  const clearSelectionError = (fieldName) => {
    setSelectionErrors((prev) => ({ ...prev, [fieldName]: undefined }))
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setBookingSuccess(false)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    setBookingSuccess(false)
    clearSelectionError('time')

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

  const handleSubmitBooking = async () => {
    const nextSelectionErrors = {}

    if (!selectedDate) {
      nextSelectionErrors.date = 'Bitte wähle ein Datum aus.'
    }

    if (!selectedTime) {
      nextSelectionErrors.time = 'Bitte wähle eine Uhrzeit aus.'
    }

    setSelectionErrors(nextSelectionErrors)

    if (Object.keys(nextSelectionErrors).length > 0) {
      return { ok: false }
    }

    setIsSubmittingBooking(true)
    setBookingSuccess(false)

    await new Promise((resolve) => {
      setTimeout(resolve, 720)
    })

    setIsSubmittingBooking(false)
    setBookingSuccess(true)
    setIsContactFormLocked(true)
    return { ok: true }
  }

  const handleResetBookingFlow = () => {
    setSelectedDate(null)
    setSelectedTime('')
    setSelectionErrors({})
    setBookingSuccess(false)
    setIsContactFormLocked(false)
    setIsSubmittingBooking(false)
    setFormData({ ...INITIAL_FORM_DATA })
    setTimeSlots([])
    setIsTimeSlotsLoading(false)
    setHighlightTimeSlotSection(false)
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

  return (
    <div className="project-page">
      <section className="section">
        <p className="eyebrow">Projekt-Detail</p>
        <h1>Tierarzt Terminbuchung</h1>
        <p className="lead">
          Diese Demo zeigt, wie eine sensible Buchungsstrecke für Tierhalterinnen
          und Tierhalter klar, ruhig und vertrauensvoll gestaltet werden kann.
        </p>
      </section>

      <section className="section split">
        <article className="project-problem-editorial">
          <p className="project-problem-intro">
            Mobile Terminprozesse wirken oft komplexer als nötig - besonders in
            sensiblen Situationen.
          </p>

          <div className="project-problem-columns">
            <section className="project-problem-block">
              <p className="project-problem-label">Analyse</p>
              <h2>Problem</h2>
              <ul className="project-problem-list">
                <li>Unklare Verfügbarkeiten erzeugen Unsicherheit.</li>
                <li>Fehlende Orientierung erschwert den Einstieg.</li>
                <li>Formulare wirken streng statt unterstützend.</li>
                <li>Fehlermeldungen sind unklar oder zu spät sichtbar.</li>
              </ul>
            </section>

            <section className="project-problem-block">
              <p className="project-problem-label">Strategie</p>
              <h2>Ziel</h2>
              <ul className="project-problem-list">
                <li>Klare, schrittweise Nutzerführung.</li>
                <li>Eindeutige UI-States: available, selected, disabled, error.</li>
                <li>Ruhige visuelle Sprache mit viel Weißraum.</li>
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
            onChange={handleFormChange}
            onSubmitBooking={handleSubmitBooking}
            selectionErrors={selectionErrors}
            isSubmitting={isSubmittingBooking}
            isSuccess={bookingSuccess}
            isLocked={isContactFormLocked}
            hasSelectedDate={Boolean(selectedDate)}
            hasSelectedTime={Boolean(selectedTime)}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onResetBooking={handleResetBookingFlow}
          />
        </div>
      </section>

      <section className="section project-impact">
        <h2>Ergebnis & Wirkung</h2>
        {IMPACT_INTRO_PARAGRAPHS.map((paragraph, index) => (
          <p key={`impact-intro-${index}`} className="project-impact-intro">
            {paragraph}
          </p>
        ))}

        <div className="project-impact-list">
          {IMPACT_BLOCKS.map((block) => (
            <ProjectImpactBlock key={block.id} block={block} />
          ))}
        </div>
      </section>

      <section className="section project-impact">
        <h2>Reflexion & nächste Iteration</h2>
        {REFLECTION_INTRO_PARAGRAPHS.map((paragraph, index) => (
          <p key={`reflection-intro-${index}`} className="project-impact-intro">
            {paragraph}
          </p>
        ))}

        <div className="project-impact-list">
          {REFLECTION_BLOCKS.map((block) => (
            <ProjectImpactBlock key={block.id} block={block} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProjectDetailPage
