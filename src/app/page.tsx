import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <span className="text-4xl">🦶</span>
      <Heading className="font-black">Lorem ipsum dolor sit amet</Heading>
      <Paragraph className="max-w-xl mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
        tempor incididunt ut <Highlight>labore et dolore</Highlight> magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco.
      </Paragraph>
      <Paragraph className="max-w-xl mt-4">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
        dolore eu fugiat nulla pariatur. <Highlight>Excepteur sint occaecat</Highlight> 
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Paragraph>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        Lorem ipsum consectetur adipiscing
      </Heading>
    </Container>
  );
}
