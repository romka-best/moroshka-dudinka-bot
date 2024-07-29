import os
from pathlib import Path
from typing import ClassVar

from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr


class Settings(BaseSettings):
    BASE_DIR: ClassVar[Path] = Path(__file__).resolve().parent.parent

    WEBHOOK_URL: str
    WEB_APP_URL: str

    MAX_RETRIES: int = 2
    BATCH_SIZE: int = 500

    CERTIFICATE_NAME: SecretStr
    STORAGE_NAME: SecretStr

    BOT_URL: str
    BOT_TOKEN: SecretStr

    model_config = SettingsConfigDict(env_file=str(BASE_DIR / f'.env.{os.getenv("ENVIRONMENT", "testing")}'),
                                      env_file_encoding='utf-8')


config = Settings()
