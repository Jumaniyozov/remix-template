import React, {createContext, useContext, useRef} from "react";
import {createStore, useStore} from "zustand";

export type BearProps = {
    bears: number
    additional: number
}

type BearState = BearProps & {
    addBear: () => void
    addAdditional: () => void
}

type BearStore = ReturnType<typeof createBearStore>
type BearProviderProps = React.PropsWithChildren<BearProps>

const createBearStore = (initProps?: Partial<BearProps>) => {
    const DEFAULT_PROPS: BearProps = {
        bears: 0,
        additional: 0,
    }
    return createStore<BearState>()((set) => ({
        ...DEFAULT_PROPS,
        ...initProps,
        addBear: () => set((state) => ({bears: ++state.bears})),
        addAdditional: () => set((state) => ({additional: ++state.additional})),
    }))
}


const BearContext = createContext<BearStore | null>(null)

export function BearProvider({children, ...props}: BearProviderProps) {
    const storeRef = useRef<BearStore>()
    if (!storeRef.current) {
        storeRef.current = createBearStore(props)
    }
    return (
        <BearContext.Provider value={storeRef.current}>
            {children}
        </BearContext.Provider>
    )
}

export function useBearContext<T>(selector: (state: BearState) => T): T {
    const store = useContext(BearContext)
    if (!store) throw new Error('Missing BearContext.Provider in the tree')
    return useStore(store, selector)
}
