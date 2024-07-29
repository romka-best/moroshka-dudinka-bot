from datetime import datetime, timezone
from typing import Optional, ClassVar

from pydantic import BaseModel, Field


class ProductType(BaseModel):
    COLLECTION_NAME: ClassVar[str] = "product_types"

    id: str
    name: str
    is_deleted: bool
    created_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))
    edited_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return vars(self)


class CreateProductType(BaseModel):
    name: str


class Product(BaseModel):
    COLLECTION_NAME: ClassVar[str] = "products"

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
    created_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))
    edited_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return vars(self)
