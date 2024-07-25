import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './components/Homepage'
import Loginpage from './components/Loginpage'
import Profilepage from './components/Profilepage'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme'
import EditProfile from './components/EditProfile'


function App() {

  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.token))

  return (
    <>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path='/' element={<Loginpage />} />
              <Route path='/home' element={isAuth ? <Homepage /> : <Navigate to='/' />} />
              <Route path='/profile/:id' element={isAuth ? <Profilepage /> : <Navigate to='/' />} />
              <Route path='/edit/:id' element={isAuth ? <EditProfile /> : <Navigate to='/' />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
