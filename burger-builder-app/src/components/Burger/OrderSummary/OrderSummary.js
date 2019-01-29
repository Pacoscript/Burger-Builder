import React from 'react'
import Auxy from '../../../hoc/Auxy'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (<li key = {igKey}>
                    <span style = {{textTransform : 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                    </li>)
        })
    return (
        <Auxy>
            <h3>Your order</h3>
            <p>A dellicius burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <button>CANCEL</button>
            <button>CONTINUE</button>
        </Auxy>
    )
    
}

export default orderSummary