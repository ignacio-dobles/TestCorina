import {
  Container,
  Heading,
  Text,
  Image,
  Box,
  Button,
  Stack,
} from "@chakra-ui/react";
import { fetchProduct } from "../../lib/fetch";
import type { Product } from "../../lib/types";

type FullProduct = Product & {
  description?: string;
  brand?: string;
};

type Props = {
  product: FullProduct;
};

export default function ProductDetailPage({ product }: Props) {
  return (
    <Container maxW="5xl" py={10}>
      <Stack direction={["column", "row"]} spacing={10}>
        {/* Image on the left side */}
        <Box flex="1">
          <Image
            src={product.thumbnail ?? product.images?.[0]}
            alt={product.title}
            borderRadius="md"
            objectFit="cover"
            w="100%"
            h="350px"
          />
        </Box>

        {/* Info on the right side of product pge */}
        <Box flex="1">
          <Heading mb={4}>{product.title}</Heading>

          <Text fontSize="lg" color="gray.600" mb={2}>
            Brand: {product.brand ?? "N/A"}
          </Text>

          <Text color="gray.700" mb={6}>
            {product.description ?? "No description available."}
          </Text>

          {/* This is a placeholder button, does not do anything right now */ } 
          <Button colorScheme="blue" size="lg">
            Add to Cart
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

export async function getServerSideProps({ params }) {
  const product = await fetchProduct(params.id);

  return {
    props: { product },
  };
}
