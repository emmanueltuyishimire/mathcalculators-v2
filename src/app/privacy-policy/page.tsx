
import { PageHeader } from '@/components/page-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy outlines how we handle data, use cookies, and work with third-party services like Google AdSense.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Privacy Policy" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-8 prose dark:prose-invert">
          <h1>Privacy Policy for MathMaster</h1>

          <p><strong>Last Updated: 2024-07-26</strong></p>

          <p>
            Welcome to MathMaster. We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy applies to MathMaster and governs our data collection, processing, and usage practices.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We do not collect any personally identifiable information (PII) such as your name, email address, or phone number directly. Our calculators are designed to be used anonymously without requiring you to create an account or log in.
          </p>

          <h2>2. Data You Provide</h2>
          <p>
            The numbers and data you enter into our calculators are processed in your browser or on our servers solely to perform the requested calculation. We do not store, log, or share this data. Once you close your browser session, the data is gone.
          </p>

          <h2>3. Cookies and Web Beacons</h2>
          <p>
            Like any other website, MathMaster uses 'cookies'. These cookies are used to store information including visitors' preferences and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>
          <p>
            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
          </p>

          <h2>4. Advertising Partners Privacy Policies</h2>
          <p>
            We use third-party advertising companies to serve ads when you visit our website. Our main advertising partner is Google AdSense.
          </p>
          <ul>
            <li>
              <strong>Google AdSense:</strong> Google is a third-party vendor that uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our sites and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.
            </li>
          </ul>
          <p>
            Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on MathMaster, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
          </p>
          <p>
            Note that MathMaster has no access to or control over these cookies that are used by third-party advertisers.
          </p>

          <h2>5. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
          <p>
            Under the CCPA, among other rights, California consumers have the right to request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.
          </p>
          <p>
            Since we do not collect personal information, these provisions do not apply to our service in a meaningful way. However, we support your right to privacy.
          </p>

          <h2>6. GDPR Data Protection Rights</h2>
          <p>
            We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
          </p>
          <ul>
            <li>The right to access – You have the right to request copies of your personal data.</li>
            <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
          </ul>
          <p>
            As we do not store personal data, these rights are not directly applicable, but we are committed to upholding the principles of the GDPR.
          </p>

          <h2>7. Children's Information</h2>
          <p>
            Our website is not intended for children under the age of 13. We do not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
          </p>
          
           <h2>8. Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to <a href="/contact" className="text-primary hover:underline">contact us</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
