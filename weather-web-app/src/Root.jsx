import Navigation from "./components/Navigation";
import { Outlet } from "react-router-dom"

export default function Root(){
  return(
    <>
      <header className="w-full fixed left-0 top-0 z-50">
        <Navigation />
      </header>
      <main className="mt-24 py-8 relative z-40">
        <Outlet />
      </main>
    </>
  )
}