let scrollPosition = 0;

export const lockScroll = () => {
  // Сохраняем текущую позицию прокрутки
  const scrollContainer = document.querySelector('.main-scroll-container') as HTMLElement;
  if (scrollContainer) {
    scrollPosition = scrollContainer.scrollTop;
  }
  
  // Для Safari на iOS используем другой подход
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isSafari && isIOS) {
    // В Safari на iOS блокируем прокрутку основного контейнера
    if (scrollContainer) {
      scrollContainer.style.overflow = 'hidden';
      scrollContainer.style.height = '100%';
      // Не используем position: fixed для предотвращения проблем с модальными окнами
      scrollContainer.style.touchAction = 'none';
    }
  } else {
    // В других браузерах используем стандартный подход
    document.body.style.overflow = 'hidden';
  }
};

export const unlockScroll = () => {
  const scrollContainer = document.querySelector('.main-scroll-container') as HTMLElement;
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isSafari && isIOS) {
    // Восстанавливаем прокрутку в Safari на iOS
    if (scrollContainer) {
      scrollContainer.style.overflow = '';
      scrollContainer.style.height = '';
      scrollContainer.style.touchAction = '';
      // Восстанавливаем позицию прокрутки
      setTimeout(() => {
        scrollContainer.scrollTop = scrollPosition;
      }, 0);
    }
  } else {
    // В других браузерах восстанавливаем стандартным способом
    document.body.style.overflow = '';
  }
}; 