import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

const Terms = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <BackButton />
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-space-grotesk mb-4">
              Điều Khoản <span className="gradient-text">Dịch Vụ</span>
            </h1>
            <p className="text-muted-foreground">
              Cập nhật lần cuối: Tháng 1, 2026
            </p>
          </div>

          <div className="glass rounded-2xl p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Giới Thiệu</h2>
              <p className="text-muted-foreground leading-relaxed">
                Chào mừng bạn đến với AniWatch. Bằng việc truy cập và sử dụng trang web của chúng tôi, 
                bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu trong tài liệu này. Vui lòng 
                đọc kỹ trước khi sử dụng dịch vụ.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Định Nghĩa</h2>
              <ul className="text-muted-foreground leading-relaxed list-disc list-inside space-y-2">
                <li><strong>"Dịch vụ"</strong> đề cập đến nền tảng AniWatch và tất cả các tính năng liên quan.</li>
                <li><strong>"Người dùng"</strong> là bất kỳ cá nhân nào truy cập hoặc sử dụng Dịch vụ.</li>
                <li><strong>"Nội dung"</strong> bao gồm tất cả video, hình ảnh, văn bản và tài liệu khác.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Quyền Sử Dụng</h2>
              <p className="text-muted-foreground leading-relaxed">
                AniWatch cấp cho bạn quyền sử dụng cá nhân, không độc quyền, không thể chuyển nhượng 
                để truy cập và xem nội dung trên nền tảng. Bạn không được phép:
              </p>
              <ul className="text-muted-foreground leading-relaxed list-disc list-inside space-y-2 mt-4">
                <li>Sao chép, phân phối hoặc sửa đổi nội dung mà không có sự cho phép.</li>
                <li>Sử dụng dịch vụ cho mục đích thương mại.</li>
                <li>Cố gắng truy cập trái phép vào hệ thống.</li>
                <li>Chia sẻ tài khoản với người khác.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Tài Khoản Người Dùng</h2>
              <p className="text-muted-foreground leading-relaxed">
                Khi tạo tài khoản, bạn có trách nhiệm duy trì tính bảo mật của thông tin đăng nhập. 
                Bạn phải thông báo ngay cho chúng tôi nếu phát hiện bất kỳ truy cập trái phép nào 
                vào tài khoản của mình.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Nội Dung Người Dùng</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bạn có thể đăng bình luận và đánh giá trên nền tảng. Bạn chịu trách nhiệm về nội dung 
                mà bạn đăng và đảm bảo rằng nó không vi phạm quyền của bên thứ ba hoặc các quy định 
                pháp luật hiện hành.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Giới Hạn Trách Nhiệm</h2>
              <p className="text-muted-foreground leading-relaxed">
                AniWatch không chịu trách nhiệm về bất kỳ thiệt hại trực tiếp, gián tiếp hoặc ngẫu 
                nhiên nào phát sinh từ việc sử dụng dịch vụ. Dịch vụ được cung cấp "như hiện có" 
                mà không có bất kỳ bảo đảm nào.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Thay Đổi Điều Khoản</h2>
              <p className="text-muted-foreground leading-relaxed">
                Chúng tôi có quyền cập nhật các điều khoản này bất cứ lúc nào. Việc tiếp tục sử dụng 
                dịch vụ sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Liên Hệ</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ với chúng tôi 
                qua email: <span className="text-primary">legal@aniwatch.com</span>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Terms;