import { useContext, useState, useEffect, Fragment } from 'react';
import { CategoriesContext } from '../../context/categories.context';

import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product.card.component';

import {CategoryContainer, CategoryTitle} from './category.styles.jsx';

const Category = () => {

  const { categoriesMap } = useContext(CategoriesContext)
  const { category } = useParams();
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {
          products && products.map((product) => <ProductCard key={product.id} product={product}/>)
        }
      </CategoryContainer>
    </Fragment>
  )
};

export default Category;