import {  useState } from "react"
import { Link } from "react-router-dom";

export default function Navigation(){
  const [isOpen, setIsOpen] = useState(false);
  //   function handleResize() {
  //     if (window.innerWidth >= 992) {
  //       setIsOpen(false);
  //     }
  //   }

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  function handleOpen(){
    setIsOpen(!isOpen);
  }

  return(
    <div className="block">
      <NavbarOverlay
        isOpen={isOpen}
        handleClose={handleOpen}
      />
      <div className="flex items-center justify-between bg-white w-full px-4 py-2 shadow-md">
        <a className="inline-block w-14 h-14 cursor-pointer" href="#">
          <img src="./icons/condition-icons/weather-card-clear-day.png" alt="" />
        </a>
        <button
          className="flex flex-col justify-center items-center w-8 h-8 md:w-10 md:h-10 border border-solid border-cs-black"
          onClick={handleOpen}
        >
          <p className="w-3/4 h-px bg-cs-black"></p>
          <p className="w-3/4 h-px bg-cs-black my-2"></p>
          <p className="w-3/4 h-px bg-cs-black"></p>
        </button>
      </div>
    </div>
  )
}

function NavbarOverlay({ isOpen, handleClose }){
  return(
    <div className={`${isOpen ? "scale-100" : "scale-0"} fixed w-screen h-screen transition-all duration-300`}>
      <div className="w-full h-full flex justify-center items-center bg-cs-yellow relative">
        <button
          className="flex justify-center items-center w-11 h-11 rounded-full border border-solid border-cs-black absolute right-[7%] top-[5%]"
          onClick={handleClose}
        >
          <svg width={35} height={35} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            {/* {!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.} */}
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
          </svg>
        </button>
        <nav>
          <ul className="text-center">
            <li>
              <Link
                to={`/`}
                className="block border border-solid border-cs-black shadow-[4px_4px_0_var(--primary)] text-primary font-bold rounded-2xl mb-7 py-4 px-8"
                onClick={handleClose}
              >
                  Weather forcast
              </Link>
            </li>
            <li>
              <Link
                to="/location"
                className="block border border-solid border-cs-black shadow-[4px_4px_0_var(--primary)] text-primary font-bold rounded-2xl mb-7 py-4 px-8"
              >
                  Locations
              </Link>
            </li>
            <li>
              <Link
                to={`/icon-credits`}
                className="block border border-solid border-cs-black shadow-[4px_4px_0_var(--primary)] text-primary font-bold rounded-2xl mb-7 py-4 px-8"
                onClick={handleClose}
              >
                  Icon credits
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}