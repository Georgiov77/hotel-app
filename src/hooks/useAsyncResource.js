import { useState, useEffect, useCallback } from 'react'
import { useToast } from '@georgevlachos/ui'
import { getErrorMessage } from '@error/errorHandler'

// Καλύπτει το data/isLoading/load pattern που επαναλαμβανόταν πανομοιότυπο
// σε κάθε hook που φέρνει δεδομένα από τα services: try/catch/finally +
// toast σε σφάλμα.
//
// `fetcher`      — async function χωρίς ορίσματα, γυρνάει τα δεδομένα.
// `deps`         — όπως στο useCallback/useEffect: ό,τι εξωτερικές τιμές
//                   χρησιμοποιεί ο fetcher (π.χ. startDate/endDate) πρέπει
//                   να μπουν εδώ, αλλιώς ο fetcher θα «κολλήσει» στην πρώτη
//                   εκδοχή του.
// `initialValue` — τι να δείχνει το `data` πριν ολοκληρωθεί το πρώτο load
//                   (π.χ. [] για λίστες, {} για συνδυασμένα αποτελέσματα).
// `enabled`      — αν false, δεν φορτώνει καθόλου (π.χ. όσο λείπουν
//                   απαραίτητες παράμετροι).
function useAsyncResource(fetcher, deps = [], initialValue = null, { enabled = true } = {}) {
    const { showToast } = useToast()
    const [data, setData] = useState(initialValue)
    const [isLoading, setIsLoading] = useState(enabled)

    const load = useCallback(async () => {
        try {
            setIsLoading(true)
            setData(await fetcher())
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        } finally {
            setIsLoading(false)
        }
        // deps περνάει από τον caller — δεν μπορεί το eslint να τις δει εκ των προτέρων εδώ.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    useEffect(() => {
        if (enabled) load()
    }, [enabled, load])

    // setData εκτίθεται για περιπτώσεις σαν αναζήτηση: το αποτέλεσμα δεν
    // προέρχεται από τον ίδιο τον fetcher, αλλά πρέπει να αντικαταστήσει το data.
    return { data, isLoading, reload: load, setData }
}

export default useAsyncResource
