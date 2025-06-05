import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hinnad | Alla Hüvenen - Podoloog Tartus | Soodsad hinnad",
  description: "Podoloogia teenuste hinnad Tartus. Soodsad hinnad probleemse pediküüri, sissekasvanud küünte ravi ja jalgade hoolduse jaoks. Цены на услуги подолога в Тарту.",
  keywords: [
    "podoloog hinnad Tartu",
    "pediküür hind",
    "sissekasvanud küünte ravi hind",
    "jalgade hooldus hind",
    "soodsad hinnad podoloog",
    "цены подолог Тарту",
    "стоимость педикюра"
  ],
  openGraph: {
    title: "Hinnad | Alla Hüvenen - Podoloog Tartus",
    description: "Podoloogia teenuste hinnad Tartus. Soodsad hinnad probleemse pediküüri ja jalgade hoolduse jaoks.",
    type: "website",
    url: "https://podoloog.ee/pricing",
  },
  alternates: {
    canonical: "https://podoloog.ee/pricing",
  },
};

export default function Pricing() {
  return (
    <Container>
      <span className="text-4xl">💰</span>
      <Heading className="font-black">Hinnad ja Teenused</Heading>
      <Paragraph className="max-w-xl mt-4">
        Pakun soodsaid hindu kvaliteetse podoloogia teenuse jaoks Tartus. 
        Kõik hinnad sisaldavad konsultatsiooni ja professionaalset käsitlust.
      </Paragraph>
      <Paragraph className="max-w-xl mt-4">
        Täpseid hindasid saate teada helistades numbrile +372 5895 5153. 
        Hinnad sõltuvad teenuse keerukusest ja kestusest.
      </Paragraph>
    </Container>
  );
} 