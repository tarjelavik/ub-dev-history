import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Heading, Tag, Text } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { PortableText } from "../../lib/sanity"
import { productQuery } from "../../lib/queries"
import Participants from "../../components/Props/Participants"
import Files from "../../components/Props/Files"
import Links from "../../components/Props/Links"

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/MilestonesComponent'),
  { ssr: false }
)

const projectsQuery = groq`
  *[_type in ['Product']] {
    _id,
  }
`;

export async function getStaticPaths() {
  const all = await getClient(false).fetch(projectsQuery)
  return {
    paths:
      all?.map((item) => ({
        params: {
          id: item._id,
        },
      })) || [],
    fallback: false,
  }
}

export async function getStaticProps({ params, preview = false }) {
  const now = new Date()
  let timeline = await getClient(preview).fetch(productQuery, { id: params.id, now: now })
  timeline = cleanDeep(timeline)

  return {
    props: {
      preview,
      data: timeline,
    },
  }
}

export default function Product({ data }) {
  const { item, milestones } = data
  return (
    <Layout>
      <Container variant="wrapper" centerContent>
        <Tag size={"lg"}>{item.type}</Tag>
        <Heading textAlign={"center"} mt="5" size={"3xl"}>{item.label}{` (${item.period})`}</Heading>
        {item.shortDescription && (
          <Text fontSize='xl'>
            {item.shortDescription}
          </Text>
        )}

        {item.hadParticipant && (
          <Participants participants={item.hadParticipant} />
        )}

        <Box w="100%" mb={16} display={{ base: 'none', md: 'inherit' }}>

          <MilestonesWithoutSSR
            mapping={{
              category: 'label',
              entries: 'entries'
            }}
            data={milestones}
            pattern
            p="5"
            pb="10"
            my="5"
          />
        </Box>

        {item.link && (
          <Links links={item.link} />
        )}

        {item.referredToBy && (
          <Container maxW={"3xl"} borderRadius={"8"} border={"1px solid"} borderColor={"gray.400"} boxShadow={"md"} my={"15"} pb="4">
            <Heading as="h2" size={"lg"} mt={4} borderBottom={"1px solid"}>Beskrivelse</Heading>
            <Box overflowY={"scroll"} maxH={"40vh"}>
              <PortableText blocks={item.referredToBy[0].body} />
            </Box>
          </Container>
        )}

        {item.hasFile && (
          <Files files={item.hasFile} />
        )}

      </Container>
    </Layout>
  )
}