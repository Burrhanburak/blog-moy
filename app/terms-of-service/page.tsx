export default function TermsOfServicePage() {
  return (
    <section className="relative mx-2.5 mt-2.5 rounded-t-2xl rounded-b-[36px] bg-gradient-to-b from-[#ff4d00] via-background to-background py-20 lg:mx-4 dark:from-amber-950">
      <div className="container max-w-4xl mx-auto px-6">
        <h1 className="text-center text-4xl font-semibold tracking-tight lg:text-5xl text-white dark:text-white mb-4">
          Terms of Service
        </h1>
        <p className="mt-4 text-center leading-snug font-medium text-white lg:mx-auto">
          Please read these terms carefully before using our services. By
          accessing Moydus, you agree to these terms. Last updated:{" "}
          {new Date().toLocaleDateString()}
        </p>

        <div className="mt-10 flex justify-between gap-8 max-sm:flex-col md:mt-14 lg:mt-20 lg:gap-12">
          <div className="flex-1 space-y-8 text-left">
            {/* Acceptance of Terms */}
            <div className=" dark:bg-gray-800 rounded-lg ">
              <h2 className="text-2xl font-semibold mb-4 text-white dark:text-white">
                Acceptance of Terms
              </h2>
              <p className="text-white dark:text-gray-300 mb-4 leading-relaxed">
                By accessing and using Moydus services, you accept and agree to
                be bound by the terms and provision of this agreement.
              </p>

              <p className="text-white dark:text-gray-300 mb-4 leading-relaxed">
                If you do not agree to abide by the above, please do not use
                this service.
              </p>
            </div>

            {/* Use License */}
            <div className=" dark:bg-gray-800 rounded-lg ">
              <h2 className="text-2xl font-semibold mb-4 text-white dark:text-white">
                Use License
              </h2>
              <p className="text-white dark:text-gray-300 mb-4 leading-relaxed">
                Permission is granted to temporarily download one copy of Moydus
                materials for personal, non-commercial transitory viewing only.
              </p>

              <p className="text-white dark:text-gray-300 mb-4 leading-relaxed">
                This is the grant of a license, not a transfer of title, and
                under this license you may not:
              </p>

              <ul className="list-disc list-inside space-y-2 text-white dark:text-gray-300 mb-6">
                <li>modify or copy the materials</li>
                <li>
                  use the materials for any commercial purpose or for any public
                  display
                </li>
                <li>
                  attempt to reverse engineer any software contained on Moydus
                  website
                </li>
                <li>
                  remove any copyright or other proprietary notations from the
                  materials
                </li>
              </ul>

              <p className="text-sm text-white dark:text-white italic mb-4">
                This license shall automatically terminate if you violate any of
                these restrictions and may be terminated by Moydus at any time.
              </p>
            </div>

            {/* Prohibited Uses */}
            <div className=" dark:bg-gray-800 rounded-lg ">
              <h2 className="text-2xl font-semibold mb-4 text-white dark:text-white">
                Prohibited Uses
              </h2>
              <p className="text-white dark:text-gray-300 mb-4 leading-relaxed">
                You may not use our service for any unlawful purpose or to
                solicit others to perform or participate in any unlawful acts.
              </p>

              <p className="text-white dark:text-gray-300 mb-4 leading-relaxed">
                You may not violate any international, federal, provincial, or
                state regulations, rules, or laws.
              </p>

              <ul className="list-disc list-inside space-y-2 text-white dark:text-gray-300 mb-6">
                <li>
                  Transmit any worms, viruses, or any code of a destructive
                  nature
                </li>
                <li>
                  Infringe upon or violate our intellectual property rights or
                  the intellectual property rights of others
                </li>
                <li>
                  Harass, abuse, insult, harm, defame, slander, disparage,
                  intimidate, or discriminate
                </li>
                <li>Submit false or misleading information</li>
                <li>
                  Upload or transmit viruses or any other type of malicious code
                </li>
                <li>Spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                <li>Use the service for any obscene or immoral purpose</li>
                <li>
                  Interfere with or circumvent the security features of the
                  service
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative text-muted-foreground h-px w-full my-12">
          <div className="h-px w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)] [mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)]"></div>
        </div>

        {/* Data Protection */}
        <div className="mx-auto">
          <div className="dark:bg-gray-800 rounded-lg ">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Data Protection
            </h2>

            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Moydus is committed to protecting your privacy and ensuring the
              security of your personal information. This section outlines how
              we collect, use, and protect your data.
            </p>

            <div className="space-y-6">
              {/* Data Controller Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Data Controller
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Moydus acts as the data controller for all personal
                  information collected through our services. We are responsible
                  for determining the purposes and means of processing your
                  personal data in accordance with applicable data protection
                  laws.
                </p>
              </div>

              {/* Processing Purposes */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Processing Purposes
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We process your personal data for the following purposes:
                  providing and improving our services, communicating with you,
                  ensuring security and fraud prevention, complying with legal
                  obligations, and with your consent for marketing
                  communications.
                </p>
              </div>

              {/* Data Transfer */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Data Transfer
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Your personal data may be transferred to and processed in
                  countries other than your own. We ensure that such transfers
                  are conducted in accordance with applicable data protection
                  laws and with appropriate safeguards in place.
                </p>
              </div>

              {/* Collection Method and Legal Basis */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Collection Method and Legal Basis
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We collect personal data through your direct interactions with
                  our services, automatically through cookies and similar
                  technologies, and from third-party sources. Our legal basis
                  for processing includes contract performance, legitimate
                  interests, legal compliance, and your consent.
                </p>
              </div>

              {/* Data Subject Rights */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Data Subject Rights
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  You have certain rights regarding your personal data under
                  applicable data protection laws. These rights include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="text-gray-600 dark:text-gray-300">
                    Right to access your personal data
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Right to rectification of inaccurate data
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Right to erasure ("right to be forgotten")
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Right to restrict processing
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Right to data portability
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Right to object to processing
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Right to withdraw consent
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Right to lodge a complaint with supervisory authorities
                  </li>
                </ul>

                <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                  To exercise any of these rights, please contact us through our
                  official support channels. We will respond to your request
                  within the timeframes required by applicable law.
                </p>

                <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                  Exercising your data subject rights is free of charge, except
                  in cases of manifestly unfounded or excessive requests.
                </p>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Contact Information
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  For any questions regarding data protection, privacy, or these
                  terms of service, please contact us at privacy@moydus.com or
                  through our website contact form.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative text-muted-foreground h-px w-full my-12">
          <div className="h-px w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)] [mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)]"></div>
        </div>

        {/* Additional Terms */}
        <div className="mx-auto space-y-8">
          {/* Disclaimer */}
          <div className="dark:bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Disclaimer
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              The information on this website is provided on an "as is" basis.
              To the fullest extent permitted by law, Moydus excludes all
              representations, warranties, conditions and terms.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div className="dark:bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Limitation of Liability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              In no event shall Moydus, nor its directors, employees, partners,
              agents, suppliers, or affiliates, be liable for any indirect,
              incidental, punitive, consequential, or special damages.
            </p>
          </div>

          {/* Governing Law */}
          <div className="dark:bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Governing Law
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              These terms and conditions are governed by and construed in
              accordance with the laws of the jurisdiction in which Moydus
              operates.
            </p>
          </div>

          {/* Changes to Terms */}
          <div className="dark:bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Changes to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Moydus reserves the right, at our sole discretion, to modify or
              replace these Terms at any time. If a revision is material, we
              will try to provide at least 30 days' notice prior to any new
              terms taking effect.
            </p>
          </div>

          {/* Effective Date */}
          <div className="dark:bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Effective Date
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              These Terms of Service are effective as of January 1, 2024, and
              will remain in effect except with respect to any changes in its
              provisions in the future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
