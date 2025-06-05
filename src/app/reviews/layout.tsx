import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arvustused | Alla Hüvenen - Podoloog Tartus | Klientide tagasiside",
  description: "Lugege klientide arvustusi podoloog Alla Hüveneni kohta Tartus. Professionaalne teenindus, positiivsed kogemused probleemse pediküüri ja jalgade raviga. Отзывы о подологе в Тарту.",
  keywords: [
    "podoloog arvustused Tartu",
    "Alla Hüvenen arvustused", 
    "klientide tagasiside",
    "positiivsed kogemused",
    "professionaalne teenindus",
    "отзывы подолог Тарту",
    "отзывы клиентов"
  ],
  openGraph: {
    title: "Arvustused | Alla Hüvenen - Podoloog Tartus",
    description: "Lugege klientide arvustusi podoloog Alla Hüveneni kohta Tartus. Professionaalne teenindus ja positiivsed kogemused.",
    type: "website",
    url: "https://podoloog.ee/reviews",
  },
  alternates: {
    canonical: "https://podoloog.ee/reviews",
  },
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 