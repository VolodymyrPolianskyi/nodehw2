import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './app/store'
import NewsList from './features/news/NewsList'
import NewsForm from './features/news/NewsForm'
import NewsPage from './features/news/NewsPage'
import ErrorPage from './features/error/ErrorPage'
import LoginPage from './features/auth/LoginPage'
import RegisterPage from './features/auth/RegisterPage'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsPage />} />
          <Route path="/create" element={<NewsForm />} />
          <Route path="/edit/:id" element={<NewsForm />} />
          <Route path="/error" element={<ErrorPage message={"error"} />} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App