import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, Image, Grid, Text, VStack, IconButton, Spacer, Icon } from '@chakra-ui/react'
import { urlFor } from "../../lib/sanity"
import Link from '../Link'
import { BsChatQuote } from 'react-icons/bs'

const ItemHeader = ({ label, blurb, quote, image, continued, continuedBy, children }) => {
  return (
    <Grid>
      <Flex columnGap={'30px'}>
        <Box>

          {image ? (
            <Image
              border={'solid #eee 1px'}
              borderRadius={3}
              src={urlFor(image).width(200).url()}
              mb={"5"}
              boxSize='100px'
              objectFit='cover'
              alt=''
            />
          ) :
            <Box
              border={'solid #eee 1px'}
              bg={'gray.100'}
              boxSize='100px'
            >
            </Box>
          }
          {(continued || continuedBy) && (
            <Flex
              mt={2}
            >
              {continued && (
                <VStack>
                  {continued.map(e => (
                    <Link key={e.id} href={`/project/${e.id}`}>
                      <IconButton
                        isRound
                        aria-label={e.label}
                        icon={<ChevronLeftIcon />}
                      />
                    </Link>
                  ))}
                </VStack>
              )}

              <Spacer />

              {continuedBy && (
                <VStack>
                  {continuedBy.map(e => (
                    <Link key={e.id} href={`/project/${e.id}`}>
                      <IconButton
                        isRound
                        aria-label={e.label}
                        icon={<ChevronRightIcon />}
                      />
                    </Link>
                  ))}
                </VStack>
              )}

            </Flex>
          )}
        </Box>

        <Grid>
          <Heading size={"xl"}>
            {label}
          </Heading>
          {quote && (
            <Text fontSize='lg' m="0">
              <em>
                <Icon as={BsChatQuote} mr={2} />{quote}
              </em>
            </Text>
          )}

          {blurb && (
            <Text fontSize='md' m="0">
              {blurb}
            </Text>
          )}
          {children}
        </Grid>
      </Flex >
    </Grid >
  )
}

export default ItemHeader
