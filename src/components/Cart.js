import React, { Component } from 'react'
import formatCurrency from '../util';

export default class Cart extends Component {
    render() {
        const { cardItems } = this.props;
        const hasLength = cardItems.length !== 0;
        return (
            <div>
                <div className="card card-header">
                    {hasLength ? "Cart is Empty" : "You have " + cardItems.length + " in cart "}
                </div>
                <div className="card">
                    <ul className="card-items">
                        {cardItems.map((card) => (
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
                <div className="card">
                    <div className="total">
                        <div>
                            Total : {" "}
                            {formatCurrency(cardItems.reduce((a, b) => a + (b.price * b.count), 0))}
                        </div>
                        <button className="button primary">Proceed</button>
                    </div>
                </div>
                )}
            </div>
        )
    }
}
