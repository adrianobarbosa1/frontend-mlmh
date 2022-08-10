import { Flex } from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import { AuthContext } from "../components/contexts/AuthContext"
import Sidebar from "../components/Sidebar"
import { setupAPIClient } from "../services/api"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"

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

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    await apiClient.get('/users/me');


    return {
        props: {}
    }
})