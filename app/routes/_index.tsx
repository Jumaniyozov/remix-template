import {json, MetaFunction} from "@remix-run/node";
import {useUserStore} from "~/store/user";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {fetchTodos, useTodosQuery} from "~/feature/todos";
import {useLoaderData} from "@remix-run/react";
import {useToast} from "~/components/ui/use-toast";

export const meta: MetaFunction = () => {
    return [
        {title: "New Remix App"},
        {name: "description", content: "Welcome to Remix!"},
    ];
};

export async function loader() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['posts'],
        queryFn: ({signal}) => fetchTodos(signal),
    })

    return json({dehydratedState: dehydrate(queryClient)})
}

function IDX() {
    const {name} = useUserStore(state => state);
    const {data, error} = useTodosQuery();
    const {toast} = useToast();

    if (error) {
        return <div>{error.message}</div>
    }

    console.log(data);

    return (
        <div className="bg-amber-200 h-24 w-24 max-w-7xl">
            <button
                onClick={() => {
                    toast({
                        title: "Scheduled: Catch up",
                        description: "Friday, February 10, 2023 at 5:57 PM",
                    })
                }}
            >
                Show Toast
            </button>
            <p>{name}</p>
        </div>
    );
}

export default function Index() {
    const {dehydratedState} = useLoaderData<typeof loader>()
    return (
        <HydrationBoundary state={dehydratedState}>
            <IDX/>
        </HydrationBoundary>
    )
}