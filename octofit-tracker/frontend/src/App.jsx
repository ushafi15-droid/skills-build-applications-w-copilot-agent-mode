import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'

const sections = ['activities', 'leaderboard', 'teams', 'users', 'workouts']

function App() {
  return (
    <BrowserRouter>
      <header className="navbar navbar-expand border-bottom bg-white">
        <div className="container">
          <NavLink className="navbar-brand fw-semibold" to="/">
            <img alt="" className="me-2" height="36" src={octofitLogo} width="36" />
            OctoFit Tracker
          </NavLink>
          <nav className="navbar-nav flex-row gap-3 overflow-auto">
            {sections.map((section) => (
              <NavLink
                className="nav-link text-capitalize"
                key={section}
                to={`/${section}`}
              >
                {section}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<h1 className="h3">Dashboard</h1>} />
          {sections.map((section) => (
            <Route
              element={<h1 className="h3 text-capitalize">{section}</h1>}
              key={section}
              path={`/${section}`}
            />
          ))}
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
