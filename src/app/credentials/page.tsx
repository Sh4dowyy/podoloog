import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";

export default function Credentials() {
  return (
    <Container>
      <span className="text-4xl">🏆</span>
      <Heading className="font-black">Diplomák és elismerések</Heading>
      <Paragraph className="max-w-xl mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Szakmai 
        képesítéseim és elismeréseim a podológia területén.
      </Paragraph>
      <Paragraph className="max-w-xl mt-4">
        Duis aute irure dolor in reprehenderit in voluptate velit esse. 
        Folyamatos képzésekkel naprakész maradok a legújabb módszerekben.
      </Paragraph>
    </Container>
  );
} 