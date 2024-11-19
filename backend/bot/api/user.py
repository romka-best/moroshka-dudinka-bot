from fastapi import APIRouter, HTTPException, status

from bot.database.operations.cart.getters import get_cart_by_user_id
from bot.database.operations.user.getters import get_user

user_router = APIRouter(
    prefix='/users',
    tags=['user'],
)


@user_router.get('/{user_id}')
async def get_user_by_id(user_id: str):
    user = await get_user(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')

    cart = await get_cart_by_user_id(user.id)
    cart_count = sum(item.count for item in cart.items)

    return {
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'username': user.username,
        'photo_url': user.photo_url,
        'cart': {
            'id': cart.id,
            'count': cart_count,
        },
        'is_admin': user.is_admin,
    }
