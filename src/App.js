import Layer0RUM from './rum'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

// Include the RUM Analytics in the production build only
if (process.env.NODE_ENV === 'production') {
  Layer0RUM('5cb233f7-ae2b-4be0-8c8d-78fb833af500')
}

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#9a1ab1] via-[#004966] to-[#01B18D]">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
