import create from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
    isHistoryOpen: boolean
    isTreeOpen: boolean
}

interface Actions {
    toggleIsHistoryOpen: () => void
    toggleIsTreeOpen: () => void
}

export const useLayoutStore = create(
    persist<State & Actions>(
        (set, get) => ({
            isHistoryOpen: true,
            toggleIsHistoryOpen: () => {
                const isHistoryOpen = get().isHistoryOpen
                set(() => ({ isHistoryOpen: !isHistoryOpen }))
            },

            isTreeOpen: true,
            toggleIsTreeOpen: () => {
                const isTreeOpen = get().isTreeOpen
                set(() => ({ isTreeOpen: !isTreeOpen }))
            },
        }),
        {
            name: 'LayoutStore',
            getStorage: () => localStorage
        }
    )
)