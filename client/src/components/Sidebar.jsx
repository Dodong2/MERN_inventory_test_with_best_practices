import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const location = useLocation

    const navItems = [
        { path: '/overview', label: 'Overview' },
        { path: '/purchase', label: 'Purchase' },
        { path: '/list', label: 'Product & stocks' },
        { path: '/history', label: 'Sales History' },
    ]

  return (
    <div style={{ width: '200px', height: '100vh', backgroundColor: '#f0f0f0', padding: '20px' }}>
      <h2>Menu</h2>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {navItems.map((item) => (
            <li key={item.path} style={{ marginBottom: '10px' }}>
              <Link
                to={item.path}
                style={{
                  textDecoration: 'none',
                  padding: '8px 12px',
                  backgroundColor: location.pathname === item.path ? '#ddd' : 'transparent',
                  display: 'block',
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar