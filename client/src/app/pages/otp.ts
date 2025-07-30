export function renderOtp(root: HTMLElement) {
  root.innerHTML = `
    <div class="min-h-screen flex items-center justify-center  bg-white">
      <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h1 class="text-2xl font-bold text-center mb-6 text-yellow-600">Введите код OTP</h1>
        <form id="otpForm" class="space-y-4">
          <input name="email" type="email" placeholder="Email" class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
          <input name="otp" type="text" placeholder="OTP код" class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
          <button type="submit" class="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition">Подтвердить</button>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById("otpForm") as HTMLFormElement;
  form.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const body = {
      email: formData.get("email"),
      otp: formData.get("otp"),
    };

    try {
      const res = await fetch("http://localhost:4449/api/user/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        window.history.pushState({}, "", "/home");
        window.dispatchEvent(new Event("popstate"));
      } else {
        alert("Неверный код OTP");
      }
    } catch {
      alert("Ошибка подключения к серверу");
    }
  };
}
