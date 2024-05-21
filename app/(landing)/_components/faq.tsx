import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full md:w-1/2 text-white">
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-semibold">What is Neuxia?</AccordionTrigger>
        <AccordionContent>
          Neuxia is an AI SaaS platform providing advanced models for conversation, code generation,
          text-to-speech, and image generation. Our solutions are secure, scalable, and integrate
          seamlessly to enhance your business efficiency and innovation.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger className="font-semibold">
          How secure is my data with your Neuxia?
        </AccordionTrigger>
        <AccordionContent>
          Neuxia prioritizes data security and privacy. We implement industry-standard encryption,
          regular security audits, and strict access controls to ensure your data is protected.
          Additionally, our platform complies with major data protection regulations such as GDPR
          and CCPA.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="font-semibold">
          How often does Neuxia receive updates?
        </AccordionTrigger>
        <AccordionContent>
          Neuxia is regularly updated with new features, improvements, and security enhancements.
          Our development team continually works to ensure our platform remains cutting-edge and
          reliable, providing you with the best AI solutions available.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="font-semibold">
          What kind of support and training do you offer?
        </AccordionTrigger>
        <AccordionContent>
          We offer comprehensive support and training to ensure you get the most out of our AI SaaS
          platform. This includes 24/7 customer support, onboarding sessions, detailed
          documentation, webinars, and access to a knowledge base. Additionally, we provide
          personalized training programs tailored to your team’s specific needs.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
