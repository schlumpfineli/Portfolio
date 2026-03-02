import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import HausarztProjectPage from './pages/HausarztProjectPage'
import ProjectDetailPage from './pages/ProjectDetailPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/projekte/tierarzt-terminbuchung"
          element={<ProjectDetailPage />}
        />
        <Route
          path="/projekte/digitale-hausarztpraxis"
          element={<HausarztProjectPage />}
        />
        <Route
          path="/projekte/redesign-haustierarztpraxis-baar"
          element={<Navigate to="/projekte/tierarzt-terminbuchung" replace />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
