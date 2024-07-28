from datetime import datetime, timezone

from bot.database.models.product import Product


class OrderStatus:
    PLACED = 'PLACED'
    CONFIRMED = 'CONFIRMED'
    PAID = 'PAID'
    COMPLETED = 'COMPLETED'
    CANCELED = 'CANCELED'


class Order:
    COLLECTION_NAME = "orders"

    id: str
    user_id: str
    products: list[Product]
    status: OrderStatus
    created_at: datetime
    edited_at: datetime

    def __init__(
        self,
        id: str,
        user_id: str,
        products: list[Product],
        status: OrderStatus,
        created_at=None,
        edited_at=None,
    ):
        self.id = id
        self.user_id = user_id
        self.products = products
        self.status = status

        current_time = datetime.now(timezone.utc)
        self.created_at = created_at if created_at is not None else current_time
        self.edited_at = edited_at if edited_at is not None else current_time

    def to_dict(self):
        return vars(self)
