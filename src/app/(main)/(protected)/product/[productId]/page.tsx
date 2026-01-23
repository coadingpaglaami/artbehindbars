import { ProductInformation } from "@/webcomponents/protected";

interface ProductInfoPageProps {
    params: { productId: string };
}

export default async function ProductInfoPage({params}: ProductInfoPageProps) {
    const { productId } = await params;
    

    return (
        <ProductInformation productId={productId} />
    );
}