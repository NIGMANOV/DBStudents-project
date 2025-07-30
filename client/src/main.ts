import './style.css'
import { renderRoute } from './app/router';

window.addEventListener('DOMContentLoaded', () => {
  renderRoute();
});

window.addEventListener('popstate', () => {
  renderRoute();
});
