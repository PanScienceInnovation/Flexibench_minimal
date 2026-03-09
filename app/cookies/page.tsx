import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";

export default function CookiesPage() {
  return (
    <main id="main-content">
      <LpNavbar1 />
      <div className="container-padding-x container mx-auto py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        <div className="prose prose-lg">
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
            <p className="text-muted-foreground">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We use cookies for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Essential functionality (authentication, security)</li>
              <li>Analytics to understand site usage</li>
              <li>Preference storage (theme, language)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Managing Cookies</h2>
            <p className="text-muted-foreground">
              You can control cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Contact Us</h2>
            <p className="text-muted-foreground">
              Questions about our Cookie Policy? Contact us at{" "}
              <a href="mailto:privacy@flexibench.com" className="text-primary hover:underline">
                privacy@flexibench.com
              </a>
            </p>
          </section>
        </div>
      </div>
      <Footer1 />
    </main>
  );
}
