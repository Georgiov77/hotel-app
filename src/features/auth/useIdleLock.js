// src/features/auth/useIdleLock.js
import { useState, useEffect, useCallback } from 'react'
import useSettingsStore from '@stores/useSettingsStore'

function useIdleLock() {
    const { security } = useSettingsStore()
    const [isLocked, setIsLocked] = useState(false)

    const lock   = useCallback(() => setIsLocked(true), [])
    const unlock = useCallback(() => setIsLocked(false), [])

    useEffect(() => {
        if (isLocked) return

        const timeout = security.idleTimeout * 60 * 1000
        let timer = setTimeout(lock, timeout)

        const resetTimer = () => {
            clearTimeout(timer)
            timer = setTimeout(lock, timeout)
        }

        const events = ['mousemove', 'keydown', 'click', 'scroll']
        events.forEach((e) => window.addEventListener(e, resetTimer))

        return () => {
            clearTimeout(timer)
            events.forEach((e) => window.removeEventListener(e, resetTimer))
        }
    }, [isLocked, security.idleTimeout, lock])

    return { isLocked, lock, unlock }
}

export default useIdleLock