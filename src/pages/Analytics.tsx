import { Link } from "react-router"
import { Button } from "../components/Button"
import { NavBar } from "../components/Header/NavBar"

export const Analytics = () => {
    return(
        <>
        <NavBar/>
        <p>Analytics</p>
        <section>
            <h3>Your Offers</h3>
            <Link to={"/seller/offer/createoffer"}>
            <Button>
                New Offer
            </Button>
            </Link>
        </section>
        </>
    )
}