export function renderRegister(root: HTMLElement) {
  root.innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-white">
      <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h1 class="text-2xl font-bold text-center mb-6 text-green-600">Регистрация</h1>
        <form id="registerForm" class="space-y-4">
          <input name="first_name" type="text" placeholder="Имя" class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" required />
          <input name="last_name" type="text" placeholder="Фамилия" class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" required />
          <input name="email" type="email" placeholder="Email" class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" required />
          <input name="password" type="password" placeholder="Пароль" class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" required />
          <button type="submit" class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">Зарегистрироваться</button>
        </form>
        <p class="mt-4 text-sm text-center">
          Уже есть аккаунт?
          <a href="/" class="text-green-500 hover:underline">Войти</a>
        </p>
      </div>
    </div>
  `;

  const form = document.getElementById("registerForm") as HTMLFormElement;
  form.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const body = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("http://localhost:4449/api/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        alert("Вы прошли успешную регистрацию, проверьте почту на OTP");
        setTimeout(() => {
          window.history.pushState({}, "", "/otp");
          window.dispatchEvent(new Event("popstate"));
        }, 1500);
      } else {
        alert("Ошибка регистрации");
      }
    } catch {
      alert("Ошибка сервера");
    }
  };
}
