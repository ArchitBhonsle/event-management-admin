import { Button, Flex, HStack, IconButton } from '@chakra-ui/react';
import {
  MdNavigateNext,
  MdNavigateBefore,
  MdFirstPage,
  MdLastPage,
} from 'react-icons/md';

import getInclusiveRange from '../utils/getInclusiveRange';

function getPageRange(page, max) {
  let low = Math.max(1, page - 5);
  let high = Math.min(max, low + 10);
  low = Math.max(1, high - 10);

  return [low, high];
}

export default function PageControls({ page, changePage, max }) {
  return (
    <Flex wrap="nowrap">
      <HStack>
        <IconButton
          aria-label="go to first page"
          icon={<MdFirstPage />}
          onClick={() => changePage(1)}
          isDisabled={page === 1}
        ></IconButton>
        <IconButton
          aria-label="go to previous page"
          icon={<MdNavigateBefore />}
          onClick={() => changePage(Math.max(1, page - 1))}
          isDisabled={page === 1}
        ></IconButton>
        {getInclusiveRange(...getPageRange(page, max)).map(num => (
          <Button
            key={num}
            colorScheme={`${page === num ? 'green' : 'gray'}`}
            variant={`${page === num ? 'solid' : 'outline'}`}
            onClick={() => changePage(num)}
            width="2.5rem"
          >
            {num}
          </Button>
        ))}
        <IconButton
          aria-label="go to next page"
          icon={<MdNavigateNext />}
          onClick={() => changePage(Math.min(page + 1, max))}
          isDisabled={page === max}
        ></IconButton>
        <IconButton
          aria-label="go to last page"
          icon={<MdLastPage />}
          onClick={() => changePage(max)}
          isDisabled={page === max}
        ></IconButton>
      </HStack>
    </Flex>
  );
}
