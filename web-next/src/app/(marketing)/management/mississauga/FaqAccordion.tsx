"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger className="font-serif text-xl text-secondary font-semibold text-left hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
