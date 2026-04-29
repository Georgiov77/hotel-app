export const SEASONS = [
    { id: 'low',    label: 'Χαμηλή Σεζόν', multiplier: 0.8  },
    { id: 'mid',    label: 'Μεσαία Σεζόν', multiplier: 1.0  },
    { id: 'high',   label: 'Υψηλή Σεζόν',  multiplier: 1.3  },
    { id: 'custom', label: 'Custom Τιμή',  multiplier: null },
]

export const BASE_PRICES = {
    'Μονόκλινο':    50,
    'Δίκλινο':      70,
    'Τρίκλινο':     90,
    'Οικογενειακό': 120,
}

export const DEPOSIT_OPTIONS = [
    { id: 'unpaid',  label: 'Πληρωμή στο ξενοδοχείο', pct: 0    },
    { id: 'dep30',   label: 'Προκαταβολή 30%',         pct: 0.30 },
    { id: 'dep50',   label: 'Προκαταβολή 50%',         pct: 0.50 },
    { id: 'paid',    label: 'Πλήρης Εξόφληση',         pct: 1.0  },
    { id: 'custom',  label: 'Custom Ποσό',              pct: null },
]