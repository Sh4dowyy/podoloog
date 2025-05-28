import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";

export default function Anatomy() {
  return (
    <Container>
      <span className="text-4xl">🦴</span>
      <Heading className="font-black">Anatómia és lehetséges betegségek</Heading>
      <Paragraph className="max-w-xl mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Megismerheti 
        a lábak anatómiáját és a leggyakoribb körömbetegségeket.
      </Paragraph>
      <Paragraph className="max-w-xl mt-4">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. 
        Részletes információk a megelőzésről és a korai felismerésről.
      </Paragraph>
    </Container>
  );
} 