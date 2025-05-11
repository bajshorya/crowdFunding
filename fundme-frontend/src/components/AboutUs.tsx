// src/components/AboutUs.tsx
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen font-mono">
      <main className="container mx-auto px-4 py-12 pt-16">
        {/* Top Navigation */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md hover:bg-gradient-to-l hover:scale-105 transition-all duration-300 shadow-xs"
          >
            Back to Home
          </button>
        </div>

        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse mb-4">
            Discover CrowdFund
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A vibrant and secure way to support projects you love, from
            community ideas to creative dreams, all powered by Ethereum!
          </p>
        </section>

        {/* Utility Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-purple-500 mb-8">
            Why Choose CrowdFund?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Support Projects Directly",
                desc: "Send ETH straight to projects you care about with no middleman. Every contribution is safe and recorded openly!",
              },
              {
                title: "Safe Fund Management",
                desc: "Only the project owner can access the funds, ensuring your support goes exactly where it’s meant to.",
              },
              {
                title: "See Who’s Helping",
                desc: "Check out every supporter and their contributions in real-time, updated every 10 seconds for full transparency.",
              },
              {
                title: "Secure and Reliable",
                desc: "Our platform uses smart technology to keep your contributions safe and ensure every project meets funding goals.",
              },
              {
                title: "Try Without Risk",
                desc: "Test your ideas on the Sepolia network—a safe space to explore crowdfunding without spending real money.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-6 rounded-md border border-pink-500/50 hover:shadow-md hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold text-pink-500 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Where It Can Be Used Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-purple-500 mb-8">
            Where Your Support Makes a Difference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Community Projects",
                desc: "Help build parks, libraries, or community centers. Every contribution brings your neighborhood together!",
              },
              {
                title: "Creative Ventures",
                desc: "Support artists, musicians, or filmmakers to create albums, films, or art that inspires the world.",
              },
              {
                title: "Charities & Causes",
                desc: "Donate to disaster relief, education, or health initiatives, knowing your support reaches those in need.",
              },
              {
                title: "Startup Ideas",
                desc: "Back new products or services and help entrepreneurs test their big ideas in a safe environment.",
              },
              {
                title: "Learning & Education",
                desc: "Explore blockchain by funding projects, perfect for students and developers eager to learn.",
              },
              {
                title: "Hackathons & Experiments",
                desc: "Join the fun of testing new funding ideas or showcasing cool blockchain projects at hackathons.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-6 rounded-md border border-purple-500/50 hover:shadow-md hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold text-purple-500 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It’s Useful Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-purple-500 mb-8">
            What Makes CrowdFund Special
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Build Trust",
                desc: "Every contribution is open for all to see, so you know your support is making a real impact.",
              },
              {
                title: "Reach Everyone",
                desc: "Anyone with an Ethereum wallet can join, connecting supporters from all over the world.",
              },
              {
                title: "Save on Fees",
                desc: "Skip high platform fees and send more of your support directly to the projects you love.",
              },
              {
                title: "Stay Secure",
                desc: "Funds are protected and only go to the project owner, keeping your contributions safe.",
              },
              {
                title: "Learn & Grow",
                desc: "Perfect for new developers to explore and create with Ethereum in a fun, hands-on way.",
              },
              {
                title: "Ready for More",
                desc: "Start on Sepolia, then take your project to bigger networks with ease!",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-6 rounded-md hover:shadow-md hover:scale-105 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-pink-500 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md hover:bg-gradient-to-l hover:scale-105 transition-all duration-300 shadow-xs"
          >
            Get Started
          </button>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
