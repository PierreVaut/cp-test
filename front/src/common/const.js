export const loyaltyDetails = [
    {step: 0, status: 'bronze', bonus: 1},
    {step: 20, status: 'silver', bonus: 3},
    {step: 50, status: 'gold', bonus: 5},
    {step: 100, status: 'platinum', bonus: 10}
]

export const loyaltySteps = {
    'bronze': 0,
    'silver': 20,
    'gold': 50,
    'platinum': 100
}

export const getNextStep = (rideCount) => {
  let result = loyaltyDetails.find(el =>{
    return el.step > rideCount
  })
  return result
}