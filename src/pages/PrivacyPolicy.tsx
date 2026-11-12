import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PRIVACY_POLICY_SECTIONS } from "@/constants/privacy-policy.constant";

const PrivacyPolicy = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center md:text-4xl text-2xl font-bright-kenly">
          privacy policy
        </CardTitle>
      </CardHeader>
      <CardContent className="md:space-y-6 space-y-4 md:text-sm text-xs">
        <p className="font-semibold">Last updated: August 31, 2026</p>
        <p>
          This Privacy Policy explains how your photos and information are
          handled when you use our photobooth.
        </p>

        {PRIVACY_POLICY_SECTIONS.map(({ title, paragraphs }, index) => (
          <section key={index} className="space-y-2">
            <h3 className="font-semibold md:text-lg text-sm">{title}</h3>

            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>
        ))}

        <p>
          By using the photo booth, you agree to the handling of information
          described in this Privacy Policy.
        </p>
      </CardContent>
    </Card>
  );
};

export default PrivacyPolicy;
