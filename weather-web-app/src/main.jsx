import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root.jsx';
import WeatherWeb from './WeatherWeb.jsx';
import IconCredits from './icon_credits/IconCredits.jsx';
import ErrorPage from './components/Error.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children:[
      {
        index: true,
        element: <WeatherWeb />
      },
      {
        path: "/icon-credits",
        element: <IconCredits />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
