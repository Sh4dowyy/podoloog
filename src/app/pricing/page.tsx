import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";

export default function Pricing() {
  return (
    <Container>
      <span className="text-4xl">💰</span>
      <Heading className="font-black">Árak és szolgáltatási csomagok</Heading>
      <Paragraph className="max-w-xl mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Átlátható 
        árképzés és különböző szolgáltatási csomagok.
      </Paragraph>
      <Paragraph className="max-w-xl mt-4">
        Sed do eiusmod tempor incididunt ut labore et dolore magna. 
        Minden ár tartalmazza a konzultációt és a kezelési tervet.
      </Paragraph>
    </Container>
  );
} 