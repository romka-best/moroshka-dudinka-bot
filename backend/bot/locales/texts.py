from typing import Protocol


class Texts(Protocol):
    START = """
Привет 🎉
"""
    ORDER_CAKES = "Заказать тортики 🎂"

    # errors
    NETWORK_ERROR = """
У меня разорвалось соединение с Telegram 🤒

Попробуйте ещё раз, пожалуйста 🥺
"""
    CONNECTION_ERROR = """
У меня разорвалось соединение с моей базой данных 🤒

Попробуйте ещё раз, пожалуйста 🥺
"""
