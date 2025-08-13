import { Container, Heading, Code} from '@chakra-ui/react';
import { fetchProducts } from '../../lib/fetch';

export const getServerSideProps = async () => {
  const data = await fetchProducts();
  return { props: { data, } };

};

export default function ProductsPage({ data }) {
  console.log({data})
  return (
    <Container maxW="6xl" py={8}>
      <Heading size="lg" mb={4}>Products</Heading>
      <Code whiteSpace="pre-wrap">{JSON.stringify(data, null, 5)}</Code>
    </Container>
  );
} 