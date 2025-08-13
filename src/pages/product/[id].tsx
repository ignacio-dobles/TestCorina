import { GetServerSideProps } from 'next';
import { Container, Heading, Code } from '@chakra-ui/react';
import Image from 'next/image';
import { fetchProduct } from '@/lib/fetch';

type Product = any; // intentionally loose

type Props = { product: Product };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const id = ctx.params?.id;

  const product = await fetchProduct(id);

  return { props: { product } };
};

export default function ProductPage({ product }: Props) {
  return (
    <Container maxW="4xl" py={8}>
      <Heading size="lg" mb={4}>Product</Heading>
      <Code whiteSpace="pre-wrap">{JSON.stringify(product, null, 5)}</Code>
    </Container>
  );
} 