

const Navbar = () => {

    const navItems = [
        { path: '/overview', label: 'Overview' },
        { path: '/purchase', label: 'Purchase' },
        { path: '/list', label: 'Product & stocks' },
        { path: '/history', label: 'Sales History' },
    ]

    const activePage = navItems.find((item) => item.path === location.pathname)

  return (
    <div style={{ padding: '10px', backgroundColor: '#e0e0e0' }}>
        {activePage ? <h2>{activePage.label}</h2> : <h2>Dashboard</h2>}
    </div>
  )
}

export default Navbar