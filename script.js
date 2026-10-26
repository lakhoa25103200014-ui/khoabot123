
const VERIFY_API =
  "https://turnstile-backend.onrender.com/verify";

// Thay URL này bằng trang đích bạn muốn mở.
const REDIRECT_URL = "https://t.me/Bottaogoogle_bot";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#captcha-form");
  const status = document.querySelector("#captcha-status");

  if (!form) {
    console.error("Không tìm thấy form #captcha-form.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const token = form.querySelector(
      '[name="cf-turnstile-response"]'
    )?.value;

    if (!token) {
      if (status) {
        status.textContent = "Vui lòng hoàn thành CAPTCHA.";
      }
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    if (status) status.textContent = "Đang xác minh...";

    try {
      const response = await fetch(VERIFY_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });

      const result = await response.json();

      if (response.ok && result.success === true) {
        if (status) {
          status.textContent =
            "Xác minh thành công. Đang chuyển hướng...";
        }

        window.location.assign(REDIRECT_URL);
      } else {
        if (status) {
          status.textContent =
            "Xác minh thất bại. Vui lòng thử lại.";
        }

        if (window.turnstile) {
          window.turnstile.reset();
        }
      }
    } catch (error) {
      console.error("Lỗi kết nối backend:", error);

      if (status) {
        status.textContent =
          "Không kết nối được máy chủ xác minh.";
      }
    } finally {
      if (button) button.disabled = false;
    }
  });
});
