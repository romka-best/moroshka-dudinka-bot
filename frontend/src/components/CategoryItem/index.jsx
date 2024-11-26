import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './CategoryItem.module.scss';
import PropTypes from 'prop-types';
import CATEGORY_ICONS from '../../assets/CATEGORY_ICONS.json';

const CategoryItem = ({ category }) => {
  const navigate = useNavigate();
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    // Получаем путь к SVG файлу
    const svgPath = CATEGORY_ICONS?.[category?.icon];
    
    if (svgPath) {
      fetch(svgPath)
      .then(response => response.text())
      .then(setSvgContent)
      .catch(console.error);
    }
  }, [category]);

  const handleRedirectCategory = () => {
    navigate(`/category/${category?.id}/${category?.name}`);
  };

  return (
    <div className={css['CategoryItem']} onClick={handleRedirectCategory}>
      <p className={css['CategoryItem-title']}>{category?.name}</p>
      <div
        className={css['CategoryItem-icon']}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    icon: PropTypes.string,
  })
};

export default CategoryItem;