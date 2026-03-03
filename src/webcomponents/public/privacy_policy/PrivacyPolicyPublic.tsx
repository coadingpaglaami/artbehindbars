"use client";
/* eslint-disable react/no-unescaped-entities */
import { PolicyPage, PolicySection, P, UL, Strong } from "@/webcomponents/reusable";

const sections: PolicySection[] = [
  {
    title: "Introduction & Scope of This Privacy Policy",
    content: (
      <>
        <P>
          This Privacy Policy describes how <Strong>The Art of Reform</Strong> ("Company," "we," "us," or "our")
          collects, uses, discloses, and safeguards information relating to individuals who access or use the website at
          www.theartreform.com, including any related services, features, marketplaces, messaging tools, and community
          functions (collectively, the <Strong>"Platform"</Strong>).
        </P>
        <P>
          This Privacy Policy applies to all visitors, registered users, purchasers, and any other individuals who
          interact with the Platform. It forms part of, and is incorporated by reference into, the Terms and Conditions.
        </P>
      </>
    ),
  },
  {
    title: "Who We Are (Data Controller Identification)",
    content: (
      <>
        <P>
          The Platform is owned and operated by <Strong>The Art of Reform</Strong>, a business operating from the State
          of Texas, United States.
        </P>
        <P>
          For purposes of applicable U.S. data protection and privacy laws, the Company acts as the{" "}
          <Strong>data controller</Strong> with respect to personal information collected through the Platform. Questions
          regarding this Privacy Policy may be directed as set forth in Section 22 below.
        </P>
      </>
    ),
  },
  {
    title: "Information We Collect",
    content: (
      <>
        <P>
          We collect information that identifies, relates to, describes, or could reasonably be associated with an
          individual (<Strong>"Personal Information"</Strong>). Personal Information may be collected:
        </P>
        <UL
          items={[
            "Directly from you when you provide it to us",
            "Automatically when you access or use the Platform",
            "From third parties in connection with transactions or services",
          ]}
        />
        <P>
          We do not knowingly collect information beyond what is reasonably necessary to operate the Platform, conduct
          transactions, administer accounts, enforce our policies, and comply with legal obligations.
        </P>
      </>
    ),
  },
  {
    title: "Information You Provide Directly",
    content: (
      <>
        <P>You may provide Personal Information directly when you:</P>
        <UL
          items={[
            "Create or manage a User Account",
            "Purchase Artwork or engage in Transactions",
            "Communicate with other Users through Platform features",
            "Submit Content, posts, or messages",
            "Contact us for support or inquiries",
          ]}
        />
        <P>
          This information may include name, email address, mailing address, contact details, account credentials,
          order details, communications, and any other information you choose to submit.
        </P>
      </>
    ),
  },
  {
    title: "Automatically Collected Information",
    content: (
      <>
        <P>When you access or use the Platform, certain information may be collected automatically, including:</P>
        <UL
          items={[
            "Internet Protocol (IP) address",
            "Device identifiers and device type",
            "Browser type and operating system",
            "Pages viewed, access times, and referring URLs",
            "Usage patterns and interaction data",
          ]}
        />
        <P>
          This information is used to operate, maintain, secure, and improve the Platform, detect fraud or abuse, and
          analyze usage trends. It may be linked to your Account or other Personal Information.
        </P>
      </>
    ),
  },
  {
    title: "Payment Information",
    content: (
      <>
        <P>
          All payments are processed by third-party payment processors. The Company does{" "}
          <Strong>not</Strong> store full payment card numbers or sensitive financial authentication data on its servers.
        </P>
        <P>We may collect and retain limited transaction-related information such as:</P>
        <UL
          items={[
            "Payment confirmation details",
            "Transaction identifiers",
            "Billing ZIP/postal code",
            "Purchase amounts and timestamps",
          ]}
        />
        <P>Payment processors' handling of your information is governed by their own privacy policies and terms.</P>
      </>
    ),
  },
  {
    title: "Communications, Messaging & Community Content",
    content: (
      <>
        <P>
          Any information contained in messages, posts, or submissions may be collected, stored, reviewed, and used by
          the Company. Users acknowledge and agree that:
        </P>
        <UL
          items={[
            "There is no expectation of privacy in Platform-based communications",
            "Admin may access, monitor, review, remove, restrict, or disclose communications at any time",
            "Communications may be used for moderation, enforcement, dispute resolution, and legal compliance",
          ]}
        />
      </>
    ),
  },
  {
    title: "Inmate-Related Information & Correspondence Disclaimer",
    content: (
      <P>
        The Platform does not facilitate, manage, supervise, or control correspondence between Users and inmates. Any
        contact between Users and inmates occurs entirely outside of the Platform at the User's sole discretion and
        risk. The Company expressly disclaims responsibility for any personal information disclosed by Users in
        connection with inmate correspondence.
      </P>
    ),
  },
  {
    title: "How We Use Personal Information",
    content: (
      <>
        <P>The Company uses Personal Information for legitimate business and operational purposes, including to:</P>
        <UL
          items={[
            "Create, administer, and manage User Accounts",
            "Process Transactions and fulfill orders",
            "Operate, maintain, and improve the Platform",
            "Enable community and messaging features",
            "Moderate Content and enforce platform policies",
            "Detect, prevent, and investigate fraud, abuse, or security incidents",
            "Respond to inquiries and provide customer support",
            "Comply with legal, regulatory, and contractual obligations",
          ]}
        />
      </>
    ),
  },
  {
    title: "Legal Bases for Processing",
    content: (
      <>
        <P>The Company processes Personal Information based on one or more of the following legal grounds:</P>
        <UL
          items={[
            "Contractual necessity, including performance of the Terms and completion of Transactions",
            "Legitimate business interests, such as platform security, fraud prevention, and service improvement",
            "Legal obligations, including compliance with laws, regulations, and court orders",
            "User consent, where expressly obtained or required",
          ]}
        />
        <P>Where consent is relied upon, Users may withdraw consent subject to legal and contractual limitations.</P>
      </>
    ),
  },
  {
    title: "Disclosure of Information to Third Parties",
    content: (
      <>
        <P>
          The Company may disclose Personal Information to third parties only as reasonably necessary to operate the
          Platform and conduct its business, including to:
        </P>
        <UL
          items={[
            "Payment processors and financial service providers",
            "Shipping and fulfillment partners",
            "Hosting, cloud storage, and IT service providers",
            "Analytics, security, and fraud-prevention vendors",
            "Professional advisors such as legal and accounting firms",
          ]}
        />
        <P>
          All third parties receiving Personal Information are authorized to use it only for the purposes for which it
          was disclosed.
        </P>
      </>
    ),
  },
  {
    title: "Law Enforcement, Legal Requests & Public Safety",
    content: (
      <>
        <P>
          The Company may disclose Personal Information to law enforcement, regulatory authorities, courts, or other
          governmental bodies where required or permitted by law. Such disclosures may occur where the Company believes
          disclosure is necessary to:
        </P>
        <UL
          items={[
            "Comply with legal obligations",
            "Protect the rights, safety, or property of the Company, Users, or the public",
            "Investigate or prevent suspected illegal activity",
          ]}
        />
        <P>Where permitted by law, the Company may disclose information without prior notice to the affected User.</P>
      </>
    ),
  },
  {
    title: "Business Transfers & Corporate Transactions",
    content: (
      <P>
        In the event of a merger, acquisition, reorganization, or sale of assets, Personal Information may be
        transferred as part of such transaction. Any successor entity may continue to use Personal Information in
        accordance with this Privacy Policy, subject to applicable law.
      </P>
    ),
  },
  {
    title: "Data Retention",
    content: (
      <>
        <P>
          The Company retains Personal Information only for as long as reasonably necessary to fulfill the purposes
          described in this Privacy Policy, including to:
        </P>
        <UL
          items={[
            "Maintain User Accounts",
            "Complete Transactions",
            "Resolve disputes",
            "Enforce agreements",
            "Comply with legal and regulatory requirements",
          ]}
        />
        <P>Information may be retained beyond account termination where required or permitted by law.</P>
      </>
    ),
  },
  {
    title: "Data Security Measures",
    content: (
      <>
        <P>
          The Company implements reasonable administrative, technical, and organizational measures designed to protect
          Personal Information against unauthorized access, disclosure, alteration, or destruction.
        </P>
        <P>
          Despite these measures, no method of transmission over the internet is completely secure. The Company does not
          guarantee absolute security and disclaims liability for unauthorized access beyond its reasonable control.
        </P>
      </>
    ),
  },
  {
    title: "User Choices & Account Controls",
    content: (
      <>
        <P>
          Users may access, update, or correct certain Personal Information through their Account settings. Account
          deletion requests may be subject to verification and are not absolute — certain information may be retained
          following account deletion where necessary for legal compliance, dispute resolution, or fraud prevention.
        </P>
        <P>
          Communication preferences may be adjusted where technically feasible; however, transactional or
          service-related communications may continue as necessary.
        </P>
      </>
    ),
  },
  {
    title: "Cookies & Tracking Technologies",
    content: (
      <P>
        The Platform uses cookies and similar tracking technologies to enable core functionality, analyze usage, enhance
        performance, and improve user experience. Additional information is provided in the Company's{" "}
        <Strong>Cookie Policy</Strong>, which is incorporated by reference into this Privacy Policy.
      </P>
    ),
  },
  {
    title: "Children's Privacy",
    content: (
      <P>
        The Platform is not intended for use by individuals under the age of eighteen (18). The Company does not
        knowingly collect Personal Information from children. Parents or guardians who believe a child has provided
        Personal Information may contact the Company as described below.
      </P>
    ),
  },
  {
    title: "U.S. State Privacy Rights (Texas & Other States)",
    content: (
      <>
        <P>
          The Company operates from Texas and complies with applicable U.S. state privacy laws to the extent required.
          Depending on your state of residence, you may have certain rights regarding your Personal Information,
          including the right to request access, correction, or deletion.
        </P>
        <P>
          The Company does <Strong>not sell</Strong> Personal Information as defined under applicable U.S. privacy laws.
        </P>
      </>
    ),
  },
  {
    title: "International Users",
    content: (
      <P>
        The Platform is operated from the United States and governed by U.S. law. If you access the Platform from
        outside the United States, you acknowledge that your Personal Information will be transferred to, processed,
        and stored in the United States. By using the Platform, you consent to such transfers and processing.
      </P>
    ),
  },
  {
    title: "Changes to This Privacy Policy",
    content: (
      <P>
        The Company reserves the right to modify or update this Privacy Policy at any time. Any changes will be
        effective upon posting the revised Privacy Policy on the Platform. Your continued use of the Platform
        constitutes acceptance of the revised Privacy Policy.
      </P>
    ),
  },
  {
    title: "Contact Information & Privacy Inquiries",
    content: (
      <P>
        Questions, concerns, or requests regarding this Privacy Policy or the Company's data practices should be
        directed to the Privacy Contact Email listed on the Platform. Requests must include sufficient information to
        verify your identity. The Company will respond to verified requests within a reasonable timeframe as required
        by applicable law.
      </P>
    ),
  },
];

export const PrivacyPolicy = () => {
  return (
    <PolicyPage
      badge="Legal · Privacy Policy"
      title="Privacy Policy"
      effectiveDate="10th February 2026"
      website="www.theartreform.com"
      intro="This Privacy Policy describes how The Art of Reform collects, uses, discloses, and safeguards your personal information when you use our platform. Your privacy is important to us."
      sections={sections}
    />
  );
}