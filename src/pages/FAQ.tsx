import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "AniWatch là gì?",
      answer: "AniWatch là nền tảng xem anime trực tuyến miễn phí với chất lượng cao nhất. Chúng tôi cung cấp hàng ngàn bộ anime từ các thể loại khác nhau, cập nhật liên tục các tập mới nhất."
    },
    {
      question: "Tôi có cần đăng ký tài khoản không?",
      answer: "Bạn có thể xem anime mà không cần đăng ký. Tuy nhiên, việc tạo tài khoản miễn phí sẽ cho phép bạn lưu danh sách anime yêu thích, theo dõi tiến độ xem và nhận đề xuất phù hợp."
    },
    {
      question: "Làm thế nào để thêm anime vào danh sách của tôi?",
      answer: "Nhấn vào nút 'Thêm Vào Danh Sách' trên trang chi tiết anime hoặc trực tiếp trên thẻ anime. Bạn cần đăng nhập để sử dụng tính năng này."
    },
    {
      question: "Video không phát được, tôi phải làm sao?",
      answer: "Hãy thử làm mới trang, kiểm tra kết nối internet của bạn, hoặc thử đổi trình duyệt khác. Nếu vấn đề vẫn tiếp diễn, vui lòng liên hệ với chúng tôi qua trang Liên Hệ."
    },
    {
      question: "Tôi có thể yêu cầu thêm anime mới không?",
      answer: "Chắc chắn rồi! Bạn có thể gửi yêu cầu qua trang Liên Hệ hoặc tham gia cộng đồng Discord của chúng tôi để đề xuất anime bạn muốn xem."
    },
    {
      question: "Chất lượng video có những tùy chọn nào?",
      answer: "Chúng tôi cung cấp nhiều tùy chọn chất lượng từ 480p đến 1080p. Bạn có thể thay đổi chất lượng video trong phần cài đặt của trình phát video."
    },
    {
      question: "Phụ đề có những ngôn ngữ nào?",
      answer: "Hiện tại chúng tôi hỗ trợ phụ đề tiếng Việt và tiếng Anh cho hầu hết các anime. Một số anime còn có thêm phụ đề tiếng Nhật (romaji)."
    },
    {
      question: "Tôi có thể tải anime về máy không?",
      answer: "Hiện tại tính năng tải về chưa được hỗ trợ do các quy định về bản quyền. Tuy nhiên, bạn có thể xem offline bằng cách sử dụng tính năng lưu trang trên trình duyệt di động."
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-space-grotesk mb-4">
              Câu Hỏi <span className="gradient-text">Thường Gặp</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Tìm câu trả lời cho những thắc mắc phổ biến về AniWatch
            </p>
          </div>

          <div className="glass rounded-2xl p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-12 text-center glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-2">Không tìm thấy câu trả lời?</h3>
            <p className="text-muted-foreground mb-4">
              Liên hệ với đội ngũ hỗ trợ của chúng tôi để được giúp đỡ
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Liên Hệ Ngay
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default FAQ;