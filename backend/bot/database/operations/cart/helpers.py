from bot.database.main import firebase
from bot.database.models.cart import Cart
from bot.database.models.product import Product


async def create_cart_object(user_id: str, items: list[Product]) -> Cart:
    cart_ref = firebase.db.collection(Cart.COLLECTION_NAME).document()
    return Cart(
        id=cart_ref.id,
        user_id=user_id,
        items=items,
    )
