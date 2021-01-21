import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment } from "../generated/graphql";

interface UpdootSectionProps {
    post: PostSnippetFragment;
}

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        aria-label="updoot post"
        w="24px"
        h="24px"
        icon={<ChevronUpIcon />}
      />
      {post.points}
      <IconButton
        aria-label="downdoot post"
        w="24px"
        h="24px"
        icon={<ChevronDownIcon />}
      />
    </Flex>
  );
};
export default UpdootSection;
