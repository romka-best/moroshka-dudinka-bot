from datetime import datetime, timezone


class ProductType:
    COLLECTION_NAME = "product_types"

    id: str
    name: str
    created_at: datetime
    edited_at: datetime

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

    def to_dict(self):
        return vars(self)


class Product:
    COLLECTION_NAME = "products"

    id: str
    title: str
    description: str
    cost: int
    weight: int
    photos: list[str]
    type: ProductType
    composition: str
    size: dict
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
        type: ProductType,
        composition: str,
        size: dict,
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
        self.type = type
        self.composition = composition
        self.size = size
        self.count = count

        current_time = datetime.now(timezone.utc)
        self.created_at = created_at if created_at is not None else current_time
        self.edited_at = edited_at if edited_at is not None else current_time

    def to_dict(self):
        return vars(self)
