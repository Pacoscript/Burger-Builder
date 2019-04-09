import React, {Component} from 'react'

import Order from '../../components/Order/Order'

import axios from '../../axios-orders'

import withErrorHandler from '../../hoc/WhitErrorHandler/whitErrorHandler'

class Orders extends Component {

    state = {
        Orders: [],
        Loading: true
    }

    componentDidMount () {
        axios.get('/orders.json')
            .then (res=>{
                const fetchedOrders = []
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({Loading:false, Orders: fetchedOrders})
            })
            .catch (err => {
                this.setState({Loading:false})
            })

    }

    render () {
        return(
            <div>
                {this.state.Orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </div>
        )
    }

}

export default withErrorHandler(Orders, axios)