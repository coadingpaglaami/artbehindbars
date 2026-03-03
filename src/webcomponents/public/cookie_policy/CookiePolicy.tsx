
"use client";
/* eslint-disable react/no-unescaped-entities */
import { PolicyPage, PolicySection, P, UL, Strong, SubSection } from "@/webcomponents/reusable";

const sections: PolicySection[] = [
  {
    title: "Introduction",
    content: (
      <>
        <P>
          This Cookie Policy explains how <Strong>The Art of Reform</Strong> ("Company," "we," "us," or "our") uses
          cookies and similar tracking technologies when you visit or use the website at www.theartreform.com, including
          any related pages, features, content, and services (collectively, the <Strong>"Platform"</Strong>).
        </P>
        <P>
          This Cookie Policy should be read together with our Privacy Policy and Terms and Conditions. By accessing or
          using the Platform, you acknowledge and agree to the use of cookies and tracking technologies as described
          herein.
        </P>
      </>
    ),
  },
  {
    title: "What Are Cookies?",
    content: (
      <>
        <P>
          Cookies are small text files that are placed on your device (computer, smartphone, tablet, or other
          internet-enabled device) when you visit a website. Cookies allow a website to recognize your device, store
          certain information, and improve functionality and performance.
        </P>
        <P>Cookies may be:</P>
        <UL
          items={[
            "Session cookies, which expire when you close your browser; or",
            "Persistent cookies, which remain on your device until deleted or expire automatically.",
          ]}
        />
      </>
    ),
  },
  {
    title: "Other Tracking Technologies",
    content: (
      <>
        <P>
          In addition to cookies, the Platform may use other tracking technologies such as:
        </P>
        <UL
          items={[
            "Web beacons (pixel tags)",
            "Log files",
            "Device identifiers",
            "Analytics scripts",
          ]}
        />
        <P>
          These technologies serve similar purposes to cookies and help us operate, secure, and improve the Platform.
        </P>
      </>
    ),
  },
  {
    title: "Types of Cookies We Use",
    content: (
      <>
        <SubSection label="a. Strictly Necessary Cookies">
          <P>
            These cookies are essential for the operation of the Platform and cannot be disabled through our systems.
            They are used to enable core website functionality, maintain user sessions, authenticate users, and prevent
            fraudulent activity. Without these cookies, certain features of the Platform would not function properly.
          </P>
        </SubSection>
        <SubSection label="b. Functional Cookies">
          <P>
            Functional cookies allow the Platform to remember choices you make and provide enhanced features and
            personalization, such as remembering login status, saving user preferences, and supporting account-related
            features. These improve usability but are not strictly necessary for basic site operation.
          </P>
        </SubSection>
        <SubSection label="c. Performance and Analytics Cookies">
          <P>
            These cookies collect information about how Users interact with the Platform, including pages visited, time
            spent on pages, error messages encountered, and traffic sources. This information is aggregated and used to
            analyze usage patterns, diagnose technical issues, and improve Platform performance.
          </P>
        </SubSection>
        <SubSection label="d. Security and Integrity Cookies">
          <P>
            Security-related cookies help protect the Platform and Users by detecting suspicious or malicious activity,
            preventing unauthorized access, and supporting fraud detection and chargeback prevention. These cookies are
            essential to maintaining the integrity of the Platform.
          </P>
        </SubSection>
      </>
    ),
  },
  {
    title: "Cookies Used in Connection with Accounts and Transactions",
    content: (
      <>
        <P>
          When you create an Account, log in, or complete a Transaction, cookies may be used to:
        </P>
        <UL
          items={[
            "Maintain authenticated sessions",
            "Associate activity with your Account",
            "Support payment processing workflows",
            "Assist with fraud prevention and dispute resolution",
          ]}
        />
        <P>These cookies may remain active for the duration of your session or for a limited period thereafter.</P>
      </>
    ),
  },
  {
    title: "Third-Party Cookies",
    content: (
      <>
        <P>
          Some cookies on the Platform may be placed by third-party service providers that perform services on our
          behalf, such as:
        </P>
        <UL
          items={[
            "Payment processors",
            "Analytics providers",
            "Hosting and infrastructure providers",
            "Security and fraud-prevention services",
          ]}
        />
        <P>
          These third parties may use cookies in accordance with their own privacy and cookie policies. The Company does
          not control third-party cookies and is not responsible for their practices.
        </P>
      </>
    ),
  },
  {
    title: "How We Use Information Collected by Cookies",
    content: (
      <>
        <P>Information collected through cookies and tracking technologies may be used to:</P>
        <UL
          items={[
            "Operate and maintain the Platform",
            "Authenticate Users and manage Accounts",
            "Process Transactions",
            "Improve Platform functionality and performance",
            "Monitor and secure the Platform",
            "Detect and prevent fraud or abuse",
            "Comply with legal obligations",
          ]}
        />
        <P>Cookie-related data may be linked to other Personal Information as described in our Privacy Policy.</P>
      </>
    ),
  },
  {
    title: "Your Cookie Choices and Controls",
    content: (
      <>
        <P>
          Most web browsers allow you to control cookies through browser settings, including the ability to accept or
          reject cookies, delete existing cookies, and configure alerts when cookies are placed.
        </P>
        <P>
          Please note that disabling or blocking certain cookies may limit your ability to access or use some features
          of the Platform and may negatively affect functionality. The Company does not guarantee that the Platform will
          operate correctly if cookies are disabled.
        </P>
      </>
    ),
  },
  {
    title: "Do Not Track Signals",
    content: (
      <P>
        Some browsers transmit "Do Not Track" ("DNT") signals. At this time, the Platform does{" "}
        <Strong>not</Strong> respond to DNT signals or similar mechanisms, as there is no universally accepted standard
        for compliance.
      </P>
    ),
  },
  {
    title: "Legal Basis for Cookie Use",
    content: (
      <P>
        Cookies are used based on the Company's legitimate business interests in operating, securing, and improving the
        Platform, and where applicable, based on User consent. Where consent is required by law, continued use of the
        Platform constitutes consent to the placement and use of cookies as described in this Cookie Policy.
      </P>
    ),
  },
  {
    title: "Data Retention Related to Cookies",
    content: (
      <P>
        Cookie data is retained only for as long as necessary to fulfill the purposes described in this Cookie Policy,
        unless a longer retention period is required or permitted by law. Retention periods may vary depending on the
        type of cookie and the nature of the data collected.
      </P>
    ),
  },
  {
    title: "Updates to This Cookie Policy",
    content: (
      <P>
        The Company reserves the right to modify or update this Cookie Policy at any time in its sole discretion. Any
        changes will become effective upon posting the revised Cookie Policy on the Platform. Your continued use of the
        Platform after changes are posted constitutes acceptance of the updated Cookie Policy.
      </P>
    ),
  },
  {
    title: "Contact Information",
    content: (
      <P>
        If you have questions about this Cookie Policy or the Company's use of cookies and tracking technologies, please
        contact us at the email address provided on the Platform.
      </P>
    ),
  },
];

export const CookiePolicy = () => {
  return (
    <PolicyPage
      badge="Legal · Cookie Policy"
      title="Cookie Policy"
      effectiveDate="10th February 2026"
      website="www.theartreform.com"
      intro="This Cookie Policy explains how The Art of Reform uses cookies and similar tracking technologies on our platform. Understanding how we use these technologies helps you make informed choices about your browsing experience."
      sections={sections}
    />
  );
}