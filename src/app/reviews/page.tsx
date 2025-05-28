import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";

export default function Reviews() {
  return (
    <Container>
      <span className="text-4xl">⭐</span>
      <Heading className="font-black">Vélemények és tapasztalatok</Heading>
      <Paragraph className="max-w-xl mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Olvassa el 
        pácienseim véleményeit és tapasztalatait.
      </Paragraph>
      <Paragraph className="max-w-xl mt-4">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco. 
        Valódi visszajelzések a kezelések hatékonyságáról.
      </Paragraph>
    </Container>
  );
} 