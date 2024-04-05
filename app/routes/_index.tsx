import type {MetaFunction} from "@remix-run/node";
import {useUserStore} from "~/store/user";

export const meta: MetaFunction = () => {
    return [
        {title: "New Remix App"},
        {name: "description", content: "Welcome to Remix!"},
    ];
};

export default function Index() {
    const {name} = useUserStore(state => state);

    return (
        <div className="bg-amber-200 h-24 w-24 max-w-7xl">
            <p>{name}</p>
        </div>
    );
}
