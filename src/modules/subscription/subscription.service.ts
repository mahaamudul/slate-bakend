import Stripe from "stripe"
import config from "../../config"
import { prisma } from "../../lib/prisma"
import { stripe } from "../../lib/stripe"

const createCheckout = async (userId: string) => {



    const transactionResult = await prisma.$transaction(async (tx) => {
        const user = await tx.user.findUniqueOrThrow({
            where: {
                id: userId
            },
            include: {
                subscription: true
            }
        })

        let stripeCustomerId = user.subscription?.stripeCustomerId

        if (!stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                name: user.name,
                metadata: { userId: user.id }


            })

            stripeCustomerId = customer.id

        }
        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price: config.stripe_product_price_id,
                quantity: 1
            }],
            mode: "subscription",
            customer: stripeCustomerId,
            payment_method_types: ["card"],
            success_url: `${config.app_url}/premium?success=true`,
            cancel_url: `${config.app_url}/payment`,
            metadata: { userId: user.id }
        })

        return session.url
    })

    return {
        paymentUrl: transactionResult
    }

}

// handle webhook
const handleWebhook = async (payload: Buffer, signature: string) => {
    const endpointSecret = config.stripe_webhook_secret

    const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
    )

    switch (event.type) {
        case 'checkout.session.completed':
            // console.log(event.data.object);
            const session:Stripe.Checkout.Session=event.data.object
            const userId=session.metadata?.userId
            const stripeCustomerId=session.customer as string
            const stripeSubscriptionId=session.subscription as string
            
            if(!userId || !stripeCustomerId || !stripeSubscriptionId){
                throw new Error("Webhook failed")
            }

            const stripeSubscription=await stripe.subscriptions.retrieve(stripeSubscriptionId as string)

            const currentPeriodEndInMilliseconds=stripeSubscription.items.data[0]?.current_period_end!

            const currentPeriodEnd=new Date(currentPeriodEndInMilliseconds * 1000)
            console.log(currentPeriodEnd);
            await prisma.subscription.upsert({
                where:{
                    userId
                },
                create:{
                    userId,
                    stripeCustomerId,
                    stripeSubscriptionId,
                    status:"ACTIVE",
                    currentPeriodEnd

                },
                update:{
                    stripeCustomerId,
                    stripeSubscriptionId,
                    status:"ACTIVE",
                    currentPeriodEnd

                }
            })


            break;
        case 'customer.subscription.updated':
           

            break;
        case 'customer.subscription.deleted':
           

            break;
        default:
            // Unexpected event type
            console.log(`No events matched:Unhandled event type ${event.type}.`);
            break
    }

}

export const subscriptionService = {
    createCheckout,
    handleWebhook
}