const requireAll = (requireContext) => requireContext.keys().forEach(requireContext);
try {
  requireAll(require.context("../icons", true, /\.svg$/));
} catch (error) {
  console.error("Ошибка при импорте SVG иконок:", error);
}