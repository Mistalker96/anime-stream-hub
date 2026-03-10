import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, MapPin, Lock, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Profile {
  display_name: string | null;
  address: string | null;
  avatar_url: string | null;
}

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    display_name: "",
    address: "",
    avatar_url: "",
  });

  // Password change state
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("display_name, address, avatar_url")
      .eq("user_id", user?.id)
      .single();

    if (!error && data) {
      setProfile({
        display_name: data.display_name || "",
        address: data.address || "",
        avatar_url: data.avatar_url || "",
      });
    }
    setLoading(false);
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({
        user_id: user.id,
        display_name: profile.display_name,
        address: profile.address,
        avatar_url: profile.avatar_url,
      }, { onConflict: "user_id" });

    if (error) {
      toast({
        title: "Lỗi",
        description: "Không thể lưu hồ sơ. Vui lòng thử lại.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Thành Công",
        description: "Hồ sơ đã được cập nhật!",
      });
    }
    setSaving(false);
  };

  const handlePasswordChange = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu không khớp.",
        variant: "destructive",
      });
      return;
    }

    if (passwords.newPassword.length < 6) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu phải có ít nhất 6 ký tự.",
        variant: "destructive",
      });
      return;
    }

    setChangingPassword(true);
    const { error } = await supabase.auth.updateUser({
      password: passwords.newPassword,
    });

    if (error) {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Thành Công",
        description: "Mật khẩu đã được cập nhật!",
      });
      setPasswords({ newPassword: "", confirmPassword: "" });
    }
    setChangingPassword(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 container mx-auto px-4">
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">Đăng nhập để truy cập cài đặt</p>
            <Button variant="hero" onClick={() => navigate("/auth")}>
              Đăng Nhập
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16 container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold font-space-grotesk">
            Cài Đặt <span className="gradient-text">Hồ Sơ</span>
          </h1>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-pulse text-primary text-xl">Đang tải...</div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Profile Info Section */}
            <div className="glass rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Thông Tin Hồ Sơ
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user.email || ""}
                    disabled
                    className="bg-muted/50"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email không thể thay đổi
                  </p>
                </div>
                <div>
                  <Label htmlFor="displayName">Tên Hiển Thị</Label>
                  <Input
                    id="displayName"
                    value={profile.display_name || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, display_name: e.target.value })
                    }
                    placeholder="Nhập tên hiển thị của bạn"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Địa Chỉ
                  </Label>
                  <Input
                    id="address"
                    value={profile.address || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                    placeholder="Nhập địa chỉ của bạn"
                  />
                </div>
                <Button
                  variant="hero"
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="w-full"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Lưu Hồ Sơ
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Password Change Section */}
            <div className="glass rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Đổi Mật Khẩu
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="newPassword">Mật Khẩu Mới</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPasswords({ ...passwords, newPassword: e.target.value })
                    }
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Xác Nhận Mật Khẩu</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Xác nhận mật khẩu mới"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={handlePasswordChange}
                  disabled={
                    changingPassword ||
                    !passwords.newPassword ||
                    !passwords.confirmPassword
                  }
                  className="w-full"
                >
                  {changingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang cập nhật...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Cập Nhật Mật Khẩu
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfileSettings;
