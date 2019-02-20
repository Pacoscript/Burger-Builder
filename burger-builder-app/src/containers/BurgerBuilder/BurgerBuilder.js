import React, {Component} from 'react'

import Auxy from '../../hoc/Auxy/Auxy'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import withErrorHandler from '../../hoc/WhitErrorHandler/WhitErrorHandler'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRIZES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients : null,
        totalPrize : 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://react-my-burger-paco.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error:true})
            })
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
        // alert ('You continue!')
        // this.setState({loading: true})
        // const order = {
        //     ingredients: this.state.ingredients,
        //     prize: this.state.totalPrize,
        //     customer: {
        //         name: 'Paco',
        //         address : {
        //             street: 'test street 1',
        //             zipCode: '08013',
        //             country: 'Spain'
        //         },
        //         mail: 'amail',
        //         deliveryMethod: 'fastest'

        //     }
        // }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState ({loading: false, purchasing: false})
        //     })
        //     .catch(error => {
        //         this.setState ({loading: false,  purchasing: false})
        //     })
        this.props.history.push('./checkout')
    }

    render () {
        const disabledInfo = {...this.state.ingredients}
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0
        }
        let orderSummary = null

        let burger = this.state.error ? <p>Ingredients cant be displayed</p> : <Spinner />
        if (this.state.ingredients){
            burger = (
                <Auxy>
                    <Burger ingredients = {this.state.ingredients} />
                        <BuildControls
                            totalPrize = {this.state.totalPrize}
                            ingredientAdded = {this.addIngredientHandler}
                            ingredientRemoved = {this.removeIngredientHandler}
                            purchasable = {this.state.purchasable}
                            ordered = {this.purchaseHandler}
                            disabled = {disabledInfo} />
                </Auxy>)
                orderSummary = <OrderSummary 
                    ingredients = {this.state.ingredients}
                    prize = {this.state.totalPrize}
                    purchaseCancelled = {this.purchaseCancelHandler}
                    purchaseContinued = {this.purchaseContinueHandler} />
        }
        if (this.state.loading){
            orderSummary = <Spinner />
        }
        return (
            <Auxy>
                <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxy>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)