import {BearProps, BearProvider, useBearContext} from "~/store/bear";

function CommonConsumer() {
    const bears = useBearContext((s) => s.bears)
    const addBear = useBearContext((s) => s.addBear)
    return (
        <div className="bg-red-200 p-2 border-green-100 border">
            <div>{bears} Bears.</div>
            <button onClick={addBear}>Add bear</button>
        </div>
    )
}

function AdditionalConsumer() {
    const additional = useBearContext((s) => s.additional)
    const addAdditional = useBearContext((s) => s.addAdditional)
    const bears = useBearContext((s) => s.bears)
    return (
        <div className="bg-rose-400 p-2 border-green-100 border">
            <div>{additional} Additional.</div>
            <div>{bears} Bears.</div>
            <button onClick={addAdditional}>Add additional</button>
        </div>
    )
}

export function Bearcard({bearprops}: { bearprops: Partial<BearProps> }) {


    return (
        <BearProvider bears={bearprops.bears ?? 2} additional={bearprops.additional ?? 1}>
            <div className="flex flex-col gap-2 bg-black p-2 max-w-fit min-w-48">
                <CommonConsumer/>
                <AdditionalConsumer/>
            </div>
        </BearProvider>
    )
}