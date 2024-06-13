import {useProductCardContext} from "~/components/card/product-card/product-card-context";

function ProductImage() {
    const { product } = useProductCardContext();
    return (
        <div className="product-image">
            <img src={product.image} alt="" />
        </div>
    );
}

export default ProductImage;
