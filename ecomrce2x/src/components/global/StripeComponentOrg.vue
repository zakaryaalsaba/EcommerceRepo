<template>
    <div>
        <form id="payment-form">
            <div id="card-element"></div>
            <div id="payment-request-button"></div>
            <!-- <button type="submit" @click.prevent="submitPayment()">Pay</button> -->
            <b-button variant="success" class="custom-btn btnPlaceOrder" type="submit" @click.prevent="submitPayment()">Checkout</b-button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            stripe: null,
            elements: null,
            cardElement: null, // Add cardElement to store the reference to the card element
            paymentRequest: null,
        };
    },
    mounted() {
        // Initialize Stripe.js with your publishable key
        this.stripe = window.Stripe('pk_test_51OfkjnKl5JC95HqaQlhuQLpBUUjRd9DMfQEK9jlsOPcrOd1n7j39nmiR0hUnKrBzCMgjVYIHdd5ZWAwpHKGMLMLE008dPXorn3');
        // Set up Stripe.js and Elements
        this.elements = this.stripe.elements();
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
            this.stripe.createToken(this.cardElement).then((result) => {
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
                amountVal: '920',
                email: 'zzz.abod@gmail.com'
            };

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Server response:', data);

                    // Check if the server response indicates success
                    if (data.success === true) {
                        // Redirect to the success route with a "Thanks" message
                        this.$router.push({ name: 'successTrans', params: { message: 'Thanks for your payment!' } });
                    } else {
                        // Redirect to the failure route to try another card
                        this.$router.push({ name: 'failureTrans', params: { message: 'Payment failed. Please try another card.' } });
                    }
                })
                .catch(error => {
                    console.error('Error sending token to server:', error);
                    // Redirect to the failure route in case of an error
                    this.$router.push({ name: 'failure', params: { message: 'An error occurred. Please try again.' } });
                });
        }
    },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
