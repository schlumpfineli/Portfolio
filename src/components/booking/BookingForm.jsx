import Button from '../ui/Button'
import Input from '../ui/Input'

const ANIMAL_OPTIONS = ['Hund', 'Katze', 'Anderes']
const FORM_LEVEL_ERROR_FIELDS = ['date', 'time']

function BookingForm({ formData, errors, onChange, onSubmit }) {
  return (
    <section className="booking-section">
      <h3>Kontaktdaten</h3>
      <form onSubmit={onSubmit} noValidate>
        <div className="form-grid">
          <Input
            id="name"
            name="name"
            label="Name *"
            value={formData.name}
            onChange={onChange}
            error={errors.name}
            required
          />

          <Input
            id="email"
            name="email"
            type="email"
            label="E-Mail *"
            value={formData.email}
            onChange={onChange}
            error={errors.email}
            required
          />

          <Input
            id="phone"
            name="phone"
            type="tel"
            label="Telefon *"
            value={formData.phone}
            onChange={onChange}
            error={errors.phone}
            required
          />
        </div>

        <fieldset className={`field radio-group ${errors.animalType ? 'field-error' : ''}`}>
          <legend className="label">Tierart *</legend>
          {ANIMAL_OPTIONS.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="animalType"
                value={option}
                checked={formData.animalType === option}
                onChange={onChange}
              />
              {option}
            </label>
          ))}
          {errors.animalType && <p className="error-text">{errors.animalType}</p>}
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
            value={formData.comment}
            onChange={onChange}
          />
        </div>

        {FORM_LEVEL_ERROR_FIELDS.map((field) =>
          errors[field] ? (
            <p key={field} className="error-text" role="alert">
              {errors[field]}
            </p>
          ) : null,
        )}

        <Button type="submit" className="submit-btn">
          Termin unverbindlich buchen
        </Button>
      </form>
    </section>
  )
}

export default BookingForm
