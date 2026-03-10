import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-space-grotesk mb-4">
              Chính Sách <span className="gradient-text">Bảo Mật</span>
            </h1>
            <p className="text-muted-foreground">
              Cập nhật lần cuối: Tháng 1, 2026
            </p>
          </div>

          <div className="glass rounded-2xl p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Thông Tin Chúng Tôi Thu Thập</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Chúng tôi thu thập các loại thông tin sau để cung cấp dịch vụ tốt hơn cho bạn:
              </p>
              <ul className="text-muted-foreground leading-relaxed list-disc list-inside space-y-2">
                <li><strong>Thông tin tài khoản:</strong> Email, tên hiển thị, ảnh đại diện.</li>
                <li><strong>Dữ liệu sử dụng:</strong> Lịch sử xem, danh sách yêu thích, đánh giá.</li>
                <li><strong>Thông tin kỹ thuật:</strong> Địa chỉ IP, loại trình duyệt, thiết bị.</li>
                <li><strong>Cookies:</strong> Để cải thiện trải nghiệm người dùng.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Cách Chúng Tôi Sử Dụng Thông Tin</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Thông tin của bạn được sử dụng để:
              </p>
              <ul className="text-muted-foreground leading-relaxed list-disc list-inside space-y-2">
                <li>Cung cấp và cải thiện dịch vụ.</li>
                <li>Cá nhân hóa nội dung và đề xuất anime.</li>
                <li>Gửi thông báo về tập mới và cập nhật.</li>
                <li>Phân tích xu hướng sử dụng để tối ưu hóa nền tảng.</li>
                <li>Bảo vệ an ninh và ngăn chặn gian lận.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Chia Sẻ Thông Tin</h2>
              <p className="text-muted-foreground leading-relaxed">
                Chúng tôi <strong>không bán</strong> thông tin cá nhân của bạn. Thông tin chỉ được 
                chia sẻ trong các trường hợp sau:
              </p>
              <ul className="text-muted-foreground leading-relaxed list-disc list-inside space-y-2 mt-4">
                <li>Với sự đồng ý của bạn.</li>
                <li>Để tuân thủ yêu cầu pháp lý.</li>
                <li>Với các nhà cung cấp dịch vụ đáng tin cậy giúp vận hành nền tảng.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Bảo Mật Dữ Liệu</h2>
              <p className="text-muted-foreground leading-relaxed">
                Chúng tôi áp dụng các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ thông tin của bạn, 
                bao gồm mã hóa SSL, xác thực hai yếu tố và giám sát hệ thống 24/7. Tuy nhiên, không 
                có phương thức truyền tải qua internet nào là hoàn toàn an toàn 100%.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Quyền Của Bạn</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Bạn có các quyền sau đối với dữ liệu cá nhân của mình:
              </p>
              <ul className="text-muted-foreground leading-relaxed list-disc list-inside space-y-2">
                <li><strong>Quyền truy cập:</strong> Xem thông tin chúng tôi lưu trữ về bạn.</li>
                <li><strong>Quyền sửa đổi:</strong> Cập nhật thông tin không chính xác.</li>
                <li><strong>Quyền xóa:</strong> Yêu cầu xóa dữ liệu của bạn.</li>
                <li><strong>Quyền di chuyển:</strong> Nhận bản sao dữ liệu của bạn.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Chúng tôi sử dụng cookies để ghi nhớ tùy chọn của bạn, duy trì phiên đăng nhập và 
                phân tích lưu lượng truy cập. Bạn có thể quản lý cookies thông qua cài đặt trình duyệt, 
                nhưng điều này có thể ảnh hưởng đến một số tính năng của trang web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Trẻ Em</h2>
              <p className="text-muted-foreground leading-relaxed">
                Dịch vụ của chúng tôi không dành cho trẻ em dưới 13 tuổi. Chúng tôi không cố ý 
                thu thập thông tin từ trẻ em. Nếu bạn phát hiện con bạn đã cung cấp thông tin, 
                vui lòng liên hệ với chúng tôi ngay.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Thay Đổi Chính Sách</h2>
              <p className="text-muted-foreground leading-relaxed">
                Chúng tôi có thể cập nhật chính sách bảo mật này định kỳ. Mọi thay đổi quan trọng 
                sẽ được thông báo qua email hoặc thông báo trên trang web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Liên Hệ</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nếu bạn có câu hỏi về chính sách bảo mật này, vui lòng liên hệ: 
                <span className="text-primary ml-1">privacy@aniwatch.com</span>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Privacy;