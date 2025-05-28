import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";

export default function Services() {
  return (
    <Container>
      <span className="text-4xl">⚕️</span>
      <Heading className="font-black">Szolgáltatások</Heading>
      <Paragraph className="max-w-xl mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Részletes 
        leírás az általam kínált szakmai szolgáltatásokról.
      </Paragraph>
      <Paragraph className="max-w-xl mt-4">
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
        officia deserunt. Minden szolgáltatás személyre szabott megközelítéssel.
      </Paragraph>
    </Container>
  );
} 