// src/utils/imagePreloader.ts

type ImagePriority = 'critical' | 'normal' | 'lazy';

interface ImageConfig {
  src: string;
  priority: ImagePriority;
}

// Список изображений с приоритетами
const IMAGES_TO_PRELOAD: ImageConfig[] = [
  { src: '/images/heart.jpg', priority: 'critical' },
  { src: '/images/ilove.webp', priority: 'critical' },
  { src: '/images/telepuziki3.jpg', priority: 'critical' },
  { src: '/images/wedding.jpg', priority: 'critical' },
  { src: '/images/jenya.jpg', priority: 'critical' },
  { src: '/images/lilya.jpg', priority: 'critical' },
  { src: '/images/arrow.jpg', priority: 'critical' },
  { src: '/images/arrowcircle.jpg', priority: 'critical' },
  
  { src: '/images/calendar.jpg', priority: 'normal' },
  { src: '/images/kul.jpg', priority: 'normal' },
  { src: '/images/love.jpg', priority: 'normal' },
  { src: '/images/ring.jpg', priority: 'normal' },
  
  // 🟢 Декоративные/нижние секции — грузим в конце
  { src: '/images/disco.jpg', priority: 'lazy' },
  { src: '/images/moon.jpg', priority: 'lazy' },
  { src: '/images/iris.jpg', priority: 'lazy' },
  { src: '/images/photo.jpg', priority: 'lazy' },
  { src: '/images/heartarrow.jpg', priority: 'lazy' },
  { src: '/images/hearts.jpg', priority: 'lazy' },
];

interface PreloadResult {
  loaded: string[];
  failed: string[];
}

/**
 * Загрузка одного изображения
 */
function preloadSingleImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed: ${src}`));
    img.src = src;
  });
}

/**
 * Загрузка с ограничением параллелизма
 */
async function preloadWithConcurrency(
  images: ImageConfig[],
  concurrency: number
): Promise<PreloadResult> {
  const loaded: string[] = [];
  const failed: string[] = [];
  
  // Функция для обработки очереди с лимитом параллельных задач
  async function processBatch(batch: ImageConfig[]): Promise<void> {
    const results = await Promise.allSettled(
      batch.map(config => preloadSingleImage(config.src))
    );
    
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        loaded.push(result.value);
      } else {
        failed.push(batch[index].src);
      }
    });
  }
  
  // Разбиваем на пачки по `concurrency` штук
  for (let i = 0; i < images.length; i += concurrency) {
    const batch = images.slice(i, i + concurrency);
    await processBatch(batch);
  }
  
  return { loaded, failed };
}

/**
 * Основная функция предзагрузки
 */
export async function preloadImages(): Promise<PreloadResult> {
  // Сортируем: critical → normal → lazy
  const sorted = [...IMAGES_TO_PRELOAD].sort((a, b) => {
    const priority: Record<ImagePriority, number> = { 
      critical: 0, 
      normal: 1, 
      lazy: 2 
    };
    return priority[a.priority] - priority[b.priority];
  });

  // Грузим по 4 картинки за раз
  return preloadWithConcurrency(sorted, 4);
}

/**
 * Проверка, загружено ли изображение
 */
export function isImageLoaded(imagePath: string): boolean {
  const img = document.querySelector(`img[src="${imagePath}"]`) as HTMLImageElement | null;
  if (img?.complete && img.naturalHeight !== 0) return true;
  
  const cached = new Image();
  cached.src = imagePath;
  return cached.complete && cached.naturalHeight !== 0;
}

/**
 * Получение всех путей изображений
 */
export function getAllImagePaths(): string[] {
  return IMAGES_TO_PRELOAD.map(img => img.src);
}

/**
 * Ленивая загрузка отдельного изображения (по требованию)
 */
export function preloadLazyImage(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}