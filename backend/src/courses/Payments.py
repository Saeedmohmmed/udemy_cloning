import stripe
from django.conf import settings
stripe.api_key = settings.STRIPE_SECRET_KEY

def apply_stripe_payment(id, name, price):
    try:
        return stripe.checkout.Session.create(
            line_items=[{
            'price_data': {
                'currency': 'usd',
                'product_data': {
                'name': name,
                },
                'unit_amount': int(price),
            },
            'quantity': 1,
            }],
            mode='payment',
            success_url= settings.DOMAIN + 'courses/{}/learn'.format(id),
            cancel_url= settings.DOMAIN + 'courses/'+id,
        ), True
    
        
    except Exception as e:
        return str(e), False
    