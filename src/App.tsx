import { Outlet } from "react-router"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

function App() {

    return (
        <div className="flexing hscreen">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default App
