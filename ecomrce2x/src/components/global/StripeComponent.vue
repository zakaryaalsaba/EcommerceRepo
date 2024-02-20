<template>
    <div>
        <form>
            <input type="hidden" name="token" />
            <div class="group">
                <label>
                    <span>Card number</span>
                    <div id="card-number-element" class="field"></div>
                    <span class="brand">
                        <!-- <i class="pf pf-credit-card" id="brand-icon"></i> -->
                        <b-icon
              icon="credit-card"
              variant="secondary"
              class="icon-cart"
            ></b-icon>
                    </span>
                </label>
                <label>
                    <span>Expiry date</span>
                    <div id="card-expiry-element" class="field"></div>
                </label>
                <label>
                    <span>CVC</span>
                    <div id="card-cvc-element" class="field"></div>
                </label>
                <label>
                    <span>Postal code</span>
                    <input id="postal-code" name="postal_code" class="field" placeholder="90210" />
                </label>
            </div>
            <b-button variant="success" class="custom-btn btnPlaceOrder" type="submit"
                @click.prevent="submitPayment()">Pay Now</b-button>

            <div class="outcome">
                <div class="error"></div>
                <div class="success">
                    Success! Your Stripe token is <span class="token"></span>
                </div>
            </div>
        </form>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            stripe: null,
            elements: null,
            cardNumberElement: null,
            cardExpiryElement: null,
            cardCvcElement: null,
            style: {
                base: {
                    iconColor: '#666EE8',
                    color: '#31325F',
                    lineHeight: '40px',
                    fontWeight: 300,
                    fontFamily: 'Helvetica Neue',
                    fontSize: '15px',
                    '::placeholder': {
                        color: '#CFD7E0',
                    },
                },
            },
        };
    },
    mounted() {
        // Initialize Stripe.js with your publishable key
        this.stripe = window.Stripe('pk_test_51OfkjnKl5JC95HqaQlhuQLpBUUjRd9DMfQEK9jlsOPcrOd1n7j39nmiR0hUnKrBzCMgjVYIHdd5ZWAwpHKGMLMLE008dPXorn3');
        // Set up Stripe.js and Elements
        this.elements = this.stripe.elements();

        this.cardNumberElement = this.elements.create('cardNumber', {
            style: this.style,
        });
        this.cardNumberElement.mount('#card-number-element');

        this.cardExpiryElement = this.elements.create('cardExpiry', {
            style: this.style,
        });
        this.cardExpiryElement.mount('#card-expiry-element');

        this.cardCvcElement = this.elements.create('cardCvc', {
            style: this.style,
        });
        this.cardCvcElement.mount('#card-cvc-element');
        this.setupElements();
    },
    methods: {
        setupElements() {
            // Create a Card Element and mount it to the '#card-element' div
            this.cardElement = this.elements.create('card');
            this.cardElement.mount('#card-element');

            // Set up Payment Request
            this.paymentRequest = this.stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Demo Total',
                    amount: 75410, // Amount in cents
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });

            // Check if the Payment Request is supported by the current browser
            this.paymentRequest.canMakePayment().then((result) => {
                if (result) {
                    // Mount the paymentRequestButton Element only if payment is supported
                    const paymentRequestButton = this.elements.create('paymentRequestButton', {
                        paymentRequest: this.paymentRequest,
                    });
                    paymentRequestButton.mount('#payment-request-button');
                } else {
                    console.log('Payment Request is not supported on this device/browser.');
                }
            });
        },
        submitPayment() {
            this.stripe.createToken(this.cardNumberElement).then((result) => {
                console.log('result')
                if (result.error) {
                    console.error(result.error);
                } else {
                    const token = result.token.id;
                    console.log('Token:', token);
                    // Now, send this token to your server for processing
                    this.sendTokenToServer(token);
                }
            });
        },
        sendTokenToServer(token) {
            const apiUrl = 'http://localhost:3000/stripeRoutes/processpayment';
            const requestBody = {
                token: token,
                amountVal: '541',
                email: 'zzz.abod.New@gmail.com',
            };

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Server response:', data);

                    // Check if the server response indicates success
                    if (data.success === true) {
                        // Redirect to the success route with a "Thanks" message
                        this.$router.push({ name: 'successTrans', params: { message: 'Thanks for your payment!' } });
                    } else {
                        // Redirect to the failure route to try another card
                        this.$router.push({
                            name: 'failureTrans',
                            params: { message: 'Payment failed. Please try another card.' },
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error sending token to server:', error);
                    // Redirect to the failure route in case of an error
                    this.$router.push({ name: 'failure', params: { message: 'An error occurred. Please try again.' } });
                });
        },
    },
};
</script>
  
  
<style scoped>
form {
    width: 480px;
    margin: 20px 0;
}

.group {
    background: white;
    box-shadow: 0 7px 14px 0 rgba(49, 49, 93, 0.10), 0 3px 6px 0 rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    margin-bottom: 20px;
}

label {
    position: relative;
    color: #8898AA;
    font-weight: 300;
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
    display: flex;
    flex-direction: row;
}

.group label:not(:last-child) {
    border-bottom: 1px solid #F0F5FA;
}

label>span {
    width: 120px;
    text-align: right;
    margin-right: 30px;
}

label>span.brand {
    width: 30px;
}

.field {
    background: transparent;
    font-weight: 300;
    border: 0;
    color: #31325F;
    outline: none;
    flex: 1;
    padding-right: 10px;
    padding-left: 10px;
    cursor: text;
}

.field::-webkit-input-placeholder {
    color: #CFD7E0;
}

.field::-moz-placeholder {
    color: #CFD7E0;
}

/* button {
    float: left;
    display: block;
    background: #666EE8;
    color: white;
    box-shadow: 0 7px 14px 0 rgba(49, 49, 93, 0.10), 0 3px 6px 0 rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    border: 0;
    margin-top: 20px;
    font-size: 15px;
    font-weight: 400;
    width: 100%;
    height: 40px;
    line-height: 38px;
    outline: none;
}

button:focus {
    background: #555ABF;
}

button:active {
    background: #43458B;
} */

.outcome {
    float: left;
    width: 100%;
    padding-top: 8px;
    min-height: 24px;
    text-align: center;
}

.success,
.error {
    display: none;
    font-size: 13px;
}

.success.visible,
.error.visible {
    display: inline;
}

.error {
    color: #E4584C;
}

.success {
    color: #666EE8;
}

.success .token {
    font-weight: 500;
    font-size: 13px;
}
</style>