import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { BuilderPage } from './pages/BuilderPage'
import { ChampionsPage } from './pages/ChampionsPage'
import { CompsPage } from './pages/CompsPage'
import { LandingPage } from './pages/LandingPage'
import { MetaPage } from './pages/MetaPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AppLayout />}>
          <Route path="/meta" element={<MetaPage />} />
          <Route path="/comps" element={<CompsPage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/champions" element={<ChampionsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
