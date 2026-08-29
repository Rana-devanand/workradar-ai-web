"use client";

import React from "react";
import { Container } from "@/components/common/Container";
import { Accordion } from "@/components/common/Accordion";
import { Badge } from "@/components/common/Badge";
import { FAQS } from "@/lib/data/landing-data";

export const FaqSection: React.FC = () => {
  const accordionItems = FAQS.map((faq, index) => ({
    id: `faq-${index}`,
    question: faq.question,
    answer: faq.answer,
    category: faq.category,
  }));

  return (
    <section id="faq" className="py-20 sm:py-28 bg-surface-container-lowest relative overflow-hidden border-t border-outline-variant/60">
      <Container size="xl">
        {/* Main Section Heading - WorkRadar AI Theme */}
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <Badge variant="neutral" size="sm" className="uppercase tracking-wider">
            Clear Answers
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-on-surface">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-secondary max-w-2xl mx-auto">
            Everything you need to know about WorkRadar AI's background intelligence, data security, and setup.
          </p>
        </div>

        {/* 2-Column Accordion Grid */}
        <div className="max-w-6xl mx-auto">
          <Accordion
            items={accordionItems}
            columns={2}
            allowMultiple={true}
          />
        </div>

        {/* Support Callout */}
        <div className="mt-14 text-center">
          <p className="text-sm text-secondary">
            Have a specific question not covered here?{" "}
            <a
              href="mailto:support@workradar.ai"
              className="font-semibold text-primary hover:underline"
            >
              Contact our product specialists &rarr;
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
};
