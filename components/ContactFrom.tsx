"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { submitContactForm } from "@/app/actions";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contactFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().optional(),
  serviceType: z
    .enum([
      "web-design",
      "seo-services",
      "digital-marketing",
      "ecommerce",
      "app-development",
      "other",
    ])
    .optional(),
  budget: z
    .enum(["under-5k", "5k-10k", "10k-25k", "25k-50k", "50k-plus"])
    .optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      serviceType: undefined,
      budget: undefined,
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await submitContactForm({
        name: values.fullName,
        email: values.email,
        company: values.company,
        serviceType: values.serviceType,
        budget: values.budget,
        message: values.message,
      });

      if (result.success) {
        setSubmitStatus("success");
        form.reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("❌ Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Get Your Project Started
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Tell us about your project and we&apos;ll get back to you within 24
          hours
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name Field */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your full name"
                    {...field}
                    className="h-12 bg-gray-50 border-gray-200 shadow-none rounded-lg text-gray-900 font-medium placeholder:text-gray-500 focus:ring-1 focus:ring-gray-200 focus:border-gray-200 transition-all duration-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    {...field}
                    className="h-12 bg-gray-50 border-gray-200 shadow-none rounded-lg text-gray-900 font-medium placeholder:text-gray-500 focus:ring-1 focus:ring-gray-200 focus:border-gray-200 transition-all duration-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Field */}
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your company name"
                    {...field}
                    className="h-12 bg-gray-50 border-gray-200 shadow-none rounded-lg text-gray-900 font-medium placeholder:text-gray-500 focus:ring-1 focus:ring-gray-200 focus:border-gray-200 transition-all duration-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Service Type Field */}
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 bg-gray-50  shadow-none rounded-lg text-gray-900 font-medium focus:ring-1 focus:ring-gray-200 focus:border-gray-200 transition-all duration-200">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Services</SelectLabel>
                      <SelectItem value="web-design">Web Design</SelectItem>
                      <SelectItem value="seo-services">SEO Services</SelectItem>
                      <SelectItem value="digital-marketing">
                        Digital Marketing
                      </SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="app-development">
                        App Development
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Budget Field */}
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Budget</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 bg-gray-50 border-gray-200 shadow-none rounded-lg text-gray-900 font-medium focus:ring-1 focus:ring-gray-200 focus:border-gray-200 transition-all duration-200">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Budget Range</SelectLabel>
                      <SelectItem value="under-5k">Under $5,000</SelectItem>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50k-plus">$50,000+</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message Field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    {...field}
                    className="min-h-[120px] bg-gray-50 border-gray-200 shadow-none rounded-lg text-gray-900 font-medium placeholder:text-gray-500 focus:ring-1 focus:ring-gray-200 focus:border-gray-200 transition-all duration-200 resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-[#ff4d00] hover:bg-[#ff4d00]/90 disabled:bg-[#ff4d00]/50 disabled:cursor-not-allowed text-white rounded-lg font-medium text-base transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </div>
            ) : (
              "Send Message"
            )}
          </Button>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="w-full p-4 bg-green-100 border border-green-300 rounded-lg text-green-700 text-center font-medium">
              ✅ Message sent successfully! We will get back to you within 24
              hours.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="w-full p-4 bg-red-100 border border-red-300 rounded-lg text-red-700 text-center font-medium">
              ❌ An error occurred while sending the message. Please try again.
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
