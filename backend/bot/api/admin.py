from uuid import uuid4

from fastapi import APIRouter, HTTPException, status, UploadFile, File
from fastapi.responses import JSONResponse

from bot.database.main import firebase
from bot.database.models.order import UpdateOrder
from bot.database.models.product import CreateProductType, CreateProduct, UpdateProduct, UpdateProductType
from bot.database.operations.cart.getters import get_carts
from bot.database.operations.order.getters import get_orders, get_order
from bot.database.operations.order.updaters import update_order
from bot.database.operations.product.getters import get_products, get_product, get_product_type
from bot.database.operations.product.updaters import update_product, update_product_type
from bot.database.operations.product.writers import write_product_type, write_product
from bot.database.operations.user.getters import get_user
from bot.helpers.destructors.destruct_product import destruct_product
from bot.helpers.destructors.destruct_product_type import destruct_product_type

admin_router = APIRouter(
    prefix='/admin',
    tags=['admin'],
)


@admin_router.get('/orders', tags=['order'])
async def get_all_orders():
    orders = await get_orders()

    result = []
    for order in orders:
        result.append({
            'id': order.id,
            'status': order.status,
        })

    return result


@admin_router.get('/orders/{order_id}', tags=['order'])
async def get_order_by_id(order_id: str):
    order = await get_order(order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Order not found')

    user = await get_user(order.user_id)
    items = [order_item.to_dict() for order_item in order.items]
    return {
        'id': order.id,
        'user': user.to_dict(),
        'items': items,
        'phone': order.phone,
        'comment': order.comment,
        'status': order.status,
    }


@admin_router.patch('/orders/{order_id}', tags=['order'])
async def update_order_by_id(order_id: str, updated_order: UpdateOrder):
    order = await get_order(order_id)
    if not order:
        raise HTTPException(status_code=404, detail='Order not found')

    if updated_order.status is not None and updated_order.status != order.status:
        await update_order(order.id, {
            'status': updated_order.status
        })

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={'message': 'Order status was changed'}
        )

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={'message': 'Nothing was changed'}
    )


@admin_router.post('/products', tags=['product'])
async def create_product(created_product: CreateProduct):
    product = await write_product(
        title=created_product.title,
        description=created_product.description,
        cost=created_product.cost,
        weight=created_product.weight,
        photos=created_product.photos,
        type_ids=created_product.type_ids,
        composition=created_product.composition,
        size=created_product.size,
        count=created_product.count,
    )

    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content={'message': f'Product {product.id} was created'}
    )


@admin_router.post('/products/images', tags=['product'])
async def upload_product_image(file: UploadFile = File(...)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail='Uploaded file is not an image')

    photo_name = f'{uuid4()}.{file.filename.split(".")[-1]}'
    photo_path = f'products/{photo_name}'
    photo_blob = firebase.bucket.new_blob(photo_path)
    photo_data = await file.read()
    await photo_blob.upload(photo_data, content_type=file.content_type)
    photo_link = firebase.get_public_url(photo_blob.name)

    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content={'result': photo_link}
    )


@admin_router.patch('/products/{product_id}', tags=['product'])
async def update_product_by_id(product_id: str, updated_product: UpdateProduct):
    product = await get_product(product_id)
    if not product:
        raise HTTPException(status_code=404, detail='Product not found')

    if updated_product:
        await update_product(product.id, {
            'title': updated_product.title if updated_product.title is not None else product.title,
            'description': updated_product.description if updated_product.description is not None else product.description,
            'cost': updated_product.cost if updated_product.cost is not None else product.cost,
            'weight': updated_product.weight if updated_product.weight is not None else product.weight,
            'photos': updated_product.photos if updated_product.photos is not None else product.photos,
            'type_ids': updated_product.type_ids if updated_product.type_ids is not None else product.type_ids,
            'composition': updated_product.composition if updated_product.composition is not None else product.composition,
            'size': updated_product.size if updated_product.size is not None else product.size,
            'count': updated_product.count if updated_product.count is not None else product.count,
        })

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={'message': 'Product was changed'}
        )

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={'message': 'Nothing was changed'}
    )


@admin_router.delete('/products/{product_id}', tags=['product'])
async def delete_product(product_id: str):
    carts = await get_carts()
    transaction = firebase.db.transaction()
    await destruct_product(transaction, product_id, carts)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={'message': 'Product was deleted'}
    )


@admin_router.post('/products/types', tags=['product'])
async def create_product_type(created_product_type: CreateProductType):
    product_type = await write_product_type(created_product_type.name, created_product_type.icon)

    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content={'message': f'Product type {product_type.id} was created'}
    )


@admin_router.patch('/products/types/{product_type_id}', tags=['product'])
async def update_product_type_by_id(product_type_id: str, updated_product_type: UpdateProductType):
    product_type = await get_product_type(product_type_id)
    if not product_type:
        raise HTTPException(status_code=404, detail='Product type not found')

    if updated_product_type:
        await update_product_type(product_type.id, {
            'name': updated_product_type.name if updated_product_type.name is not None else updated_product_type.name,
            'icon': updated_product_type.icon if updated_product_type.icon is not None else updated_product_type.icon,
        })

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={'message': 'Product type was changed'}
        )

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={'message': 'Nothing was changed'}
    )


@admin_router.delete('/products/types/{product_type_id}', tags=['product'])
async def delete_product_type(product_type_id: str):
    products = await get_products()
    transaction = firebase.db.transaction()
    await destruct_product_type(transaction, product_type_id, products)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={'message': 'Product type was deleted'}
    )
