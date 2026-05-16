import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

import Home from './routes/Home'
import Destinations from './routes/Destinations'
import DestinationDetails from './routes/DestinationDetails'
import Top10 from './routes/Top10'
import MapPage from './routes/MapPage'
import UploadPage from './routes/UploadPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/top10" element={<Top10 />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Route>
    </Routes>
  )
}

