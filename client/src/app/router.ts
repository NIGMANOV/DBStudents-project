import { renderLogin } from "./pages/login";
import { renderRegister } from "./pages/register";
import { renderOtp } from "./pages/otp";
import { renderHome } from "./pages/home";

export function renderRoute() {
  const root = document.getElementById("app");
  if (!root) return;

  const path = window.location.pathname;

  switch (path) {
    case "/":
      renderLogin(root);
      break;
    case "/register":
      renderRegister(root);
      break;
    case "/otp":
      renderOtp(root);
      break;
    case "/home":
      renderHome(root);
      break;
    default:
      root.innerHTML =
        '<h1 class="text-center text-red-600 text-2xl">Страница не найдена</h1>';
  }
}
