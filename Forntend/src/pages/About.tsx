import { Layout } from "@/components/Layout";
import { Target, Eye, Shield, Users, Award, Briefcase } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "We maintain complete transparency in our processes and build trust with every interaction.",
  },
  {
    icon: Users,
    title: "Student-Centric",
    description: "Every decision we make is focused on creating the best learning experience for our students.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in our curriculum, mentorship, and overall educational delivery.",
  },
  {
    icon: Briefcase,
    title: "Industry Relevance",
    description: "Our programs are designed in collaboration with industry experts to ensure job readiness.",
  },
];

const timeline = [
  { year: "January 2026", title: "Idea & Vision", description: "TechInCode was conceptualized by Krish (Founder) and Parth (Co-Founder) with a vision to create a platform that helps students gain practical tech skills and real industry experience beyond traditional education."},
  { year: "February 2026", title: "Industry Collaboration", description: "TechInCode officially collaborated with Notrix Creative to provide real client projects and professional exposure for interns. This partnership helps students gain practical industry experience." },
  { year: "February 2026", title: "Platform Development", description: "The development of the TechInCode platform started, focusing on building a modern website where students can explore internships, apply easily, and build their portfolios through live projects." },
  { year: "March 2026", title: "Official Launch", description: "TechInCode EduTech officially launched its platform to empower students with industry-ready skills, internships, and real-world project experience through collaboration with Notrix Creative." },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">TechInCode EduTech</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {/* We are on a mission to empower the next generation of tech professionals with industry-ready skills, real-world experience, and the confidence to excel in their careers. */}
              At Techincode, our mission is to empower the next generation of tech professionals with industry-ready skills, real-world experience, and the confidence to excel in their careers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-card border border-border rounded-xl card-hover">
              <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To provide accessible, high-quality internship opportunities that bridge the gap between academic learning and industry requirements, enabling students to build successful careers in technology and beyond.
              </p>
            </div>
            <div className="p-8 bg-card border border-border rounded-xl card-hover">
              <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the leading platform for skill-based learning and internships, recognized globally for producing industry-ready professionals who drive innovation and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="p-6 bg-card border border-border rounded-xl card-hover text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-xl gradient-bg flex items-center justify-center mb-5">
                  <value.icon className="w-7 h-7 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              From a small initiative to a thriving community
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />
              
              {timeline.map((item, index) => (
                <div key={item.year} className={`relative flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} hidden md:block`}>
                    <div className="p-6 bg-card border border-border rounded-xl card-hover inline-block">
                      <p className="text-primary font-bold text-lg mb-1">{item.year}</p>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full gradient-bg md:-translate-x-1/2 z-10" />
                  
                  <div className="flex-1 ml-16 md:ml-0">
                    <div className="p-6 bg-card border border-border rounded-xl card-hover md:hidden">
                      <p className="text-primary font-bold text-lg mb-1">{item.year}</p>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
