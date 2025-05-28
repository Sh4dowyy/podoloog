import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";

export default function Therapy() {
  return (
    <Container>
      <span className="text-4xl">💆‍♀️</span>
      <Heading className="font-black">Fiziológia, biomechanika és fizioterápia</Heading>
      <Paragraph className="max-w-xl mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hogyan 
        segíthetünk a lábproblémák kezelésében modern módszerekkel.
      </Paragraph>
      <Paragraph className="max-w-xl mt-4">
        Duis aute irure dolor in reprehenderit in voluptate velit esse. 
        Speciális terápiás megközelítések és rehabilitációs technikák.
      </Paragraph>
    </Container>
  );
} 