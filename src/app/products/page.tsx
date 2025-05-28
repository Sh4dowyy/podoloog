import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";

export default function Products() {
  return (
    <Container>
      <span className="text-4xl">🧪</span>
      <Heading className="font-black">Termékek és eszközök</Heading>
      <Paragraph className="max-w-xl mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Itt találja meg 
        azokat a speciális termékeket és eszközöket, amelyekkel dolgozom a 
        lábbetegségek kezelésében.
      </Paragraph>
      <Paragraph className="max-w-xl mt-4">
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Minden termék magas minőségű és szakmailag ellenőrzött.
      </Paragraph>
    </Container>
  );
} 