import React, {Component} from 'react'

import Auxy from '../../hoc/Auxy/Auxy'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRIZES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        totalPrize : 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) =>{
                return sum + el
            }, 0)
        this.setState ({purchasable: sum > 0})

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCounted = oldCount + 1
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updatedCounted
        const priceAddition = INGREDIENT_PRIZES[type]
        const oldPrize = this.state.totalPrize
        const newPrize = oldPrize + priceAddition
        this.setState ({ingredients : updatedIngredients, totalPrize: newPrize})
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if(oldCount <= 0)
            return
        const updatedCounted = oldCount - 1
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updatedCounted
        const priceDeduction = INGREDIENT_PRIZES[type]
        const oldPrize = this.state.totalPrize
        const newPrize = oldPrize - priceDeduction
        this.setState ({ingredients : updatedIngredients, totalPrize: newPrize})
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState ({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState ({purchasing: false})
    }

    purchaseContinueHandler = () => {
        alert ('You continue!')
    }

    render () {
        const disabledInfo = {...this.state.ingredients}
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0
        }
        return (
            <Auxy>
                <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients = {this.state.ingredients}
                        prize = {this.state.totalPrize}
                        purchaseCancelled = {this.purchaseCancelHandler}
                        purchaseContinued = {this.purchaseContinueHandler}
                        />
                </Modal>
                <Burger ingredients = {this.state.ingredients} />
                <BuildControls
                    totalPrize = {this.state.totalPrize}
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                    disabled = {disabledInfo} />
            </Auxy>
        )
    }
}

export default BurgerBuilder