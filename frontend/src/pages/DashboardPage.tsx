import {useGetClients} from "../hooks/queries/useGetClients";

const DashboardPage = () => {
    const { clientList, isLoading } = useGetClients();
    console.log('clientList', clientList)
    return (
        <div>
            DashboardPage
        </div>
    )
};

export default DashboardPage;