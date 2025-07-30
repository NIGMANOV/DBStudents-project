export function renderLogin(root: HTMLElement) {
  root.innerHTML = `
      <div class="min-h-screen flex items-center justify-center bg-white px-4">
        <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
          <h1 class="text-3xl font-extrabold text-center mb-6 text-blue-600">Вход</h1>
          <form id="loginForm" class="space-y-4">
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              required 
            />
            <input 
              name="password" 
              type="password" 
              placeholder="Пароль" 
              class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              required 
            />
            <button 
              type="submit" 
              class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Войти
            </button>
          </form>
          <p class="mt-4 text-sm text-center text-gray-600">
            Нет аккаунта?
            <a href="/register" class="text-blue-500 font-medium hover:underline">Зарегистрируйтесь</a>
          </p>
        </div>
      </div>
    `;

  const form = document.getElementById("loginForm") as HTMLFormElement;
  form.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const body = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("http://localhost:4449/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        // Здесь можно сохранить токен, если сервер его возвращает
        // const { token } = await res.json();
        // localStorage.setItem("token", token);

        window.history.pushState({}, "", "/home");
        window.dispatchEvent(new Event("popstate"));
      } else {
        const err = await res.json();
        alert(err.message || "Неверные данные");
      }
    } catch (error) {
      alert("Ошибка подключения к серверу");
    }
  };
}
