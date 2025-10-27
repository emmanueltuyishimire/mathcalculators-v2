
import { PageHeader } from '@/components/page-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for Math Calculators. The information and tools provided are for educational purposes only and should not be considered professional advice.',
};


export default function DisclaimerPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Disclaimer" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-8 prose dark:prose-invert">
          <h1>Disclaimer for Math Calculators</h1>

          <p><strong>Last Updated: 2025-10-20</strong></p>

          <h2>1. For Educational and Informational Purposes Only</h2>
          <p>
            The information and tools provided by Math Calculators (maths.calculation.site) are for educational and informational purposes only. While we strive for accuracy, the calculators and content on this website should not be considered a substitute for professional, financial, medical, or legal advice.
          </p>

          <h2>2. No Guarantees of Accuracy</h2>
          <p>
            We make every effort to ensure that the calculations and information provided on our website are accurate and up-to-date. However, Math Calculators does not warrant or guarantee the accuracy, completeness, or reliability of any information or calculations. We are not liable for any errors, omissions, or inaccuracies in the content or for any actions taken in reliance on it.
          </p>
          
          <h2>3. Not Professional Advice</h2>
          <p>
            The content on this website is not intended to be a substitute for professional advice.
          </p>
          <ul>
              <li><strong>Financial Calculators:</strong> The results from our financial calculators are not financial advice. Always consult with a qualified financial advisor before making any financial decisions.</li>
              <li><strong>Health and Fitness Calculators:</strong> The information from our health-related calculators is not medical advice. Always consult with a qualified healthcare professional for any health concerns or before making any changes to your diet or lifestyle.</li>
          </ul>
          
          <h2>4. Limitation of Liability</h2>
          <p>
            By using this website, you agree that Math Calculators and its owners, employees, and affiliates shall not be held liable for any direct, indirect, incidental, consequential, or any other damages arising from your use of the calculators or reliance on any information provided on the site. This includes, but is not limited to, financial loss, personal injury, or any other harm.
          </p>
          
           <h2>5. Third-Party Links</h2>
          <p>
            Math Calculators may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of these websites and do not endorse, warrant, or guarantee the products, services, or information described or offered at these other Internet sites.
          </p>
          
          <h2>6. Use at Your Own Risk</h2>
          <p>
            Any action you take upon the information on this website is strictly at your own risk. You are solely responsible for verifying the accuracy of the results and for how you use the information provided.
          </p>
        </div>
      </main>
    </div>
  );
}
