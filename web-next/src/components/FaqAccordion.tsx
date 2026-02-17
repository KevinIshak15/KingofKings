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

interface FaqAccordionProps {
  faqs: FaqItem[];
  /** Optional: heading level for question text. Default: font-serif text-xl */
  questionClassName?: string;
}

export function FaqAccordion({ faqs, questionClassName = "font-serif text-xl text-secondary font-semibold" }: FaqAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger className={`${questionClassName} text-left hover:no-underline`}>
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-base text-gray-600 leading-relaxed">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
