import {useProductCardContext} from "~/components/card/product-card/product-card-context";

function ProductCategory() {
    const { product } = useProductCardContext();
    return <div className="product-category">{product.category}</div>;
}

export default ProductCategory;
