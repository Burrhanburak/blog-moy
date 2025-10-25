export default function PrivacyPolicyPage() {
  return (
    <section className="relative mx-2.5 mt-2.5 rounded-t-2xl rounded-b-[36px] bg-gradient-to-b from-[#ff4d00] via-background to-background py-20 lg:mx-4 dark:from-amber-950">
      <div className="container max-w-4xl mx-auto px-6">
        <h1 className="text-center text-4xl font-semibold tracking-tight lg:text-5xl text-white dark:text-white mb-4">
          Privacy Policy
        </h1>
        <p className="mt-4 text-center leading-snug font-medium text-white lg:mx-auto">
          We are committed to protecting your privacy. This policy explains how we collect, use, and protect your information. Last updated:{" "}
          {new Date().toLocaleDateString()}
        </p>

        <div className="mt-10 flex justify-between gap-8 max-sm:flex-col md:mt-14 lg:mt-20 lg:gap-12">
          <div className="flex-1 space-y-8 text-left">
            {/* Information We Collect */}
            <div className=" dark:bg-gray-800 rounded-lg ">
              <h2 className="text-2xl font-semibold mb-4 text-white dark:text-white">
                Information We Collect
              </h2>
              <p className="text-white dark:text-gray-300 mb-4 leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
              </p>

              <h3 className="text-lg font-semibold mb-3 text-white dark:text-white">
                Personal Information
              </h3>
              <ul className="list-disc list-inside space-y-2 text-white dark:text-gray-300 mb-6">
                <li>Name and contact information</li>
                <li>Email address and phone number</li>
                <li>Account credentials and preferences</li>
                <li>Payment and billing information</li>
                <li>Communication records and support requests</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 text-white dark:text-white">
                Automatically Collected Information
              </h3>
              <ul className="list-disc list-inside space-y-2 text-white dark:text-gray-300 mb-6">
                <li>Device information and identifiers</li>
                <li>IP address and location data</li>
                <li>Usage patterns and analytics</li>
                <li>Cookies and similar technologies</li>
                <li>Browser type and operating system</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div className=" dark:bg-gray-800 rounded-lg ">
              <h2 className="text-2xl font-semibold mb-4 text-white dark:text-white">
                How We Use Your Information
              </h2>
              <p className="text-white dark:text-gray-300 mb-4 leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, as well as to communicate with you.
              </p>

              <ul className="list-disc list-inside space-y-2 text-white dark:text-gray-300 mb-6">
                <li>Provide and deliver our services</li>
                <li>Process transactions and send notifications</li>
                <li>Respond to your comments and questions</li>
                <li>Improve our services and develop new features</li>
                <li>Send technical notices and security alerts</li>
                <li>Comply with legal obligations</li>
                <li>Protect against fraud and abuse</li>
                <li>Conduct analytics and research</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className=" dark:bg-gray-800 rounded-lg ">
              <h2 className="text-2xl font-semibold mb-4 text-white dark:text-white">
                Information Sharing and Disclosure
              </h2>
              <p className="text-white dark:text-gray-300 mb-4 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described below.
              </p>

              <h3 className="text-lg font-semibold mb-3 text-white dark:text-white">
                We may share information:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-white dark:text-gray-300 mb-6">
                <li>With service providers who assist our operations</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
                <li>In connection with a business transfer</li>
                <li>With your explicit consent</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative text-muted-foreground h-px w-full my-12">
          <div className="h-px w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)] [mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)]"></div>
        </div>

        {/* Data Security and Retention */}
        <div className="mx-auto">
          <div className="dark:bg-gray-800 rounded-lg ">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Data Security and Retention
            </h2>

            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <div className="space-y-6">
              {/* Security Measures */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Security Measures
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We employ industry-standard security practices to protect your data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="text-gray-600 dark:text-gray-300">
                    Encryption of data in transit and at rest
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Regular security assessments and audits
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Access controls and authentication measures
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Employee training on data protection
                  </li>
                </ul>
              </div>

              {/* Data Retention */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Data Retention
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements.
                </p>
              </div>

              {/* International Transfers */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  International Data Transfers
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your personal data in accordance with applicable laws.
                </p>
              </div>

              {/* Cookies and Tracking */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Cookies and Tracking Technologies
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We use cookies and similar technologies to enhance your experience and collect information about how you use our services. You can control cookie settings through your browser preferences.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="text-gray-600 dark:text-gray-300">
                    Essential cookies for basic functionality
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Analytics cookies to understand usage patterns
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Preference cookies to remember your settings
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Marketing cookies for personalized content
                  </li>
                </ul>
              </div>

              {/* Your Rights */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Your Privacy Rights
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="text-gray-600 dark:text-gray-300">
                    Access and review your personal data
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Correct inaccurate or incomplete information
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Delete your personal data
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Restrict or object to processing
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Data portability
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Withdraw consent where applicable
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    File a complaint with supervisory authorities
                  </li>
                </ul>

                <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                  To exercise these rights, please contact us using the information provided below. We will respond to your request within the timeframes required by applicable law.
                </p>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Contact Information
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us at privacy@moydus.com or through our website contact form.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative text-muted-foreground h-px w-full my-12">
          <div className="h-px w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)] [mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)]"></div>
        </div>

        {/* Additional Privacy Information */}
        <div className="mx-auto space-y-8">
          {/* Children's Privacy */}
          <div className="dark:bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Children's Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
            </p>
          </div>

          {/* Third-Party Services */}
          <div className="dark:bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Third-Party Services
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Our services may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </div>

          {/* Changes to Privacy Policy */}
          <div className="dark:bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
          </div>

          {/* Legal Basis for Processing */}
          <div className="dark:bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Legal Basis for Processing
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              We process your personal data based on various legal grounds including: performance of a contract, compliance with legal obligations, protection of vital interests, legitimate interests, and your explicit consent where required by law.
            </p>
          </div>

          {/* Effective Date */}
          <div className="dark:bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Effective Date
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              This Privacy Policy is effective as of January 1, 2024, and will remain in effect except with respect to any changes in its provisions in the future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
