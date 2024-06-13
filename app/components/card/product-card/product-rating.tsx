import * as React from 'react';
import {useProductCardContext} from "~/components/card/product-card/product-card-context";
import {Star} from "lucide-react";

function ProductRating() {
    const { product } = useProductCardContext();
    return (
        <div className="product-rating">
            {[1, 2, 3, 4, 5].map((i) =>
                i <= product.rating.stars ? (
                    <Star key={i} size={16} />
                ) : (
                    <Star key={i} size={16} />
                )
            )}
        </div>
    );
}
export default ProductRating;
