import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './components/Homepage'
import Loginpage from './components/Loginpage'
import Profilepage from './components/Profilepage'
import Navbar from './components/Navbar'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material'
import { themeSettings } from './theme'
import { setloading } from './redux/slice'
import Loading from './components/Loading'


function App() {

  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.token))
  // const loading = useSelector((state) => state.loading)
  // console.log(mode, theme);
  const loading = false
  return (
    <>
      {
        loading ? (
          <>
            <Loading />
          </>) : (
          <>
            <div className="app">
              <BrowserRouter>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Routes>
                    <Route path='/' element={<Loginpage />} />
                    <Route path='/home' element={isAuth ? <Homepage /> : <Navigate to='/' />} />
                    <Route path='/profile/:id' element={isAuth ? <Profilepage /> : <Navigate to='/' />} />
                  </Routes>
                </ThemeProvider>
              </BrowserRouter>
            </div>
          </>
        )
      }
    </>
  )
}

export default App
