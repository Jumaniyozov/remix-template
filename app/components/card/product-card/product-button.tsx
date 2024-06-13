import {ReactNode} from 'react';
import {useProductCardContext} from "~/components/card/product-card/product-card-context";
import {Product} from "~/components/card/product-card/product-type";

type Props = {
    children: ReactNode;
    onClick: (product: Product) => void;
};

function ProductButton({children, onClick}: Props) {
    const {product} = useProductCardContext();

    const handleClick = () => {
        onClick(product);
    };

    return (
        <button type="button" onClick={handleClick} className="product-button">
            {children}
        </button>
    );
}

export default ProductButton;
