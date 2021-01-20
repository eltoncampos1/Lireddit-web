import { withUrqlClient } from "next-urql"
import Layout from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from 'next/link';
import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10,
    }
    
  });

    if (!fetching && !data) {
      return <div>you got query failed for some reason</div>
    }

    return (
      <Layout>
        <Flex align="center">
        <Heading>LiReddit</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">Create post</Link>
        </NextLink>
        </Flex>
        <br/>
        {fetching && !data ? (
          <div>loading...</div>
        ): (
          <Stack spacing={8}>
            { data!.posts.map((post) => (
              <Box key={post.id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{post.title}</Heading>
                <Text mt={4}>{post.textSnippet}</Text>
             </Box>
            ))}
          </Stack>
        )}
          { data ?
            (<Flex>
              <Button isLoading={fetching} m="auto" my={8}>load more</Button>
            </Flex>) 
          : null}
      </Layout>
    )}

export default withUrqlClient(createUrqlClient, { ssr: true }) (Index);
