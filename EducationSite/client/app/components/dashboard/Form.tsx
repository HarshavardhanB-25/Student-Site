'use client'

import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

interface GetResultFormProps {
  heading: string; // Define the type for heading
  description: string; // Define the type for description
}

const GetResultForm: React.FC<GetResultFormProps> = ({ heading, description }) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      rounded="lg"
      bg={useColorModeValue('gray.120', 'gray.800')}
      boxShadow="lg"
      p={8}
    >
      <Heading fontSize="4xl" marginBottom="15px">{heading}</Heading>
      <Text fontSize="lg" color="gray.600" marginBottom="15px">
        {description}
      </Text>
      <Stack spacing={4} mt={4}>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="exam" marginBottom="15px">
          <FormLabel>Exam Number</FormLabel>
          <Input type="text" />
        </FormControl>
        <Button
          bg="green.400"
          color="white"
          rounded="full"
          _hover={{
            bg: 'green.500',
          }}
        >
          Get Result
        </Button>
      </Stack>
    </Flex>
  );
}

export default GetResultForm;
