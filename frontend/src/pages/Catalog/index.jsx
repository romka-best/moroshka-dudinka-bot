import { useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsTypes } from '../../store/products/actions';
import { selectProducts } from '../../store/products/selector';
import CategoryItem from '../../components/CategoryItem';
import css from './Catalog.module.scss';
import { Grid } from 'antd-mobile';

const ALL_PRODUCTS_CATEGORY = {
  name: 'Все товары',
  id: 'ALL',
}

const Catalog = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(selectProducts);

  useLayoutEffect(() => {
    dispatch(getProductsTypes());
  }, []);

  const categoryItems = useMemo(() => (
    categories.map(category => (
      <Grid.Item key={category?.id}>
        <CategoryItem category={category} />
      </Grid.Item>
    ))
  ), [categories]);

  return (
    <div>
      <h1 className={css['Catalog-title']}>Каталог</h1>
      <div className={css['Catalog-container']}>
        <Grid columns={2} gap={10}>
          <Grid.Item>
            <CategoryItem category={ALL_PRODUCTS_CATEGORY} />
          </Grid.Item>
          {categoryItems}
        </Grid>
      </div>
    </div>
  );
};

export default Catalog;
