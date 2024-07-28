from datetime import datetime, timezone


class User:
    COLLECTION_NAME = "users"

    id: str
    first_name: str
    last_name: str
    username: str
    photo_url: str
    is_blocked: bool
    is_banned: bool
    is_admin: bool
    created_at: datetime
    edited_at: datetime

    def __init__(
        self,
        id: str,
        first_name: str,
        last_name: str,
        username: str,
        photo_url: str,
        is_blocked=False,
        is_banned=False,
        is_admin=False,
        created_at=None,
        edited_at=None,
    ):
        self.id = str(id)
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.photo_url = photo_url
        self.is_blocked = is_blocked
        self.is_banned = is_banned
        self.is_admin = is_admin

        current_time = datetime.now(timezone.utc)
        self.created_at = created_at if created_at is not None else current_time
        self.edited_at = edited_at if edited_at is not None else current_time

    def to_dict(self):
        return vars(self)
