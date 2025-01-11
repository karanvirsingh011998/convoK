import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { 
  MessageSquare, 
  Users, 
  Shield, 
  Zap, 
  Globe, 
  Heart,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Lock,
  Smartphone,
  Video,
  Share2
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export default function LandingPage() {
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Real-time Chat",
      description: "Experience seamless real-time messaging with instant delivery and read receipts."
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Secure Communication",
      description: "Your conversations are protected with end-to-end encryption and privacy controls."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Team Collaboration",
      description: "Connect with your team members and collaborate effectively in real-time."
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Lightning Fast",
      description: "Built for speed with instant message delivery and minimal latency."
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Cross-Platform",
      description: "Access your conversations from any device, anywhere, anytime."
    },
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: "User Friendly",
      description: "Intuitive interface designed for the best user experience."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "1M+", label: "Messages Sent" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ];

  const testimonials = [
    {
      quote: "ConvoK has transformed how our team communicates. It's intuitive and reliable.",
      author: "Sarah Johnson",
      role: "Product Manager",
      company: "Tech Corp"
    },
    {
      quote: "The best chat platform we've used. The security features give us peace of mind.",
      author: "Michael Chen",
      role: "CTO",
      company: "StartUp Inc"
    },
    {
      quote: "Seamless communication across all our departments. Highly recommended!",
      author: "Emma Davis",
      role: "Team Lead",
      company: "Innovation Labs"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Create Account",
      description: "Sign up in seconds with just your email"
    },
    {
      number: "02",
      title: "Join Conversations",
      description: "Connect with your team or start new chats"
    },
    {
      number: "03",
      title: "Collaborate",
      description: "Share ideas and work together in real-time"
    }
  ];

  const showcaseFeatures = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Smart Messaging",
      description: "AI-powered chat suggestions and smart replies",
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Military-grade encryption for business communications",
      color: "bg-green-500/10 text-green-500"
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Video Meetings",
      description: "Integrated video calls with screen sharing",
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "File Sharing",
      description: "Secure file sharing with version control",
      color: "bg-orange-500/10 text-orange-500"
    }
  ];

    return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[90vh] bg-gradient-to-b from-background to-primary/5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto space-y-8"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
              New Features Available
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Connect and Chat with
            <span className="text-primary block">ConvoK</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Experience the next generation of secure and seamless communication. 
            Connect with your team in real-time, anywhere, anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </motion.div>

        {/* Chat Preview Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-12 relative"
        >
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary-foreground/20 backdrop-blur-sm" />
            <div className="relative p-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  C
                </div>
                <div className="flex-1">
                  <div className="h-2.5 bg-primary/20 rounded w-24 mb-2"></div>
                  <div className="h-2 bg-primary/10 rounded w-16"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-primary/10 rounded w-3/4"></div>
                <div className="h-3 bg-primary/10 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Showcase Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to streamline your communication
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {showcaseFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg border p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className={cn("p-3 rounded-lg inline-block", feature.color)}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section - Enhanced */}
      <section className="py-24 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose ConvoK?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            How ConvoK Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-bold text-primary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-6 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
            </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
                    <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="p-6 rounded-lg bg-background border shadow-sm"
              >
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Everything you need for effective communication
              </h2>
              <div className="space-y-4">
                {[
                  "End-to-end encryption for all messages",
                  "File sharing and media support",
                  "Group chat and private messaging",
                  "Cross-platform synchronization",
                  "Custom notification settings",
                  "Message search and history"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary h-5 w-5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-tr from-primary to-primary-foreground/50 opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <MessageSquare className="h-24 w-24 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of users who trust ConvoK for their communication needs.
          </p>
          <Button asChild size="lg" className="text-lg">
            <Link to="/register">Create Your Account</Link>
          </Button>
        </div>
      </section>

      {/* Mobile Preview Section - Updated with Coming Soon */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Coming Soon</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">
                Take ConvoK Everywhere
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our mobile apps are under development. Meanwhile, enjoy our fully responsive web experience on any device.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Smartphone className="h-12 w-12 text-primary" />
                  <div>
                    <div className="font-semibold">Mobile Responsive</div>
                    <div className="text-sm text-muted-foreground">
                      Works perfectly on all devices
                        </div>
                        </div>
                        </div>
                <div className="flex items-center gap-4">
                  <Globe className="h-12 w-12 text-primary" />
                  <div>
                    <div className="font-semibold">Web First</div>
                    <div className="text-sm text-muted-foreground">
                      Access from any browser
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <Button variant="outline" className="opacity-50 cursor-not-allowed" disabled>
                  <div className="flex items-center gap-2">
                    iOS App
                    <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full">
                      Soon
                    </span>
                  </div>
                </Button>
                <Button variant="outline" className="opacity-50 cursor-not-allowed" disabled>
                  <div className="flex items-center gap-2">
                    Android App
                    <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full">
                      Soon
                    </span>
                  </div>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[9/16] rounded-[2.5rem] border-8 border-muted p-2 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary-foreground/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <MessageSquare className="h-16 w-16 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Mobile Apps Coming Soon</h3>
                  <p className="text-sm text-muted-foreground">
                    We're working hard to bring you native mobile experiences
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}