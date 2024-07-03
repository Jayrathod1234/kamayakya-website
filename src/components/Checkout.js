import {PAYMENT_URL} from "../pages/api/URLs";
import React from "react";

const Checkout = () => {
    return (
        <>
            <div className="container">
                <h1>Checkout</h1>
                <img src="https://i.imgur.com/EHyR2nP.png" className="image"></img>
                <h2>Price</h2>
                <h3>25$</h3>
                <form
                    action={PAYMENT_URL}
                    method="POST"
                >

                    <button className="btn-checkout" type="submit">
                        Checkout
                    </button>
                </form>
            </div>
        </>
    );
};

export default Checkout;
