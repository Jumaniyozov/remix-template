import {useProductCardContext} from "~/components/card/product-card/product-card-context";

function ProductTitle() {
    const { product } = useProductCardContext();
    return <div className="product-title">{product.title}</div>;
}

export default ProductTitle;
