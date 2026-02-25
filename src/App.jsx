import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import RedesignCaseStudyPage from './pages/RedesignCaseStudyPage'

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
          path="/projekte/redesign-haustierarztpraxis-baar"
          element={<RedesignCaseStudyPage />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
