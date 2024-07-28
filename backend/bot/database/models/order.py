from datetime import datetime, timezone
from enum import Enum
from typing import Optional

from pydantic import BaseModel

from bot.database.models.product import Product


class OrderStatus(str, Enum):
    PLACED = 'PLACED'
    CONFIRMED = 'CONFIRMED'
    PAID = 'PAID'
    COMPLETED = 'COMPLETED'
    CANCELED = 'CANCELED'


class OrderItem(BaseModel):
    product: Product
    count: int
    created_at: Optional[datetime] = None
    edited_at: Optional[datetime] = None

    def __init__(
        self,
        product: Product,
        count: int,
        created_at=None,
        edited_at=None,
    ):
        self.product = product
        self.count = count

        current_time = datetime.now(timezone.utc)
        self.created_at = created_at if created_at is not None else current_time
        self.edited_at = edited_at if edited_at is not None else current_time

        super().__init__(
            product=product,
            count=count,
            created_at=created_at,
            edited_at=edited_at,
        )

    def to_dict(self):
        return vars(self)


class Order(BaseModel):
    COLLECTION_NAME = "orders"

    id: str
    user_id: str
    items: list[OrderItem]
    status: OrderStatus = OrderStatus.PLACED
    created_at: Optional[datetime] = None
    edited_at: Optional[datetime] = None

    def __init__(
        self,
        id: str,
        user_id: str,
        items: list[OrderItem],
        status: OrderStatus,
        created_at=None,
        edited_at=None,
    ):
        self.id = id
        self.user_id = user_id
        self.items = items
        self.status = status

        current_time = datetime.now(timezone.utc)
        self.created_at = created_at if created_at is not None else current_time
        self.edited_at = edited_at if edited_at is not None else current_time

        super().__init__(
            id=id,
            user_id=user_id,
            items=items,
            status=status,
            created_at=created_at,
            edited_at=edited_at,
        )

    def to_dict(self):
        return vars(self)


class CreateOrder(BaseModel):
    cart_id: str


class UpdateOrder(BaseModel):
    status: Optional[OrderStatus] = None
