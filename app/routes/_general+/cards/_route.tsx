import {Product} from "~/components/card/product-card/product-type";
import useProduct from "~/lib/hooks/useProduct";
import ProductCard from "~/components/card/product-card/product-card";


const product: Product = {
    id: 1,
    image: 'https://iili.io/HCURIHu.jpg',
    title: 'Viston Earl Grey Tea',
    category: 'Black Tea',
    rating: {stars: 4, reviews: 4},
    price: 8.95,
};

export default function Cards() {
    const {addToCart} = useProduct(product);

    return (
        <div className="flex bg-red-100 h-dvh w-full ">
            <ProductCard
                product={product}
                image={<ProductCard.Image/>}
                info={
                    <ProductCard.Info>
                        <ProductCard.Category/>
                        <ProductCard.Title/>
                        <ProductCard.Rating/>
                        <ProductCard.Price/>
                    </ProductCard.Info>
                }
                action={
                    <ProductCard.Button onClick={addToCart}>Add to cart</ProductCard.Button>
                }
            />
        </div>
    );
}