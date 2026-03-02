import { useEffect, useRef, useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'

const ANIMAL_OPTIONS = ['Hund', 'Katze', 'Anderes']
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FORM_LEVEL_ERROR_FIELDS = ['date', 'time']
const DATE_LABEL_FORMATTER = new Intl.DateTimeFormat('de-CH', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function sanitizePhone(value) {
  return value.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '')
}

function validateName(value) {
  if (value.trim().length < 2) {
    return 'Der Name sollte mindestens zwei Zeichen enthalten.'
  }
  return ''
}

function validateEmail(value) {
  if (!value.trim()) {
    return 'Bitte geben Sie eine E-Mail-Adresse ein.'
  }
  if (!EMAIL_PATTERN.test(value)) {
    return 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
  }
  return ''
}

function validatePhone(value) {
  if (!value.trim()) {
    return 'Bitte geben Sie eine Telefonnummer ein.'
  }
  if (value.replace(/\D/g, '').length < 8) {
    return 'Bitte geben Sie mindestens 8 Ziffern ein.'
  }
  return ''
}

function validateAnimalType(value) {
  if (!value) {
    return 'Bitte wählen Sie eine Tierart aus.'
  }
  return ''
}

function validateField(name, value) {
  if (name === 'name') return validateName(value)
  if (name === 'email') return validateEmail(value)
  if (name === 'phone') return validatePhone(value)
  if (name === 'animalType') return validateAnimalType(value)
  return ''
}

function getFieldState({ isFocused, hasError, isFilled, isValid, isDisabled }) {
  if (isDisabled) return 'disabled'
  if (hasError) return 'error'
  if (isFocused) return 'focused'
  if (isValid) return 'valid'
  if (isFilled) return 'filled'
  return 'default'
}

function formatBookingDate(date) {
  if (!date) {
    return 'Kein Datum ausgewählt'
  }

  return DATE_LABEL_FORMATTER.format(date)
}

function BookingForm({
  formData,
  onChange,
  onSubmitBooking,
  selectionErrors,
  isSubmitting,
  isSuccess,
  isLocked,
  hasSelectedDate,
  hasSelectedTime,
  selectedDate,
  selectedTime,
  onResetBooking,
}) {
  const [fieldErrors, setFieldErrors] = useState({})
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    animalType: false,
  })
  const [focusedField, setFocusedField] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const nameValidationTimerRef = useRef(null)

  const isDisabled = isSubmitting || isLocked
  const nameError = fieldErrors.name ?? ''
  const emailError = fieldErrors.email ?? ''
  const phoneError = fieldErrors.phone ?? ''
  const animalTypeError = fieldErrors.animalType ?? ''

  const isNameValid = touched.name && !nameError && formData.name.trim().length >= 2
  const isEmailValid = touched.email && !emailError && EMAIL_PATTERN.test(formData.email)
  const isPhoneValid =
    touched.phone && !phoneError && formData.phone.replace(/\D/g, '').length >= 8
  const isAnimalTypeValid = touched.animalType && !animalTypeError && Boolean(formData.animalType)

  const allRequiredValid =
    formData.name.trim().length >= 2 &&
    EMAIL_PATTERN.test(formData.email) &&
    formData.phone.replace(/\D/g, '').length >= 8 &&
    Boolean(formData.animalType)

  const updateFieldError = (name, error) => {
    setFieldErrors((prev) => ({
      ...prev,
      [name]: error || undefined,
    }))
  }

  const handleFocus = (name) => {
    setFocusedField(name)
  }

  const handleBlur = (name, value) => {
    setFocusedField((prev) => (prev === name ? '' : prev))
    setTouched((prev) => ({ ...prev, [name]: true }))
    updateFieldError(name, validateField(name, value))
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    const nextValue = name === 'phone' ? sanitizePhone(value) : value
    onChange({
      target: {
        name,
        value: nextValue,
      },
    })

    if (name === 'phone' && touched.phone) {
      updateFieldError('phone', validatePhone(nextValue))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setHasSubmitted(true)
    setTouched({
      name: true,
      email: true,
      phone: true,
      animalType: true,
    })

    const nextErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      animalType: validateAnimalType(formData.animalType),
    }

    setFieldErrors({
      name: nextErrors.name || undefined,
      email: nextErrors.email || undefined,
      phone: nextErrors.phone || undefined,
      animalType: nextErrors.animalType || undefined,
    })

    if (Object.values(nextErrors).some(Boolean)) {
      return
    }

    await onSubmitBooking()
  }

  useEffect(() => {
    if (nameValidationTimerRef.current) {
      clearTimeout(nameValidationTimerRef.current)
    }

    if (!formData.name.trim()) {
      return
    }

    nameValidationTimerRef.current = setTimeout(() => {
      setTouched((prev) => ({ ...prev, name: true }))
      updateFieldError('name', validateName(formData.name))
    }, 400)

    return () => {
      if (nameValidationTimerRef.current) {
        clearTimeout(nameValidationTimerRef.current)
      }
    }
  }, [formData.name])

  const submitDisabled = isDisabled || !allRequiredValid
  const submitLabel = isSubmitting
    ? 'Wird verarbeitet...'
    : isLocked
      ? 'Anfrage simuliert gespeichert'
      : 'Termin unverbindlich buchen'

  const suppressNameErrorWhileTyping =
    focusedField === 'name' &&
    formData.name.trim().length > 0 &&
    formData.name.trim().length < 2
  const shouldShowNameError =
    Boolean(nameError) && (touched.name || hasSubmitted) && !suppressNameErrorWhileTyping

  const nameState = getFieldState({
    isFocused: focusedField === 'name',
    hasError: shouldShowNameError,
    isFilled: Boolean(formData.name),
    isValid: isNameValid,
    isDisabled,
  })

  const emailState = getFieldState({
    isFocused: focusedField === 'email',
    hasError: Boolean(emailError) && (touched.email || hasSubmitted),
    isFilled: Boolean(formData.email),
    isValid: isEmailValid,
    isDisabled,
  })

  const phoneState = getFieldState({
    isFocused: focusedField === 'phone',
    hasError: Boolean(phoneError) && (touched.phone || hasSubmitted),
    isFilled: Boolean(formData.phone),
    isValid: isPhoneValid,
    isDisabled,
  })

  const animalState = getFieldState({
    isFocused: focusedField === 'animalType',
    hasError: Boolean(animalTypeError) && (touched.animalType || hasSubmitted),
    isFilled: Boolean(formData.animalType),
    isValid: isAnimalTypeValid,
    isDisabled,
  })

  return (
    <section className="booking-section">
      <div className="form-progress" aria-label="Buchungsfortschritt">
        <span className={`form-progress-step ${hasSelectedDate || isSuccess ? 'is-done' : ''}`}>
          Datum
        </span>
        <span className={`form-progress-step ${hasSelectedTime || isSuccess ? 'is-done' : ''}`}>
          Uhrzeit
        </span>
        <span className={`form-progress-step ${isSuccess ? 'is-done' : 'is-current'}`}>
          Kontaktdaten
        </span>
      </div>
      <h3>Kontaktdaten</h3>
      {isSuccess && (
        <article className="form-success" role="status" aria-live="polite">
          <p className="form-success-title">
            <span className="form-success-check" aria-hidden="true">
              ✓
            </span>
            Vielen Dank.
          </p>
          <p className="form-success-message">
            Ihre Anfrage wurde erfolgreich simuliert gespeichert.
          </p>
          <p className="form-success-note">
            Im Demo-Modus erfolgt keine echte Terminübertragung.
          </p>

          <dl className="form-success-summary">
            <div className="form-success-summary-item">
              <dt aria-hidden="true">📅</dt>
              <dd>{formatBookingDate(selectedDate)}</dd>
            </div>
            <div className="form-success-summary-item">
              <dt aria-hidden="true">🕒</dt>
              <dd>{selectedTime ? `${selectedTime} Uhr` : 'Keine Uhrzeit ausgewählt'}</dd>
            </div>
            <div className="form-success-summary-item">
              <dt aria-hidden="true">🐾</dt>
              <dd>{formData.animalType || 'Keine Tierart ausgewählt'}</dd>
            </div>
          </dl>

          {onResetBooking && (
            <button type="button" className="success-reset-btn" onClick={onResetBooking}>
              Neue Buchung starten
            </button>
          )}
        </article>
      )}

      <form
        className={`booking-form ${isLocked ? 'is-complete' : ''}`}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <div className="form-grid">
          <Input
            id="name"
            name="name"
            label="Name *"
            value={formData.name}
            onChange={handleInputChange}
            onFocus={() => handleFocus('name')}
            onBlur={(event) => handleBlur('name', event.target.value)}
            error={shouldShowNameError ? nameError : ''}
            state={nameState}
            showValidIcon={isNameValid}
            disabled={isDisabled}
            required
          />

          <Input
            id="email"
            name="email"
            type="email"
            label="E-Mail *"
            value={formData.email}
            onChange={handleInputChange}
            onFocus={() => handleFocus('email')}
            onBlur={(event) => handleBlur('email', event.target.value)}
            error={touched.email || hasSubmitted ? emailError : ''}
            state={emailState}
            showValidIcon={isEmailValid}
            disabled={isDisabled}
            required
          />

          <Input
            id="phone"
            name="phone"
            type="tel"
            label="Telefon *"
            value={formData.phone}
            onChange={handleInputChange}
            onFocus={() => handleFocus('phone')}
            onBlur={(event) => handleBlur('phone', event.target.value)}
            error={touched.phone || hasSubmitted ? phoneError : ''}
            state={phoneState}
            showValidIcon={isPhoneValid}
            disabled={isDisabled}
            required
          />
        </div>

        <fieldset className={`field radio-group radio-group-${animalState}`}>
          <legend className="label">Tierart *</legend>
          {ANIMAL_OPTIONS.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="animalType"
                value={option}
                checked={formData.animalType === option}
                onChange={handleInputChange}
                onFocus={() => handleFocus('animalType')}
                onBlur={() => handleBlur('animalType', formData.animalType)}
                disabled={isDisabled}
              />
              {option}
            </label>
          ))}
          {(touched.animalType || hasSubmitted) && animalTypeError && (
            <p className="error-text">{animalTypeError}</p>
          )}
        </fieldset>

        <div className="field">
          <label htmlFor="comment" className="label">
            Kommentar (optional)
          </label>
          <textarea
            id="comment"
            name="comment"
            rows="4"
            className="input textarea"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            value={formData.comment}
            onChange={handleInputChange}
            onFocus={() => handleFocus('comment')}
            onBlur={() => setFocusedField((prev) => (prev === 'comment' ? '' : prev))}
            disabled={isDisabled}
          />
        </div>

        {FORM_LEVEL_ERROR_FIELDS.map((field) =>
          selectionErrors[field] ? (
            <p key={field} className="error-text" role="alert">
              {selectionErrors[field]}
            </p>
          ) : null,
        )}

        <Button
          type="submit"
          className={`submit-btn ${isSubmitting ? 'is-loading' : ''}`}
          disabled={submitDisabled}
        >
          {isSubmitting && <span className="btn-spinner" aria-hidden="true" />}
          {submitLabel}
        </Button>

        <p className="form-trust-note">
          <span className="form-trust-dot" aria-hidden="true" />
          Ihre Daten werden ausschließlich zur Terminvereinbarung verwendet.
        </p>
      </form>
    </section>
  )
}

export default BookingForm
