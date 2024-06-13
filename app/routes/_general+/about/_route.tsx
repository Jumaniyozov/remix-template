import {json, MetaFunction} from "@remix-run/node";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {fetchTodos} from "~/feature/todos";
import {useLoaderData} from "@remix-run/react";
import {Bearcard} from "~/components/card/bearcard";
import React, {ReactNode} from "react";

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

function PostCards() {
    return (
        <>
            <Bearcard bearprops={{bears: 2, additional: 1}}/>
            <Bearcard bearprops={{bears: 2, additional: 1}}/>
            <Bearcard bearprops={{bears: 2, additional: 1}}/>
            <Bearcard bearprops={{bears: 2, additional: 1}}/>
        </>
    )
}

function IDX({children}: { children?: ReactNode }) {
    const [count, setCount] = React.useState(0)

    return (
        <div className="bg-amber-200 h-24 w-24 max-w-7xl">
            <p>count {count}</p>
            <button onClick={() => setCount(prev => prev + 1)}> click</button>
            {children}
        </div>
    );
}

export default function Index() {
    const {dehydratedState} = useLoaderData<typeof loader>()
    return (
        <HydrationBoundary state={dehydratedState}>
            <IDX>
                <PostCards/>
            </IDX>
        </HydrationBoundary>
    )
}