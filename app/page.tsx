import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Zap,
  Database,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import Image from "next/image";

export default function AmplyLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border relative z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Image
                src="/amply-logo.png"
                alt="Amply"
                width={120}
                height={32}
                className="h-10 w-auto"
              />
              <a
                href=""
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </a>
              <a
                href="#product"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Product
              </a>
              <a
                href="#about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Request a Demo
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 md:py-32 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/40 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-balance">
            Powering
            <br />
            Predictive
            <br />
            <span className="text-primary">Manufacturing.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Help legacy factories keep up with demand by increasing operational
            efficiency through affordable, adaptable sensor technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base"
            >
              Request a Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base bg-transparent hidden"
            >
              View Live Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y relative bg-zinc-900">
        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center md:text-left">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-primary">
                30%+
              </div>
              <div
                className="text-sm"
                style={{ color: "var(--light-muted-foreground)" }}
              >
                Productivity lost due to inefficient factory layouts
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-primary">
                70%+
              </div>
              <div
                className="text-sm"
                style={{ color: "var(--light-muted-foreground)" }}
              >
                Manufacturers still rely on manual tracking methods
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-primary">
                900%+
              </div>
              <div
                className="text-sm"
                style={{ color: "var(--light-muted-foreground)" }}
              >
                Projected increase in digital twin market by 2030
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="container mx-auto px-6 py-24 relative">
        <div className="absolute left-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-primary/70 to-transparent" />
        <div className="absolute right-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-primary/70 to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            The Challenge for Small Manufacturers
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-pretty leading-relaxed">
            Micro, Small, and Medium Enterprises (MSMEs) with 10-300 employees
            face a critical challenge: how can legacy factories keep up with
            demand when they're constrained by upfront costs, old machinery, and
            legacy layouts?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-semibold mb-3">
                Manual Process Dependency
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Most SMEs still rely on manual tracking methods, leading to
                inefficiencies and lost productivity.
              </p>
            </Card>
            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-semibold mb-3">Budget Constraints</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                High upfront costs for modern monitoring systems put them out of
                reach for smaller operations.
              </p>
            </Card>
            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-semibold mb-3">
                Legacy Infrastructure
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Old machinery and outdated layouts make integration of new
                technology challenging.
              </p>
            </Card>
            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-semibold mb-3">
                Real-Time Visibility Gap
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Without real-time data, decision-making is reactive rather than
                predictive.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section
        id="product"
        className="py-24 relative overflow-hidden bg-[#220000]"
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(oklch(0.55 0.25 25) 1px, transparent 1px), linear-gradient(90deg, oklch(0.55 0.25 25) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-20 right-10 w-64 h-64 border-2 border-primary/40 rounded-lg rotate-12 pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-48 h-48 border-2 border-primary/40 rounded-lg -rotate-12 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2
              className="text-3xl md:text-5xl font-bold mb-6 text-balance"
              style={{ color: "var(--light-foreground)" }}
            >
              Affordable, Adaptable, & Easy to Integrate
            </h2>
            <p
              className="text-lg text-pretty leading-relaxed"
              style={{ color: "var(--light-muted-foreground)" }}
            >
              Our complete solution combines hardware and software to give you
              real-time insights into your manufacturing operations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Hardware Card */}
            <Card className="p-8 border-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: "var(--light-foreground)" }}
                >
                  Hardware
                </h3>
              </div>
              <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
                <img
                  src="/industrial-ct-sensor-and-edge-box-hardware.jpg"
                  alt="CT Sensors and Edge Box"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--light-foreground)" }}
                  >
                    Clip-on CT sensors for non-invasive installation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--light-foreground)" }}
                  >
                    Edge box for local data processing
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--light-foreground)" }}
                  >
                    Works with existing machinery—no retrofitting required
                  </span>
                </li>
              </ul>
            </Card>

            {/* Software Card */}
            <Card className="p-8 border-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: "var(--light-foreground)" }}
                >
                  Software
                </h3>
              </div>
              <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
                <img
                  src="/digital-twin-dashboard-with-oee-metrics-and-analyt.jpg"
                  alt="Digital Twin Dashboard"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--light-foreground)" }}
                  >
                    Digital twin visualization of your factory floor
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--light-foreground)" }}
                  >
                    OEE tracking via AI machine learning
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--light-foreground)" }}
                  >
                    ERP integration and predictive maintenance alerts
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="mx-auto px-6 py-24 relative bg-zinc-800">
        <div className="absolute top-20 right-10 w-64 h-64 border-2 border-primary/40 rounded-lg rotate-12 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Built for Small Manufacturers
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Unlike enterprise solutions from Siemens, Janitza, or Emerson, Amply
            is designed specifically for SMEs.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-card border-border text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Friendly Cost</h3>
              <p className="text-sm text-muted-foreground">Less than $1/day</p>
            </Card>
            <Card className="p-6 bg-card border-border text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Predictive Maintenance</h3>
              <p className="text-sm text-muted-foreground">AI-powered alerts</p>
            </Card>
            <Card className="p-6 bg-card border-border text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">ERP Integrated</h3>
              <p className="text-sm text-muted-foreground">
                Seamless data flow
              </p>
            </Card>
            <Card className="p-6 bg-card border-border text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">OEE Tracking</h3>
              <p className="text-sm text-muted-foreground">Real-time metrics</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-24 relative hidden"
        style={{ backgroundColor: "var(--light-background)" }}
      >
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, oklch(0.55 0.25 25) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2
              className="text-3xl md:text-5xl font-bold mb-6 text-balance"
              style={{ color: "var(--light-foreground)" }}
            >
              Transparent, Affordable Pricing
            </h2>
            <p
              className="text-lg text-pretty leading-relaxed"
              style={{ color: "var(--light-muted-foreground)" }}
            >
              Start small and scale as you grow. No hidden fees, no long-term
              contracts.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="p-8 md:p-12 border-2">
              <div className="text-center mb-8">
                <div
                  className="text-5xl md:text-6xl font-bold mb-2"
                  style={{ color: "var(--light-foreground)" }}
                >
                  $20
                  <span
                    className="text-2xl"
                    style={{ color: "var(--light-muted-foreground)" }}
                  >
                    /month
                  </span>
                </div>
                <p style={{ color: "var(--light-muted-foreground)" }}>
                  Less than $1 per day
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <div
                      className="font-semibold mb-1"
                      style={{ color: "var(--light-foreground)" }}
                    >
                      Starter Kit Included
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "var(--light-muted-foreground)" }}
                    >
                      15 CT sensor installations + 1 edge box
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <div
                      className="font-semibold mb-1"
                      style={{ color: "var(--light-foreground)" }}
                    >
                      One-Time Installation
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "var(--light-muted-foreground)" }}
                    >
                      $50 setup fee (waived for early adopters)
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <div
                      className="font-semibold mb-1"
                      style={{ color: "var(--light-foreground)" }}
                    >
                      Scale as You Grow
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "var(--light-muted-foreground)" }}
                    >
                      Additional CT sensors at $2/month per unit
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <div
                      className="font-semibold mb-1"
                      style={{ color: "var(--light-foreground)" }}
                    >
                      ROI Guarantee
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "var(--light-muted-foreground)" }}
                    >
                      Avoid overtime shifts and reduce downtime
                    </div>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/30 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Ready to Transform Your Factory?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
            Join forward-thinking manufacturers who are already using Amply to
            increase efficiency and reduce costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border relative z-10">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Image
                  src="/amply-logo.png"
                  alt="Amply"
                  width={100}
                  height={27}
                  className="h-7 w-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Powering predictive manufacturing for small and medium
                enterprises.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Hardware
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Software
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Case Studies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
            © 2025 Amply. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
