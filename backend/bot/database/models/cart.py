from datetime import datetime, timezone
from typing import Optional

from pydantic import BaseModel


class CartItem(BaseModel):
    product_id: str
    count: int
    created_at: Optional[datetime] = None
    edited_at: Optional[datetime] = None

    def __init__(
        self,
        product_id: str,
        count: int,
        created_at=None,
        edited_at=None,
    ):
        self.product_id = product_id
        self.count = count

        current_time = datetime.now(timezone.utc)
        self.created_at = created_at if created_at is not None else current_time
        self.edited_at = edited_at if edited_at is not None else current_time

        super().__init__(
            product_id=product_id,
            count=count,
            created_at=created_at,
            edited_at=edited_at,
        )

    def to_dict(self):
        return vars(self)


class Cart(BaseModel):
    COLLECTION_NAME = "carts"

    id: str
    user_id: str
    items: list[CartItem]
    created_at: Optional[datetime] = None
    edited_at: Optional[datetime] = None

    def __init__(
        self,
        id: str,
        user_id: str,
        items: list[CartItem],
        created_at=None,
        edited_at=None,
    ):
        self.id = id
        self.user_id = user_id
        self.items = items

        current_time = datetime.now(timezone.utc)
        self.created_at = created_at if created_at is not None else current_time
        self.edited_at = edited_at if edited_at is not None else current_time

        super().__init__(
            id=id,
            user_id=user_id,
            items=items,
            created_at=created_at,
            edited_at=edited_at,
        )

    def to_dict(self):
        return vars(self)
