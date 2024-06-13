import {ActionFunctionArgs, json, MetaFunction} from "@remix-run/node";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {fetchTodos} from "~/feature/todos";
import {useFetcher, useLoaderData} from "@remix-run/react";
import {ThemeSwitch} from "~/components/navbar/ThemeSwitch";
import {useTypedRootLoaderData} from "~/root";
import {useTranslation} from "react-i18next";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {redirectWithToast} from "~/services/toast.server";

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



export async function action(props: ActionFunctionArgs) {
    const {request} = props;


    return await redirectWithToast('/about', {
        title: 'Scheduled: Catch up',
        description: 'Friday, February 10, 2023 at 5:57 PM',
        type: 'success',
    })

    // return json({}, {status: 200});
}

function IDX() {
    const fetcher = useFetcher({key: 'change-lang'});
    const rootData = useTypedRootLoaderData();
    const {t, i18n} = useTranslation();
    const handleLocaleChange = (val: string) => {
        i18n.changeLanguage(val).catch(err => console.log(err));
    }

    return (
        <div className="bg-amber-200 h-24 w-24 max-w-7xl">
            <ThemeSwitch userPreference={rootData?.userPrefs.theme}/>

            <fetcher.Form method="post" action="/?index">
                <button
                    type="submit"
                    // onClick={() => {
                    //     toast({
                    //         title: "Scheduled: Catch up",
                    //         description: "Friday, February 10, 2023 at 5:57 PM",
                    //     })
                    // }}
                >
                    Show Toast
                </button>
            </fetcher.Form>
            <Select onValueChange={handleLocaleChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="uz">{`O'zbekcha`}</SelectItem>
                    <SelectItem value="ru">{`Русский`}</SelectItem>
                    <SelectItem value="en">{`English`}</SelectItem>
                </SelectContent>
            </Select>
            <p>{t('general.name')}</p>
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