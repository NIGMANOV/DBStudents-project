export function renderHome(root: HTMLElement) {
    root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 text-center px-4">
        <div class="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
          <h1 class="text-3xl font-bold text-purple-700 mb-4">Добро пожаловать!</h1>
          <p class="text-gray-700 mb-6">Вы успешно вошли в систему 🎉</p>
          <button id="logout" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">Выйти</button>
        </div>
      </div>
    `;
  
    const logout = document.getElementById('logout');
    logout?.addEventListener('click', () => {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new Event('popstate'));
    });
  }
  