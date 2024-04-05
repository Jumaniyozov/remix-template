import {create} from 'zustand'

type UserStore = {
    name: string,
    age: number,
    setName: (name: string) => void,
}

export const useUserStore = create<UserStore>()((set) => ({
    name: 'John Doe',
    age: 25,
    setName: (name) => set((state) => ({...state, name}))
}))