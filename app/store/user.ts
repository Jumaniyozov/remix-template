import {create} from 'zustand'
import {User} from "~/types/user";

type UserStore = {
    user: User | null
    setName: (name: string) => void,
}

export const useUserStore = create<UserStore>()((set) => ({
    user: null,
    setName: (name) => set((state) => ({...state, name}))
}))