import { Github, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    browse: ["Phổ Biến", "Mới Phát Hành", "Thể Loại", "Ngẫu Nhiên"],
    help: ["Câu Hỏi Thường Gặp", "Liên Hệ", "Điều Khoản Dịch Vụ", "Chính Sách Bảo Mật"],
    community: ["Discord", "Diễn Đàn", "Blog", "Hàng Hóa"],
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
              Điểm đến tuyệt vời nhất để xem những bộ anime hay nhất từ khắp nơi trên thế giới. 
              Khám phá, xem và chia sẻ những bộ phim yêu thích của bạn.
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

          <div>
            <h4 className="font-semibold text-foreground mb-4">Duyệt Xem</h4>
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

          <div>
            <h4 className="font-semibold text-foreground mb-4">Hỗ Trợ</h4>
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

          <div>
            <h4 className="font-semibold text-foreground mb-4">Cộng Đồng</h4>
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
            © 2024 AniWatch. Bảo lưu mọi quyền.
          </p>
          <p className="text-muted-foreground text-sm">
            Được tạo với ❤️ dành cho người hâm mộ anime
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
