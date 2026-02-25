import { Link } from 'react-router-dom'
import Button from '../ui/Button'

function Confirmation({ selectedDate, selectedTime, name }) {
  return (
    <section className="confirmation">
      <h3>Termin erfolgreich vorgemerkt</h3>
      <p>
        Danke {name}, deine Anfrage wurde simuliert und erfolgreich uebernommen.
      </p>
      <div className="confirmation-meta">
        <p>
          <strong>Datum:</strong>{' '}
          {selectedDate.toLocaleDateString('de-DE', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </p>
        <p>
          <strong>Uhrzeit:</strong> {selectedTime} Uhr
        </p>
      </div>
      <Link to="/">
        <Button variant="secondary">Zurueck zur Startseite</Button>
      </Link>
    </section>
  )
}

export default Confirmation
