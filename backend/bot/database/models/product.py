from datetime import datetime, timezone
from typing import Optional

from pydantic import BaseModel


class ProductType(BaseModel):
    COLLECTION_NAME = "product_types"

    id: str
    name: str
    is_deleted: bool
    created_at: Optional[datetime] = None
    edited_at: Optional[datetime] = None

    def __init__(
        self,
        id: str,
        name: str,
        created_at=None,
        edited_at=None,
    ):
        self.id = id
        self.name = name

        current_time = datetime.now(timezone.utc)
        self.created_at = created_at if created_at is not None else current_time
        self.edited_at = edited_at if edited_at is not None else current_time

        super().__init__(
            id=id,
            name=name,
            created_at=created_at,
            edited_at=edited_at,
        )

    def to_dict(self):
        return vars(self)


class CreateProductType(BaseModel):
    name: str


class Product(BaseModel):
    COLLECTION_NAME = "products"

    id: str
    title: str
    description: str
    cost: int
    weight: int
    photos: list[str]
    type_id: Optional[str]
    composition: Optional[str]
    size: Optional[dict]
    count: int
    created_at: datetime
    edited_at: datetime

    def __init__(
        self,
        id: str,
        title: str,
        description: str,
        cost: int,
        weight: int,
        photos: list[str],
        type_id: Optional[str],
        composition: Optional[str],
        size: Optional[dict],
        count: int,
        created_at=None,
        edited_at=None,
    ):
        self.id = id
        self.title = title
        self.description = description
        self.cost = cost
        self.weight = weight
        self.photos = photos
        self.type_id = type_id
        self.composition = composition
        self.size = size
        self.count = count

        current_time = datetime.now(timezone.utc)
        self.created_at = created_at if created_at is not None else current_time
        self.edited_at = edited_at if edited_at is not None else current_time

        super().__init__(
            id=id,
            title=title,
            description=description,
            cost=cost,
            weight=weight,
            photos=photos,
            type_id=type_id,
            composition=composition,
            size=size,
            count=count,
            created_at=created_at,
            edited_at=edited_at,
        )

    def to_dict(self):
        return vars(self)
