"use client";

import { PolicyPage, PolicySection, P, UL, Strong } from "@/webcomponents/reusable";
/* eslint-disable react/no-unescaped-entities */
const sections: PolicySection[] = [
  {
    title: "Introduction, Acceptance & Binding Effect",
    content: (
      <>
        <P>
          These Terms and Conditions (<Strong>"Terms"</Strong>) constitute a legally binding agreement between you
          (<Strong>"User," "you," or "your"</Strong>) and <Strong>The Art of Reform</Strong>, a Texas-based entity
          (<Strong>"Company," "we," "us," or "our"</Strong>), governing your access to and use of the website at
          www.theartreform.com, including all associated services, features, content, tools, marketplaces, and community
          functions (collectively, the <Strong>"Platform"</Strong>).
        </P>
        <P>
          By accessing, browsing, registering, purchasing artwork, posting content, or otherwise using the Platform in
          any manner, you expressly acknowledge that you have read, understood, and agree to be bound by these Terms. If
          you do not agree, you must immediately discontinue all use of the Platform.
        </P>
        <P>
          These Terms apply to all Users without limitation, including visitors, registered users, purchasers,
          contributors, and participants in any community or messaging features.
        </P>
      </>
    ),
  },
  {
    title: "Definitions & Interpretation",
    content: (
      <>
        <P>For purposes of these Terms, the following definitions apply:</P>
        <UL
          items={[
            '"Admin" means the Company and any individual or entity authorized by the Company to manage, operate, or enforce the Platform.',
            '"Artwork" means all art, creative works, images, designs, or related materials donated to and owned by the Company, including prison art.',
            '"Content" means any text, images, messages, posts, comments, data, or other materials made available on or through the Platform.',
            '"Inmate" means any currently or formerly incarcerated individual whose artwork may be featured or sold on the Platform.',
            '"Services" means all marketplace, informational, community, messaging, and related services offered through the Platform.',
            '"Transaction" means any purchase, sale, or attempted purchase of Artwork through the Platform.',
            '"User Account" or "Account" means a registered account created by a User to access certain features of the Platform.',
          ]}
        />
      </>
    ),
  },
  {
    title: "Eligibility, Accounts & Registration",
    content: (
      <>
        <P>
          The Platform is intended solely for individuals who are at least eighteen (18) years of age and who have the
          legal capacity to enter into binding contracts under applicable law.
        </P>
        <P>
          Inmates are strictly prohibited from creating, operating, or controlling User Accounts. All Accounts must be
          created and operated solely by non-incarcerated individuals.
        </P>
        <P>
          When creating an Account, you agree to provide accurate, current, and complete information and to keep such
          information updated. You are solely responsible for maintaining the confidentiality of your login credentials
          and for all activities conducted through your Account.
        </P>
      </>
    ),
  },
  {
    title: "Absolute Administrative Authority",
    content: (
      <P>
        The Platform operates under <Strong>absolute administrative control</Strong>. Admin retains unrestricted,
        unilateral authority over all aspects of the Platform — including User Accounts, Content, messages, listings,
        Transactions, and access to Services — and may at its sole discretion and without notice suspend, restrict,
        modify, disable, or terminate any Account; remove or alter any Content; cancel Transactions; or limit access to
        any feature. No User has any vested rights in continued access to the Platform.
      </P>
    ),
  },
  {
    title: "Platform Nature & Role of the Company",
    content: (
      <>
        <P>
          The Company operates the Platform as the <Strong>owner and seller of Artwork</Strong>, not as an intermediary,
          agent, broker, or facilitator on behalf of inmates or third parties. All Artwork offered for sale is owned by
          the Company at the time of listing.
        </P>
        <P>
          Nothing in these Terms creates any partnership, joint venture, agency, fiduciary duty, or employment
          relationship between the Company and any User or inmate.
        </P>
      </>
    ),
  },
  {
    title: "Artwork Donation, Ownership & Intellectual Property",
    content: (
      <>
        <P>
          All Artwork originating from inmates has been <Strong>voluntarily donated</Strong> to the Company. Upon
          donation, all right, title, and interest — including all intellectual property rights — are fully and
          irrevocably transferred to the Company.
        </P>
        <P>
          The Company retains exclusive ownership and may reproduce, modify, display, distribute, sell, license, market,
          or otherwise exploit such Artwork in any manner, worldwide, without restriction, compensation, or attribution.
          Moral rights are waived to the fullest extent permitted by law.
        </P>
      </>
    ),
  },
  {
    title: "Pricing, Payments & Taxes",
    content: (
      <>
        <P>
          All prices are listed in U.S. Dollars and are subject to change at the Company's sole discretion. The Company
          reserves the right to correct pricing errors at any time, including after a Transaction has been initiated.
        </P>
        <P>
          All payments must be made through the payment methods available on the Platform. By submitting payment
          information, you represent that you are authorized to use the selected payment method and authorize the Company
          to charge the full amount including applicable taxes or fees.
        </P>
        <P>You are solely responsible for all applicable taxes, duties, and customs fees associated with your purchase.</P>
      </>
    ),
  },
  {
    title: "No Refunds, Returns or Chargebacks",
    content: (
      <>
        <P>
          <Strong>All sales are final.</Strong> The Company maintains a strict no refunds, no returns, and no exchanges
          policy. Once a Transaction is completed, no refunds or credits will be issued for any reason.
        </P>
        <P>
          You expressly agree not to initiate chargebacks, payment disputes, or reversals with your payment provider.
          Any chargeback initiated in violation of these Terms constitutes a material breach and may result in permanent
          Account termination.
        </P>
      </>
    ),
  },
  {
    title: "Shipping, Delivery & Risk of Loss",
    content: (
      <>
        <P>
          Artwork is shipped using third-party carriers selected by the Company. Estimated delivery times are
          non-binding and for informational purposes only.
        </P>
        <P>
          Risk of loss and title pass to the purchaser upon shipment. The Company is{" "}
          <Strong>not responsible</Strong> for lost, delayed, damaged, misdelivered, or undelivered items once Artwork
          has been transferred to the carrier.
        </P>
      </>
    ),
  },
  {
    title: "User Communications & Messaging Features",
    content: (
      <P>
        The Platform may include messaging or discussion functionality. All such communications occur{" "}
        <Strong>solely at the Users' own risk</Strong>. The Company does not endorse, verify, monitor, or guarantee the
        accuracy, safety, legality, or appropriateness of User communications. Admin reserves the unrestricted right —
        but not the obligation — to access, monitor, review, remove, restrict, or disclose communications at any time.
      </P>
    ),
  },
  {
    title: "Inmate Correspondence & Off-Platform Interactions",
    content: (
      <P>
        Any correspondence between Users and inmates occurs <Strong>entirely outside of the Platform</Strong> and is not
        facilitated, supervised, or controlled by the Company. The Company expressly disclaims all responsibility and
        liability for any communications, relationships, transactions, or outcomes arising from User-initiated contact
        with inmates. Users assume full responsibility for complying with all applicable laws and prison regulations
        governing inmate contact.
      </P>
    ),
  },
  {
    title: "Community Content, Posts & User-Generated Material",
    content: (
      <>
        <P>
          By submitting any Content, you grant the Company a perpetual, irrevocable, worldwide, royalty-free,
          sublicensable license to use, reproduce, display, distribute, modify, and exploit such Content in connection
          with the Platform.
        </P>
        <P>
          The Company has no obligation to host, maintain, or retain any User-generated Content and may remove or modify
          it at any time, with or without notice.
        </P>
      </>
    ),
  },
  {
    title: "Prohibited Uses & Conduct",
    content: (
      <>
        <P>You agree not to engage in any conduct that:</P>
        <UL
          items={[
            "Violates any applicable law or regulation",
            "Harasses, threatens, exploits, or harms others",
            "Misrepresents identity or affiliation",
            "Misuses inmate information or correspondence",
            "Circumvents Platform controls or security features",
            "Interferes with Platform operations or integrity",
            "Uploads malicious code or harmful content",
          ]}
        />
        <P>
          The Company reserves the right to take immediate enforcement action, including suspension or termination of
          Accounts and reporting to authorities, without prior notice.
        </P>
      </>
    ),
  },
  {
    title: "Monitoring, Enforcement & Cooperation with Authorities",
    content: (
      <P>
        The Company reserves the right to monitor, investigate, and enforce compliance with these Terms. The Company may
        cooperate fully with law enforcement, regulatory authorities, court orders, or legal requests — including by
        disclosing User information, communications, Content, or activity records — without notice to the User where
        permitted or required by law.
      </P>
    ),
  },
  {
    title: "Intellectual Property of the Platform",
    content: (
      <>
        <P>
          All intellectual property rights in and to the Platform — including software, code, design, layout, branding,
          trademarks, logos, text, graphics, and proprietary content — are owned exclusively by the Company or its
          licensors.
        </P>
        <P>
          Users are granted a limited, non-exclusive, revocable, non-transferable license to access and use the Platform
          solely for its intended purposes. Users may not copy, reproduce, scrape, distribute, reverse engineer, or
          create derivative works without the Company's prior written consent.
        </P>
      </>
    ),
  },
  {
    title: "Third-Party Services, Links & External Content",
    content: (
      <P>
        The Platform may contain links to third-party websites or services. Such links are provided for convenience only.
        The Company does not endorse, control, or assume responsibility for any third-party content, services, policies,
        or practices. The Company shall not be liable for any loss or damage arising from your use of third-party
        services.
      </P>
    ),
  },
  {
    title: "Disclaimers of Warranties",
    content: (
      <P>
        THE PLATFORM, SERVICES, AND ARTWORK ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF
        ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE COMPANY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT
        LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
        NON-INFRINGEMENT.
      </P>
    ),
  },
  {
    title: "Limitation of Liability",
    content: (
      <P>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE COMPANY'S TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE GREATER OF
        (A) USD $100 OR (B) THE AMOUNT PAID BY YOU IN THE SIX (6) MONTHS PRECEDING THE CLAIM. IN NO EVENT SHALL THE
        COMPANY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES,
        INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL.
      </P>
    ),
  },
  {
    title: "Indemnification",
    content: (
      <>
        <P>You agree to defend, indemnify, and hold harmless the Company from all claims arising out of or related to:</P>
        <UL
          items={[
            "Your use of the Platform",
            "Your violation of these Terms",
            "Your communications or interactions with other Users or inmates",
            "Your Content or conduct",
            "Any chargebacks or payment disputes initiated by you",
          ]}
        />
        <P>This indemnification obligation survives termination of your Account and these Terms.</P>
      </>
    ),
  },
  {
    title: "Suspension, Termination & Survival",
    content: (
      <P>
        The Company may suspend or terminate your Account or access at any time, with or without cause, notice, or
        liability. Upon termination, your right to access and use the Platform immediately ceases. Sections intended by
        their nature to survive termination — including ownership, disclaimers, limitation of liability,
        indemnification, and governing law — shall survive.
      </P>
    ),
  },
  {
    title: "Modifications to the Terms & Platform",
    content: (
      <P>
        The Company reserves the right to modify, amend, or replace these Terms at any time. Updated Terms will be
        effective upon posting on the Platform. Your continued use of the Platform after the effective date of any
        changes constitutes acceptance of the revised Terms.
      </P>
    ),
  },
  {
    title: "Governing Law & Venue",
    content: (
      <P>
        These Terms shall be governed by the laws of the State of Texas. Any legal action or proceeding shall be brought
        exclusively in the state or federal courts located within Texas, and you hereby consent to personal jurisdiction
        and venue in such courts.
      </P>
    ),
  },
  {
    title: "Dispute Resolution & Class Action Waiver",
    content: (
      <>
        <P>
          Any dispute shall be resolved <Strong>exclusively on an individual basis</Strong> and not in any class,
          collective, consolidated, or representative action. Each party knowingly and irrevocably{" "}
          <Strong>waives any right to a trial by jury</Strong>.
        </P>
        <P>
          All disputes shall be brought exclusively in the state or federal courts located within Texas. If any portion
          of this Section is found unenforceable, the remaining provisions shall remain in full force and effect.
        </P>
      </>
    ),
  },
  {
    title: "Miscellaneous Legal Provisions",
    content: (
      <>
        <P>
          These Terms constitute the entire agreement between you and the Company regarding the Platform and supersede
          all prior agreements. If any provision is held unenforceable, such provision shall be severed and the
          remaining provisions shall remain in full force.
        </P>
        <P>
          For questions or legal notices, contact us at the email address provided on the Platform.
        </P>
      </>
    ),
  },
];

export const TermsAndConditions = () => {
  return (
    <PolicyPage
      badge="Legal · Terms & Conditions"
      title="Terms and Conditions"
      effectiveDate="10th February 2026"
      website="www.theartreform.com"
      intro="These Terms and Conditions constitute a legally binding agreement governing your access to and use of The Art of Reform platform. Please read them carefully before using our services."
      sections={sections}
    />
  );
}