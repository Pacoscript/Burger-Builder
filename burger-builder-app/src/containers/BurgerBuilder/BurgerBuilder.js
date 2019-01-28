import React, {Component} from 'react'

import Auxy from '../../hoc/Auxy'

class BurgerBuilder extends Component {
    render () {
        return (
            <Auxy>
                <div>Burger</div>
                <div>Build Controls</div>
            </Auxy>
        )
    }
}

export default BurgerBuilder