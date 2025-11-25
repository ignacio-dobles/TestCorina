import {
  Container,
  Heading,
  Input,
  SimpleGrid,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { fetchProducts } from "../../lib/fetch";
import type { Product } from "../../lib/types";

export const getServerSideProps = async () => {
  const data = await fetchProducts({ limit: 50 });

  return {
    props: {
      products: data.products,
    },
  };
};

type Props = {
  products: Product[];
};

export default function ProductsPage({ products }: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return products.filter((p) => p.title.toLowerCase().includes(s));
  }, [search, products]);

  return (
    <Container maxW="6xl" py={8}>
      <Heading size="lg" mb={6}>
        Products
      </Heading>

      {/* SEARCH BAR */}
      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb={8}
      />

      {/* PRODUCT GRID */}
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
        {filtered.map((p) => (
          <Box
            key={p.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            bg="white"
            _hover={{ shadow: "md" }}
          >
            <Image
              src={p.thumbnail ?? p.images?.[0]}
              alt={p.title}
              objectFit="cover"
              w="100%"
              h="180px"
              mb={3}
            />

            <Text fontWeight="bold" noOfLines={1}>
              {p.title}
            </Text>

            <Text color="gray.600" mt={2}>
              ${p.price}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
