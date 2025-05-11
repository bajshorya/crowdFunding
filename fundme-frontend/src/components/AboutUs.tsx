// src/components/AboutUs.tsx
import { useNavigate } from "react-router-dom";
import ProjectSupport from "../assets/Support.png";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen font-mono">
      <main className="container mx-auto px-4 py-12 pt-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse mb-4">
            Discover CrowdFund
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A fun and secure way to support projects you love, from community
            ideas to creative dreams, all powered by Ethereum!
          </p>
        </section>

        {/* Utility Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-purple-400 mb-8">
            Why Choose CrowdFund?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Support Projects Directly",
                desc: "Send ETH straight to projects you care about with no middleman. Every contribution is safe and recorded openly!",
                image: ProjectSupport,
              },
              {
                title: "Safe Fund Management",
                desc: "Only the project owner can access the funds, ensuring your support goes exactly where it’s meant to.",
                image: "Safe Fund Image",
              },
              {
                title: "See Who’s Helping",
                desc: "Check out every supporter and their contributions in real-time, updated every 10 seconds for full transparency.",
                image: "Transparency Image",
              },
              {
                title: "Secure and Reliable",
                desc: "Our platform uses smart technology to keep your contributions safe and ensure every project meets funding goals.",
                image: "Security Image",
              },
              {
                title: "Try Without Risk",
                desc: "Test your ideas on the Sepolia network—a safe space to explore crowdfunding without spending real money.",
                image: "Testnet Image",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-6 rounded-lg border border-pink-500/50 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                {typeof item.image === "string" ? (
                  <div className="w-[300px] h-[300px] bg-gray-700 mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 text-center">
                    Replace with {item.image} (300x300px)
                  </div>
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-[300px] h-[300px] mx-auto mb-4 object-cover rounded-lg"
                  />
                )}
                <h3 className="text-xl font-semibold text-pink-400 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Where It Can Be Used Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-purple-400 mb-8">
            Where Your Support Makes a Difference
          </h2>
          <div className="space-y-12">
            {[
              {
                title: "Community Projects",
                desc: "Help build parks, libraries, or community centers. Every contribution brings your neighborhood together!",
                image: "Community Project Image",
                imageRight: false,
              },
              {
                title: "Creative Ventures",
                desc: "Support artists, musicians, or filmmakers to create albums, films, or art that inspires the world.",
                image: "Creative Venture Image",
                imageRight: true,
              },
              {
                title: "Charities & Causes",
                desc: "Donate to disaster relief, education, or health initiatives, knowing your support reaches those in need.",
                image: "Charity Image",
                imageRight: false,
              },
              {
                title: "Startup Ideas",
                desc: "Back new products or services and help entrepreneurs test their big ideas in a safe environment.",
                image: null,
                imageRight: false,
              },
              {
                title: "Learning & Education",
                desc: "Explore blockchain by funding projects, perfect for students and developers eager to learn.",
                image: null,
                imageRight: false,
              },
              {
                title: "Hackathons & Experiments",
                desc: "Join the fun of testing new funding ideas or showcasing cool blockchain projects at hackathons.",
                image: null,
                imageRight: false,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  item.image ? "md:flex-row" : ""
                } items-center gap-8 ${
                  item.imageRight ? "md:flex-row-reverse" : ""
                }`}
              >
                {item.image && (
                  <div className="w-[400px] h-[250px] bg-gray-700 flex items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 text-center">
                    Replace with {item.image} (400x250px)
                  </div>
                )}
                <div className="flex-1 bg-gray-800/50 p-6 rounded-lg border border-purple-500/50 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-semibold text-pink-400 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It’s Useful Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-purple-400 mb-8">
            What Makes CrowdFund Special
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-pink-400 mb-2">
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
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:bg-gradient-to-l hover:scale-105 transition-all duration-300"
          >
            Get Started Now
          </button>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
