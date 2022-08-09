import { Flex } from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import { AuthContext } from "../components/contexts/AuthContext"
import Sidebar from "../components/Sidebar"
import { api } from "../services/api"

export default function Dashboard() {
    const { user } = useContext(AuthContext)

    useEffect(() => {
        api.get('/users/me')
            .then(response => {
                console.log(response)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Flex>
            <Sidebar />
        </Flex>
    )
}