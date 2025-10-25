"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Rocket,
  Code,
  Search,
  ShoppingCart,
  Smartphone,
  Palette,
  Building2,
} from "lucide-react";
import Link from "next/link";

export default function CustomAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      className="border rounded-2xl mb-3 overflow-hidden bg-background cursor-default"
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger
          className="flex flex-row justify-start items-center w-full py-4 px-5 space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-xl [&>svg]:order-1 [&>svg]:mr-2"
          aria-controls="what-is-moydus-content"
        >
          <div className="h-4 w-4 order-2">
            <Building2 className="w-4 h-4 text-[#ff4d00]" />
          </div>
          <div className="leading-tight text-left flex-1 order-3">
            <p className="m-0 font-medium text-gray-900 dark:text-gray-200 text-sm">
              What is Moydus and what services do we provide?
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent
          id="what-is-moydus-content"
          className="mt-2 mb-4 mx-6 prose prose-gray text-black dark:prose-invert overflow-x-auto cursor-default"
        >
          <p>
            Moydus is a full-service digital agency specializing in{" "}
            <strong>Web Design</strong>, <strong>SEO Services</strong>,{" "}
            <strong>Digital Marketing</strong>,{" "}
            <strong>Shopify & WordPress Development</strong>,{" "}
            <strong>E-commerce Solutions</strong>,{" "}
            <strong>SaaS Management</strong>,{" "}
            <strong>CRM & ERP Integration</strong>,{" "}
            <strong>App Development</strong>, and{" "}
            <strong>Performance Marketing</strong>.
          </p>
          <p>
            We help businesses grow with measurable results through data-driven
            strategies and cutting-edge technology solutions.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="border-none">
        <AccordionTrigger
          className="flex flex-row justify-start items-center w-full py-4 px-5 space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 [&>svg]:order-1 [&>svg]:mr-2"
          aria-controls="our-solutions-content"
        >
          <div className="h-4 w-4 order-2">
            <Code className="w-4 h-4 text-[#ff4d00]" />
          </div>
          <div className="leading-tight text-left flex-1 order-3">
            <p className="m-0 font-medium text-gray-900 dark:text-gray-200 text-sm">
              What solutions do we offer for your business?
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent
          id="our-solutions-content"
          className="mt-2 mb-4 mx-6 prose prose-gray text-black dark:prose-invert overflow-x-auto cursor-default"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#ff4d00]" />
                Design & Development
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Custom Web Design</li>
                <li>• WordPress Development</li>
                <li>• Shopify E-commerce</li>
                <li>• Mobile App Development</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Search className="w-4 h-4 text-[#ff4d00]" />
                Marketing & SEO
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Local & Global SEO</li>
                <li>• Social Media Marketing</li>
                <li>• Google Ads Management</li>
                <li>• Content Marketing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#ff4d00]" />
                Business Solutions
              </h4>
              <ul className="text-sm space-y-1">
                <li>• CRM Integration</li>
                <li>• ERP Systems</li>
                <li>• SaaS Management</li>
                <li>• Automation Solutions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#ff4d00]" />
                Digital Services
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Performance Analytics</li>
                <li>• Conversion Optimization</li>
                <li>• Email Marketing</li>
                <li>• Growth Hacking</li>
              </ul>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3" className="border-none">
        <AccordionTrigger
          className="flex flex-row justify-start items-center w-full py-4 px-5 space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 [&>svg]:order-1 [&>svg]:mr-2"
          aria-controls="why-choose-moydus-content"
        >
          <div className="h-4 w-4 order-2">
            <Rocket className="w-4 h-4 text-[#ff4d00]" />
          </div>
          <div className="leading-tight text-left flex-1 order-3">
            <p className="m-0 font-medium text-gray-900 dark:text-gray-200 text-sm">
              Why choose Moydus for your digital transformation?
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent
          id="why-choose-moydus-content"
          className="mt-2 mb-4 mx-6 prose prose-gray text-black dark:prose-invert overflow-x-auto cursor-default"
        >
          <p>
            <strong>Proven Results:</strong> We deliver measurable growth with
            data-driven strategies and cutting-edge technology.
          </p>
          <p>
            <strong>Full-Service Approach:</strong> From strategy to execution,
            we handle every aspect of your digital presence.
          </p>
          <p>
            <strong>Local & Global Expertise:</strong> We understand both local
            market dynamics and global best practices.
          </p>
          <p>
            <strong>Ongoing Support:</strong> We're your long-term partner, not
            just a one-time service provider.
          </p>
          <div className="mt-4">
            <Link
              href="https://app.moydus.com"
              className="inline-flex items-center gap-2 bg-[#ff4d00] text-white px-4 py-2 rounded-lg hover:bg-[#e63e00] transition-colors text-sm font-medium"
            >
              <Rocket className="w-4 h-4" />
              Get Started Today
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
