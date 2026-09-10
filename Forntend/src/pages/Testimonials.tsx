import { Layout } from "@/components/Layout";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Web Development Intern",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    review: "The internship at TechInCode was a game-changer for my career. I learned React and Node.js by building real projects. The mentors were incredibly supportive!",
  },
  {
    name: "Kavya Singh",
    role: "Data Science Intern",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    review: "I gained hands-on experience in machine learning and data analysis. The certificate and LOR helped me land my dream job at a top tech company.",
  },
  {
    name: "Rohan Patel",
    role: "App Development Intern",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    review: "Learning Flutter at TechInCode was amazing. I built two complete apps during my internship. The practical approach really made a difference.",
  },
  {
    name: "Priya Sharma",
    role: "Digital Marketing Intern",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 4,
    review: "Even though I'm from a non-tech background, the marketing internship was perfect. I learned SEO, social media strategy, and content marketing from scratch.",
  },
  {
    name: "Vikram Joshi",
    role: "Python Developer Intern",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    review: "The Python internship covered everything from basics to advanced topics like API development. The project-based learning was incredibly effective.",
  },
  {
    name: "Ananya Reddy",
    role: "Graphic Design Intern",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    review: "I improved my design skills tremendously. Working on real client projects gave me confidence and a solid portfolio to showcase.",
  },
];

const overallStats = {
  rating: "4.8",
  totalReviews: "1000+",
  recommendRate: "98%",
};

const Testimonials = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="gradient-text">Students Say</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Hear from our community of successful interns who have transformed their careers with TechInCode EduTech.
            </p>
            
            {/* Overall Stats */}
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-4xl font-bold gradient-text">{overallStats.rating}</span>
                  <Star className="w-8 h-8 text-primary fill-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Overall Rating</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold gradient-text">{overallStats.totalReviews}</p>
                <p className="text-sm text-muted-foreground">Reviews</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold gradient-text">{overallStats.recommendRate}</p>
                <p className="text-sm text-muted-foreground">Would Recommend</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="p-6 bg-card border border-border rounded-xl card-hover group relative"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
                
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-border group-hover:border-primary/50 transition-colors"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-primary">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-primary fill-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  "{testimonial.review}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
