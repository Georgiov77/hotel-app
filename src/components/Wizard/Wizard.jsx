import Button from '@components/Button/Button'
import './Wizard.css'

function Wizard({ steps, currentStep, onNext, onPrev, onSubmit, children, canNext }) {
    const isFirst = currentStep === 0
    const isLast  = currentStep === steps.length - 1

    return (
        <div className="wizard">

            {/* Progress steps */}
            <div className="wizard__steps">
                {steps.map((step, index) => {
                    const isActive    = index === currentStep
                    const isCompleted = index < currentStep

                    return (
                        <div key={step.id} className="wizard__step">
                            {/* Connector πριν από κάθε step εκτός του πρώτου */}
                            {index > 0 && (
                                <div className={`wizard__step-connector ${isCompleted ? 'wizard__step-connector--completed' : ''}`} />
                            )}

                            <div className={`wizard__step-bubble ${
                                isActive    ? 'wizard__step-bubble--active'    :
                                    isCompleted ? 'wizard__step-bubble--completed' : ''
                            }`}>
                                {isCompleted ? '✓' : index + 1}
                            </div>

                            <span className={`wizard__step-label ${
                                isActive    ? 'wizard__step-label--active'    :
                                    isCompleted ? 'wizard__step-label--completed' : ''
                            }`}>
                {step.label}
              </span>
                        </div>
                    )
                })}
            </div>

            {/* Περιεχόμενο τρέχοντος step */}
            <div className="wizard__content">
                {children}
            </div>

            {/* Navigation */}
            <div className="wizard__footer">
                <Button
                    variant="secondary"
                    onClick={onPrev}
                    disabled={isFirst}
                >
                    ← Πίσω
                </Button>

                {isLast ? (
                    <Button onClick={onSubmit}>
                        ✓ Αποθήκευση Κράτησης
                    </Button>
                ) : (
                    <Button onClick={onNext} disabled={!canNext}>
                        Επόμενο →
                    </Button>
                )}
            </div>

        </div>
    )
}

export default Wizard