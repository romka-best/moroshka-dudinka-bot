from datetime import datetime, timezone
from typing import Optional, ClassVar

from pydantic import BaseModel, Field


class ProductType(BaseModel):
    COLLECTION_NAME: ClassVar[str] = 'product_types'

    id: str
    name: str
    system_name: str
    icon: str
    is_deleted: Optional[bool] = False
    created_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))
    edited_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return vars(self)


class CreateProductType(BaseModel):
    name: str
    icon: Optional[str] = 'DEFAULT'


class UpdateProductType(BaseModel):
    name: Optional[str] = None
    icon: Optional[str] = None


class Product(BaseModel):
    COLLECTION_NAME: ClassVar[str] = 'products'

    id: str
    title: str
    system_title: str
    description: str
    cost: int
    weight: int
    photos: list[str]
    type_ids: list[str]
    composition: Optional[str]
    size: Optional[dict]
    count: int
    is_deleted: Optional[bool] = False
    created_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))
    edited_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return vars(self)


class CreateProduct(BaseModel):
    title: str
    description: str
    cost: int
    weight: int
    photos: Optional[list[str]] = []
    type_ids: Optional[list[str]] = []
    composition: Optional[str] = None
    size: Optional[dict] = None
    count: int


class UpdateProduct(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    cost: Optional[int] = None
    weight: Optional[int] = None
    photos: Optional[list[str]] = None
    type_ids: Optional[list[str]] = None
    composition: Optional[str] = None
    size: Optional[dict] = None
    count: Optional[int] = None
