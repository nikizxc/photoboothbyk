import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bright-kenly">
            privacy policy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="font-semibold">Last updated: August 31, 2026</p>
            <p>Your privacy matters.</p>
            <p>
              This Privacy Policy explains how your photos and information are
              handled when you use our photobooth.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Photos & Camera Access</h3>

            <p>
              Camera access is required to capture photos using the photo booth.
              Your browser will ask for permission before the camera is used.
            </p>

            <p>
              Photos you capture or upload are only used to create your selected
              photo layout, apply filters, customize frame design, and generate
              your final photo or GIF.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Photo Storage</h3>

            <p>
              Photos are processed locally in your browser and are not uploaded
              or stored on the server.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Downloads</h3>

            <p>
              Downloaded files are saved directly to your device. Once a file
              has been downloaded, you are responsible for how you store, share,
              or use it.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">
              Third-Party Libraries & Services
            </h3>

            <p>
              This website uses third-party open-source libraries and services
              to provide functionality, hosting, and improve the user
              experience. These libraries and services do not upload or store
              your photos as part of the photo booth's functionality.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Changes to This Policy</h3>

            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be reflected on this page with an updated revision date.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Contact</h3>

            <p>
              If you have questions or concerns regarding your privacy or how
              your information is handled on this website, please contact us.
            </p>
          </div>
          <p>
            By using the photo booth, you agree to the handling of information
            described in this Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
