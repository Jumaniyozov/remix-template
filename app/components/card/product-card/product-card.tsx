import './product-card.css'
import ProductCardContext from "~/components/card/product-card/product-card-context";
import {Product} from "~/components/card/product-card/product-type";
import {ReactNode} from "react";
import ProductImage from "~/components/card/product-card/product-image";
import ProductButton from "~/components/card/product-card/product-button";
import ProductTitle from "~/components/card/product-card/product-title";
import ProductInfo from "~/components/card/product-card/product-info";
import ProductCategory from "~/components/card/product-card/product-category";
import ProductRating from "~/components/card/product-card/product-rating";
import ProductPrice from "~/components/card/product-card/product-price";


type Props = {
    product: Product;
    image?: ReactNode;
    info?: ReactNode;
    action?: ReactNode;
};

function ProductCard({ image, info, action, product }: Props) {
    return (
        <ProductCardContext.Provider value={{ product }}>
            <div className="product-card">
                {image}
                <div className="product-card-bottom">
                    {info}
                    {action}
                </div>
            </div>
        </ProductCardContext.Provider>
    );
}

ProductCard.Image = ProductImage;
ProductCard.Button = ProductButton;
ProductCard.Title = ProductTitle;
ProductCard.Info = ProductInfo;
ProductCard.Category = ProductCategory;
ProductCard.Rating = ProductRating;
ProductCard.Price = ProductPrice;

export default ProductCard;
