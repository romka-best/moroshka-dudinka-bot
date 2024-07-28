from datetime import datetime, timezone
from typing import Dict

from bot.database.main import firebase
from bot.database.models.product import Product


async def update_order(product_id: str, data: Dict) -> None:
    product_ref = firebase.db.collection(Product.COLLECTION_NAME).document(product_id)
    data['edited_at'] = datetime.now(timezone.utc)

    await product_ref.update(data)
