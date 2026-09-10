import { Layout } from "@/components/Layout";
import { Award, FileText, QrCode, ShieldCheck, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Credentials",
    description: "Each certificate comes with a unique verification code that employers can validate.",
  },
  {
    icon: QrCode,
    title: "QR Code Verification",
    description: "Scan the QR code on your certificate to instantly verify its authenticity.",
  },
  {
    icon: Download,
    title: "Digital Download",
    description: "Download your certificate in high-resolution PDF format, ready for printing.",
  },
  {
    icon: ExternalLink,
    title: "LinkedIn Integration",
    description: "Easily add your certificate to your LinkedIn profile with one click.",
  },
];

const Certificate = () => {
  return (
    <Layout>

      {/* Hero */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Certificates & <span className="gradient-text">LOR</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Earn industry-recognized certificates and personalized letters of recommendation upon successful completion of your internship.
            </p>
          </div>
        </div>
      </section>

      {/* Certificate Preview */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Certificate Card */}
            <div className="relative">
              <div className="absolute inset-0 gradient-bg rounded-xl blur-xl opacity-20" />
              <div className="relative p-8 bg-card border border-border rounded-xl">
                <div className="aspect-[4/3] bg-gradient-to-br from-muted to-background rounded-lg border border-border p-6 flex flex-col items-center justify-center">
                  
                  <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-foreground" />
                  </div>

                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Certificate of Completion
                  </p>

                  <h3 className="text-2xl font-bold gradient-text mb-2">
                    TechInCode EduTech
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4">
                    This is to certify that
                  </p>

                  <p className="text-xl font-semibold text-foreground mb-2">
                    [Your Name]
                  </p>

                  <p className="text-muted-foreground text-sm text-center max-w-xs">
                    has successfully completed the internship program in Web Development
                  </p>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center">
                      <QrCode className="w-6 h-6 text-primary" />
                    </div>

                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Verification Code</p>
                      <p className="text-sm font-mono text-foreground">TIC-2026-XXXX</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">
                Industry <span className="gradient-text">Recognized</span>
              </h2>

              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex gap-4 p-4 bg-card border border-border rounded-xl card-hover"
                >
                  <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-foreground" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>

      {/* LOR Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                Letter of <span className="gradient-text">Recommendation</span>
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                Upon successful completion of your internship, you'll receive a personalized Letter of Recommendation (LOR) from your mentor.
              </p>

              <ul className="space-y-3">
                {[
                  "Personalized based on your performance",
                  "Signed by industry mentors",
                  "Highlights key skills and achievements",
                  "Perfect for job applications and higher studies",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full gradient-bg" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button variant="gradient" size="lg">
                Start Your Internship
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 gradient-bg rounded-xl blur-xl opacity-20" />
              <div className="relative p-8 bg-card border border-border rounded-xl">

                <div className="aspect-[4/3] bg-gradient-to-br from-muted to-background rounded-lg border border-border p-6">

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-foreground" />
                    </div>

                    <div>
                      <p className="font-semibold text-foreground">
                        TechInCode EduTech
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Letter of Recommendation
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                    <div className="h-3 bg-muted rounded w-4/6" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-3/4" />
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Internship Process */}
<section className="py-24 bg-card/40">
  <div className="container mx-auto px-4">

    {/* Heading */}
    <div className="text-center max-w-2xl mx-auto mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Internship <span className="gradient-text">Process</span>
      </h2>
      <p className="text-muted-foreground text-lg">
        Follow these simple steps to complete your internship journey with TechInCode
      </p>
    </div>

    {/* Steps Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {[
        { title: "Visit Platform", desc: "Go to the TechInCode website and explore available internship programs." },
        { title: "Create Account", desc: "Sign up or log in to your TechInCode account to access internships." },
        { title: "Choose Internship", desc: "Browse different domains and select the internship that matches your interest." },
        { title: "Apply for Internship", desc: "Submit your application and enroll in the selected internship program." },
        { title: "Start Tasks", desc: "Work on the assigned internship tasks and projects during your internship." },
        { title: "Upload on GitHub", desc: "Upload your completed project to GitHub to showcase your work." },
        { title: "Submit Project Link", desc: "Submit your GitHub repository link for evaluation by our team." },
        { title: "Project Review", desc: "Our mentors review your project and verify the work." },
        { title: "Get Certificate", desc: "Receive your internship certificate and Letter of Recommendation." }
      ].map((step, index) => (

        <div
          key={index}
          className="relative p-8 bg-background border border-border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group"
        >

          {/* Step Number */}
          <div className="absolute -top-5 left-6 w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-sm font-bold text-white shadow-md">
            {index + 1}
          </div>

          {/* Content */}
          <h3 className="text-lg font-semibold mt-4 mb-2 group-hover:text-primary transition">
            {step.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed">
            {step.desc}
          </p>

        </div>

      ))}

    </div>

  </div>
</section>

      {/* Rewards Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Earn Your <span className="gradient-text">Internship Rewards</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Certificate */}
            <div className="p-8 bg-card border border-border rounded-xl text-center card-hover">
              <h3 className="text-2xl font-bold mb-4">Certificate</h3>
              <p className="text-4xl font-bold text-primary mb-4">₹100</p>

              <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                <li>✔ Internship Completion Certificate</li>
                <li>✔ Unique Verification Code</li>
                <li>✔ Downloadable PDF</li>
                <li>✔ LinkedIn Integration</li>
              </ul>

              <Button variant="gradient" className="w-full">
                Get Certificate
              </Button>
            </div>

            {/* Certificate + LOR */}
            <div className="p-8 bg-card border border-border rounded-xl text-center card-hover">
              <h3 className="text-2xl font-bold mb-4">Certificate + LOR</h3>
              <p className="text-4xl font-bold text-primary mb-4">₹200</p>

              <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                <li>✔ Internship Certificate</li>
                <li>✔ Letter of Recommendation</li>
                <li>✔ Signed by Mentor</li>
                <li>✔ Career Support</li>
              </ul>

              <Button variant="gradient" className="w-full">
                Get Certificate + LOR
              </Button>
            </div>

            {/* Internship Kit */}
            <div className="p-8 bg-card border border-border rounded-xl text-center card-hover">
              <h3 className="text-2xl font-bold mb-4">Internship Kit</h3>
              <p className="text-4xl font-bold text-primary mb-4">₹1500</p>

              <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                <li>✔ TechInCode T-Shirt</li>
                <li>✔ Internship Certificate</li>
                <li>✔ Letter of Recommendation</li>
                <li>✔ Tech Notebook</li>
                <li>✔ Sticker Pack</li>
              </ul>

              <Button variant="gradient" className="w-full">
                Get Internship Kit
              </Button>
            </div>

          </div>

        </div>
      </section>

    </Layout>
  );
};

export default Certificate;