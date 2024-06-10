import {Toast} from "~/services/toast.server";
import {useToast} from "~/components/ui/use-toast";
import {useEffect} from "react";

export function useCustomToast(tst?: Toast | null) {
    const {toast} = useToast()

    useEffect(() => {
        if (toast) {
            const toastType = () => {
                switch (tst?.type) {
                    case 'error':
                        return 'destructive'
                    case 'success':
                        return 'success'
                    default:
                        return 'default'
                }
            }

            if (tst?.title || tst?.description) {

                setTimeout(() => {
                    toast({
                        title: tst?.title,
                        description: tst?.description,
                        variant: toastType(),
                        duration: 1000000,
                    })
                }, 0)
            }
        }
    }, [toast, tst?.description, tst?.title, tst?.type])
}
