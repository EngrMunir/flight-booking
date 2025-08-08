const Footer = () => {
  return (
    <footer className="bg-[#05203c] text-white px-6 py-10 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Left: Location & Currency */}
        <div>
          <div className="bg-[#1e3750] rounded-md px-4 py-2 inline-block text-sm font-medium">
            Bangladesh · English (UK) · BDT BDT
          </div>
        </div>

        {/* Center: Links */}
        <div className="flex flex-wrap gap-x-16 gap-y-6 text-white/80">
          <div className="space-y-2">
            <p className="font-semibold text-white">Help</p>
            <p className="hover:text-white cursor-pointer">Privacy Settings</p>
            <p className="hover:text-white cursor-pointer">Log in</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Cookie policy</p>
            <p className="hover:text-white cursor-pointer">Privacy policy</p>
            <p className="hover:text-white cursor-pointer">Terms of service</p>
            <p className="hover:text-white cursor-pointer">Company Details</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Explore</p>
            <p className="hover:text-white cursor-pointer">▼</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Company</p>
            <p className="hover:text-white cursor-pointer">▼</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Partners</p>
            <p className="hover:text-white cursor-pointer">▼</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Trips</p>
            <p className="hover:text-white cursor-pointer">▼</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-10 text-white/60">
        © Skyscanner Ltd 2002 – 2025
      </div>
    </footer>
  );
};

export default Footer;
