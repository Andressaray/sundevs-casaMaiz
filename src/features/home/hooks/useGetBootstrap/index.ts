import { Platform } from "react-native"
import { useQuery } from "react-query"
import HomeService from "@features/home/services"
import { APP_VERSION } from "@config/constants"

const homeService = new HomeService()

const useGetBootsrap = () => {
    const platform = Platform.OS
    const { data, error, isLoading, isRefetching } = useQuery({
        queryKey: ["boostrap"],
        queryFn: homeService.getBootstrapService({
            platform,
            market: "MX",
            audience: "guest",
            appVersion: APP_VERSION,
        })
    })

    return {
        isLoading,
        data,
        error,
        isRefetching
    }
}

export default useGetBootsrap