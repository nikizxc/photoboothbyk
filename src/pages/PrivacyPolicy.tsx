import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-4xl font-bright-kenly">
          privacy policy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="font-semibold">Last updated: August 31, 2026</p>
        <p>
          This Privacy Policy explains how your photos and information are
          handled when you use our photobooth.
        </p>

        <section className="space-y-2">
          <h3 className="font-semibold text-lg">Photos & Camera Access</h3>

          <p>
            Camera access is required to capture photos using the photo booth.
            Your browser will ask for permission before the camera is used.
          </p>

          <p>
            Photos you capture or upload are only used to create your selected
            photo layout, apply filters, customize strip, and generate your
            final photo or GIF.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-semibold text-lg">Photo Storage</h3>

          <p>
            Photos are processed locally in your browser and are not uploaded or
            stored on the server.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-semibold text-lg">Downloads</h3>

          <p>
            Downloaded files are saved directly to your device. Once a file has
            been downloaded, you are responsible for how you store, share, or
            use it.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-semibold text-lg">
            Third-Party Libraries & Services
          </h3>

          <p>
            This website uses third-party open-source libraries and services to
            provide functionality, hosting, and improve the user experience.
            These libraries and services do not upload or store your photos as
            part of the photo booth's functionality.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-semibold text-lg">Changes to This Policy</h3>

          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be reflected on this page with an updated revision date.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-semibold text-lg">Contact</h3>

          <p>
            If you have questions or concerns regarding your privacy or how your
            information is handled on this website, please contact us.
          </p>
        </section>
        <p>
          By using the photo booth, you agree to the handling of information
          described in this Privacy Policy.
        </p>
      </CardContent>
    </Card>
  );
};

export default PrivacyPolicy;
