import {useProductCardContext} from "~/components/card/product-card/product-card-context";


type Props = {
    currency?: string;
};

function ProductPrice({ currency = 'EUR' }: Props) {
    const { product } = useProductCardContext();
    return (
        <div className="product-price">
            {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency,
            }).format(product.price)}
        </div>
    );
}

export default ProductPrice;
