import React, { Component } from 'react'
import formatCurrency from '../util';

export default class Cart extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckOut: false
        }
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    createOrder = e => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cardItems: this.props.cardItems,
        }
        this.props.createOrder(order);
    }
    render() {
        const { cardItems } = this.props;
        const hasLength = cardItems.length !== 0;
        if (!hasLength) {
            this.state = {
                showCheckOut: false
            }
        }
        return (
            <div>
                <div className="card card-header">
                    {hasLength ? "Cart is Empty" : "You have " + cardItems.length + " in cart "}
                </div>
                <div className="card">
                    <ul className="card-items">
                        {cardItems.map(card => (
                            <li key={card._id}>
                                <div>
                                    <img src={card.image} alt={card.title} />
                                </div>
                                <div>
                                    <div>{card.title}</div>
                                    <div className="right">
                                        {formatCurrency(card.price)} x {card.count}{" "}
                                        <button className="button" onClick={() => this.props.removeFromCart(card)}>Remove</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {hasLength && (
                    <div>
                        <div className="card">
                            <div className="total">
                                <div>
                                    Total : {" "}
                                    {formatCurrency(cardItems.reduce((a, b) => a + (b.price * b.count), 0))}
                                </div>
                                <button
                                    onClick={() => {
                                        this.setState({ showCheckOut: true })
                                    }}
                                    className="button primary">Proceed</button>
                            </div>
                        </div>

                        {this.state.showCheckOut && (
                            <div className="card">
                                <form onSubmit={this.createOrder}>
                                    <ul className="form-container">
                                        <li>
                                            <span>Email {" "}</span>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                onChange={this.handleInput}
                                            ></input>
                                        </li>
                                        <li>
                                            <span>Name {" "}</span>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                onChange={this.handleInput}
                                            ></input>
                                        </li>
                                        <li>
                                            <span>Address {" "}</span>
                                            <input
                                                type="text"
                                                name="address"
                                                required
                                                onChange={this.handleInput}
                                            ></input>
                                        </li>
                                        <li>
                                            <button type="submit" className="button primary">Check Out</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}
