import {Product} from "~/components/card/product-card/product-type";


function useProduct(product: Product) {
    const addToCart = () => {
        console.log('Added:', product);
    };

    return { addToCart };
}

export default useProduct;
