(function () {
  var key = "theme";
  var stored = localStorage.getItem(key);
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var dark = stored === "dark" || (stored !== "light" && prefersDark);
  if (dark) document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
})();
