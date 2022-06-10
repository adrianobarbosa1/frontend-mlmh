import { Box, Heading, Text } from "@chakra-ui/react";

const products = [
    {
        name: 'Product 1',
        desc: 'A nice thing',
        price: '$9.99',
    },
    {
        name: 'Product 2',
        desc: 'Another thing',
        price: '$3.45',
    },
    {
        name: 'Product 3',
        desc: 'Something else',
        price: '$6.51',
    },
    {
        name: 'Product 4',
        desc: 'Best thing of all',
        price: '$14.11',
    },
    { name: 'Shipping', desc: '', price: 'Free' },
];

export default function Review() {
    return (
        <>

            <Box>
                {products.map((product) => (
                    <Box key={product.name}>
                        <Text>{product.name}</Text>
                        <Heading variant="body2">{product.price}</Heading>
                    </Box>
                ))}
            </Box>

        </>
    );
}