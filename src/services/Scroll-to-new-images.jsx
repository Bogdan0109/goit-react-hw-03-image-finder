export default function scrollToNewImages(prevPageHight) {
  return window.scrollTo({
    top: prevPageHight - 120,
    left: 0,
    behavior: 'smooth',
  });
}
