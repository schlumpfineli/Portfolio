import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="container content">
        <Outlet />
      </main>
      <footer className="container footer">
        <p>Selina Schindler - Frontend Developer fuer digitale Care-Produkte</p>
      </footer>
    </div>
  )
}

export default Layout
