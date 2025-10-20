"use client";

import { PageHeader } from '@/components/page-header';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Terms of Service" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-8 prose dark:prose-invert">
          <h1>Terms of Service for Math Calculators</h1>

          <p><strong>Last Updated: 2025-10-20</strong></p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Math Calculators website (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Math Calculators provides a collection of free online calculators for mathematical, scientific, financial, and other purposes. The Service is provided "as is" and is intended for informational and educational use only. We may modify or discontinue the Service at any time without notice.
          </p>

          <h2>3. User Conduct</h2>
          <p>
            You agree to use the Service only for lawful purposes. You are prohibited from using the service to:
          </p>
          <ul>
            <li>Attempt to gain unauthorized access to our systems or engage in any activity that disrupts, diminishes the quality of, interferes with the performance of, or impairs the functionality of the Service.</li>
            <li>Use any automated means, including spiders, robots, crawlers, or data mining tools, to download or scrape data from the Service, except for internet search engines (e.g., Google) and non-commercial public archives.</li>
            <li>Transmit any material that contains software viruses or any other computer code, files, or programs designed to interrupt, destroy, or limit the functionality of any computer software or hardware.</li>
          </ul>

          <h2>4. Disclaimer of Warranties</h2>
          <p>
            The tools and information on Math Calculators are provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Please see our <a href="/disclaimer" className="text-primary hover:underline">Disclaimer</a> page for more information.
          </p>
          
          <h2>5. Limitation of Liability</h2>
          <p>
            In no event shall Math Calculators or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
          
          <h2>6. Accuracy of Materials</h2>
          <p>
            The materials appearing on the Math Calculators website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on our website at any time without notice.
          </p>
          
          <h2>7. Links to Other Websites</h2>
          <p>
            Our Service may contain links to third-party web sites or services that are not owned or controlled by Math Calculators. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.
          </p>
          
          <h2>8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which our company is based, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
          
          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>
          
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please <a href="/contact" className="text-primary hover:underline">contact us</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
