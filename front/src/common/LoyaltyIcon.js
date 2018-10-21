import React from 'react'
import { bronzeIcon, silverIcon, goldIcon, platinumIcon } from '../pics'

const LoyaltyIcon = ({status}) => {
    switch (status){
        case 'bronze':
            return <img src={bronzeIcon} alt="Bronze" style={{ width: 90 }} />
        case 'silver':
            return <img src={silverIcon} alt="Silver" style={{ width: 90 }} />
        case 'gold':
            return <img src={goldIcon} alt="Gold" style={{ width: 90 }} />
        case 'platinum':
            return <img src={platinumIcon} alt="Platinum" style={{ width: 90 }} />
        default:
            return <img src={bronzeIcon} alt="Bronze" style={{ width: 90 }} />
    }
}

export default LoyaltyIcon