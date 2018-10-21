import React from 'react'
import {getNextStep} from './'

const LoyaltyProgressBar = ({rideCount}) => {
    const nextStep = getNextStep(rideCount)
    const percent = 1 - (nextStep.step - rideCount) / nextStep.step

    return <div>{percent * 100}% accompli jusqu'au prochain niveau : {nextStep.status}</div>
}


export default LoyaltyProgressBar