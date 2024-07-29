from datetime import datetime, timezone
from typing import ClassVar, Optional

from pydantic import BaseModel, Field


class CartItem(BaseModel):
    product_id: str
    count: int
    created_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))
    edited_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return vars(self)


class Cart(BaseModel):
    COLLECTION_NAME: ClassVar[str] = "carts"

    id: str
    user_id: str
    items: list[CartItem]
    created_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))
    edited_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return vars(self)
