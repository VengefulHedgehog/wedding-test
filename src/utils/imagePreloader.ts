// src/utils/imagePreloader.ts

// Список всех изображений, которые нужно предзагрузить
const IMAGES_TO_PRELOAD = [
  '/images/ilove.webp',
  '/images/telepuziki3.jpg',
  '/images/wedding.jpg',
  '/images/jenya.jpg',
  '/images/lilya.jpg',
  '/images/calendar.jpg',
  '/images/love.jpg',
  '/images/ring.jpg',
  '/images/disco.jpg',
  '/images/moon.jpg',
  '/images/iris.jpg',
  '/images/photo.jpg',
  '/images/telepuziki.jpg',
  '/images/telepuziki2.jpg',
  '/images/arrow.jpg',
  '/images/arrowcircle.jpg',
  '/images/heart.jpg',
  '/images/heartarrow.jpg',
  '/images/hearts.jpg'
];

interface PreloadResult {
  loaded: string[];
  failed: string[];
}

/**
 * Предзагрузка изображений
 * @returns Promise с результатами загрузки
 */
export async function preloadImages(): Promise<PreloadResult> {
  const loaded: string[] = [];
  const failed: string[] = [];

  const preloadPromises = IMAGES_TO_PRELOAD.map(imagePath => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        loaded.push(imagePath);
        resolve();
      };
      
      img.onerror = () => {
        failed.push(imagePath);
        reject(new Error(`Failed to load image: ${imagePath}`));
      };
      
      img.src = imagePath;
    });
  });

  try {
    await Promise.allSettled(preloadPromises);
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }

  return { loaded, failed };
}

/**
 * Проверка, загружено ли изображение
 * @param imagePath Путь к изображению
 * @returns boolean
 */
export function isImageLoaded(imagePath: string): boolean {
  const img = new Image();
  img.src = imagePath;
  return img.complete && img.naturalHeight !== 0;
}

/**
 * Получение всех путей изображений
 * @returns string[]
 */
export function getAllImagePaths(): string[] {
  return [...IMAGES_TO_PRELOAD];
}