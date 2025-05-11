const Footer: React.FC = () => {
  return (
    <footer className="bg-black/80 py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>
          Built with <span className="text-pink-500">♥</span> by{" "}
          <a
            href="https://x.ai"
            className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
          >
            Shorya Baj, Kanak Poddar, Rahul Sahani, Tanvi Sharma
          </a>
        </p>
        <p className="mt-2">
          <a
            href="https://sepolia.etherscan.io/address/0xa5d16D02bfF5e2b3d944B2a654fe6e31920F7BCe"
            className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
          >
            View Contract on Etherscan
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
