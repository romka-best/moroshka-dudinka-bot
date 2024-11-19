from datetime import datetime, timezone
from enum import Enum
from typing import Optional, ClassVar

from pydantic import BaseModel, Field

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
    created_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))
    edited_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return vars(self)


class Order(BaseModel):
    COLLECTION_NAME: ClassVar[str] = 'orders'

    id: str
    user_id: str
    items: list[OrderItem]
    phone: str
    comment: Optional[str] = None
    status: OrderStatus = OrderStatus.PLACED
    created_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))
    edited_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return vars(self)


class CreateOrder(BaseModel):
    cart_id: str
    phone: str
    comment: Optional[str] = None


class UpdateOrder(BaseModel):
    status: Optional[OrderStatus] = None
