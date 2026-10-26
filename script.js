
const VERIFY_API = "https://turnstile-backend.onrender.com/verify";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#captcha-form");
  const status = document.querySelector("#captcha-status");

  if (!form) {
    console.warn("Chưa tìm thấy form #captcha-form trong index.html");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const tokenField = form.querySelector(
      '[name="cf-turnstile-response"]'
    );
    const token = tokenField?.value;

    if (!token) {
      if (status) {
        status.textContent = "Vui lòng hoàn thành CAPTCHA.";
      }
      return;
    }

    if (status) status.textContent = "Đang xác minh...";

    try {
      const response = await fetch(VERIFY_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      });

      const result = await response.json();

      if (!response.ok || result.success !== true) {
        if (status) {
          status.textContent =
            "Xác minh thất bại. Vui lòng thử lại.";
        }
        return;
      }

      if (status) {
        status.textContent = "Xác minh thành công!";
      }
    } catch (error) {
      console.error("Lỗi xác minh CAPTCHA:", error);

      if (status) {
        status.textContent =
          "Không kết nối được máy chủ. Vui lòng thử lại.";
      }
    }
  });
});
