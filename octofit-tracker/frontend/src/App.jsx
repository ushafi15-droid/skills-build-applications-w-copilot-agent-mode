import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const sections = [
  { label: 'Activities', path: 'activities', component: Activities },
  { label: 'Leaderboard', path: 'leaderboard', component: Leaderboard },
  { label: 'Teams', path: 'teams', component: Teams },
  { label: 'Users', path: 'users', component: Users },
  { label: 'Workouts', path: 'workouts', component: Workouts },
]

function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100">
        <header className="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
          <div className="container">
            <NavLink className="navbar-brand d-flex align-items-center fw-semibold" to="/">
              <img
                alt=""
                className="me-2"
                height="40"
                src={octofitLogo}
                width="40"
              />
              OctoFit Tracker
            </NavLink>
            <nav aria-label="Main navigation" className="navbar-nav flex-row gap-2 overflow-auto">
              {sections.map(({ label, path }) => (
                <NavLink
                  className={({ isActive }) =>
                    `nav-link text-nowrap ${isActive ? 'active fw-semibold' : ''}`
                  }
                  key={path}
                  to={`/${path}`}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>
        <main className="container py-4">
          <Routes>
            <Route element={<Navigate replace to="/activities" />} path="/" />
            {sections.map(({ component: Section, path }) => (
              <Route element={<Section />} key={path} path={`/${path}`} />
            ))}
            <Route element={<h1 className="h3">Page not found</h1>} path="*" />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
