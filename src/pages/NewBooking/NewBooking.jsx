import { useState }        from 'react'
import Wizard              from '@components/Wizard/Wizard'
import StepDates           from './steps/StepDates'
import StepRoom            from './steps/StepRoom'
import StepGuest           from './steps/StepGuest'
import StepPricing         from './steps/StepPricing'
import StepConfirm         from './steps/StepConfirm'
import bookingService      from '@services/bookingService'
import { toast }           from '@stores/useToastStore'
import { getErrorMessage } from '@error/errorHandler'
import { getInitialDates } from '@hooks/useDates'
import { todayISO }        from '@georgevlachos/utils'
import './NewBooking.css'

const STEPS = [
    { id: 'dates',   label: 'Ημερομηνίες' },
    { id: 'room',    label: 'Δωμάτιο'     },
    { id: 'guest',   label: 'Πελάτης'     },
    { id: 'pricing', label: 'Τιμολόγηση'  },
    { id: 'confirm', label: 'Επιβεβαίωση' },
]

const initialState = {
    checkIn:       todayISO(),
    checkOut:      '',
    nights:        0,
    room:          null,
    guest:         null,
    adults:        1,
    children:      0,
    pricePerNight: 0,
    totalAmount:   0,
    depositAmount: 0,
    paymentStatus: 'unpaid',
    source:        'frontdesk',
    extras:        [],
    notes:         '',
}

function NewBooking({ onNavigate, initialData }) {
    const [currentStep, setCurrentStep] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [booking, setBooking] = useState(() => {
        const data = { ...initialState, ...(initialData || {}) }

        if (data.room) {
            data.adults = data.room.capacity
        }

        const dates   = getInitialDates(initialData)
        data.checkIn  = dates.checkIn
        data.checkOut = dates.checkOut
        data.nights   = dates.nights

        return data
    })

    const updateBooking = (fields) => {
        setBooking((prev) => ({ ...prev, ...fields }))
    }

    const handleNext = () => setCurrentStep((prev) => prev + 1)
    const handlePrev = () => setCurrentStep((prev) => prev - 1)

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true)
            await bookingService.create(booking)
            toast.success('Η κράτηση αποθηκεύτηκε επιτυχώς!')
            onNavigate('bookings', null)
        } catch (err) {
            toast.error(getErrorMessage(err))
        } finally {
            setIsSubmitting(false)
        }
    }

    const canNext = () => {
        switch (currentStep) {
            case 0: return booking.checkIn && booking.checkOut && booking.nights > 0
            case 1: return booking.room    !== null
            case 2: return booking.guest   !== null
            case 3: return booking.pricePerNight > 0
            default: return true
        }
    }

    const stepProps = { booking, updateBooking, onNext: handleNext }

    const renderStep = () => {
        switch (currentStep) {
            case 0: return <StepDates   {...stepProps} />
            case 1: return <StepRoom    {...stepProps} />
            case 2: return <StepGuest   {...stepProps} />
            case 3: return <StepPricing {...stepProps} />
            case 4: return <StepConfirm {...stepProps} />
            default: return null
        }
    }

    return (
        <div className="new-booking">
            <Wizard
                steps={STEPS}
                currentStep={currentStep}
                onNext={handleNext}
                onPrev={handlePrev}
                onSubmit={handleSubmit}
                canNext={canNext()}
                isSubmitting={isSubmitting}
            >
                {renderStep()}
            </Wizard>
        </div>
    )
}

export default NewBooking