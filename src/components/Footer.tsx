import { Github, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    browse: ["Popular", "New Releases", "Genres", "Random"],
    help: ["FAQ", "Contact", "Terms of Service", "Privacy Policy"],
    community: ["Discord", "Forums", "Blog", "Merchandise"],
  };

  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <span className="text-2xl font-bold font-space-grotesk gradient-text">
              AniWatch
            </span>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Your ultimate destination for streaming the best anime from around the world. 
              Discover, watch, and share your favorite series.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Browse */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Browse</h4>
            <ul className="space-y-3">
              {footerLinks.browse.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Help</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Community</h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 AniWatch. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Made with ❤️ for anime fans
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
