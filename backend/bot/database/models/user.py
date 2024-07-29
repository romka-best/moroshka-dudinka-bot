from datetime import datetime, timezone
from typing import ClassVar, Optional

from pydantic import Field, BaseModel


class User(BaseModel):
    COLLECTION_NAME: ClassVar[str] = "users"

    id: str
    first_name: str
    last_name: str
    username: str
    photo_url: str
    is_blocked: bool
    is_banned: bool
    is_admin: bool
    created_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))
    edited_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return vars(self)
