interface Product {
    id?: bigint;
    sku?: string;
    name?: string;
    description?: string;
    price?: number;
    thumbnail?: string;
    images?: string[];
    weight?: number;
    createdAt?: Date;
}