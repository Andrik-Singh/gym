import { auth } from "@/lib/auth"
import BasicNavbar from "./Basic-Navbar"
import { headers } from "next/headers"
import dynamic from "next/dynamic"

const Navbar = async() => {
    const data=await auth.api.getSession({
        headers:await headers()
    })
    return (
        <BasicNavbar />
    )
}

export default Navbar