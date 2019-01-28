import React, {Component} from 'react'

import Auxy from '../../hoc/Auxy'
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component {
    render () {
        return (
            <Auxy>
                <Burger />
                <div>Build Controls</div>
            </Auxy>
        )
    }
}

export default BurgerBuilder