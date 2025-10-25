interface ImageCardProps {
  src: string;
  alt: string;
  title: string;
  description?: string;
  caption?: string;
  city?: string;
  category?: string;
  priority?: boolean;
  sizes?: string;
}

export function ImageCard({ 
  src, 
  alt, 
  title, 
  description, 
  caption,
  city,
  category,
  priority = false,
  sizes = "100vw"
}: ImageCardProps) {
  return (
    <figure 
      className="my-8 bg-white rounded-lg shadow-lg overflow-hidden"
      itemScope
      itemType="https://schema.org/ImageObject"
    >
      <div className="relative">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover"
          loading={priority ? "eager" : "lazy"}
          sizes={sizes}
          itemProp="contentUrl"
        />
        
        {/* Overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 
          className="text-lg font-semibold text-gray-900 mb-2"
          itemProp="name"
        >
          {title}
        </h3>
        
        {description && (
          <p 
            className="text-gray-700 text-sm leading-relaxed mb-3"
            itemProp="description"
          >
            {description}
          </p>
        )}
        
        {(city || category) && (
          <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3">
            {city && (
              <span className="flex items-center">
                📍 <span className="ml-1">{city}</span>
              </span>
            )}
            {category && (
              <span className="flex items-center">
                🏷️ <span className="ml-1">{category}</span>
              </span>
            )}
          </div>
        )}
        
        {caption && (
          <figcaption 
            className="text-xs text-gray-600 italic border-t pt-3"
            itemProp="caption"
          >
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

// Gallery component for multiple related images
export function ImageGallery({ 
  title, 
  images,
  columns = 2 
}: {
  title: string;
  images: Array<{
    src: string;
    alt: string;
    title: string;
    description?: string;
  }>;
  columns?: 2 | 3 | 4;
}) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div 
      className="my-8"
      itemScope
      itemType="https://schema.org/ImageGallery"
    >
      <h3 
        className="text-xl font-bold text-gray-900 mb-6"
        itemProp="name"
      >
        🖼️ {title}
      </h3>
      
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {images.map((image, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            itemScope
            itemType="https://schema.org/ImageObject"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-48 object-cover"
              loading="lazy"
              itemProp="contentUrl"
            />
            <div className="p-4">
              <h4 
                className="font-semibold text-gray-900 text-sm mb-1"
                itemProp="name"
              >
                {image.title}
              </h4>
              {image.description && (
                <p 
                  className="text-gray-600 text-xs"
                  itemProp="description"
                >
                  {image.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Before/After comparison component
export function BeforeAfterImage({
  beforeSrc,
  afterSrc,
  title,
  description,
  city,
  category
}: {
  beforeSrc: string;
  afterSrc: string;
  title: string;
  description?: string;
  city?: string;
  category?: string;
}) {
  return (
    <div 
      className="my-8 bg-white rounded-lg shadow-lg overflow-hidden"
      itemScope
      itemType="https://schema.org/ImageObject"
    >
      <div className="p-6 border-b">
        <h3 
          className="text-lg font-semibold text-gray-900 mb-2"
          itemProp="name"
        >
          🔄 {title}
        </h3>
        {description && (
          <p 
            className="text-gray-700 text-sm"
            itemProp="description"
          >
            {description}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative">
          <img
            src={beforeSrc}
            alt="Before"
            className="w-full h-64 object-cover"
            loading="lazy"
          />
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Before
          </div>
        </div>
        
        <div className="relative">
          <img
            src={afterSrc}
            alt="After"
            className="w-full h-64 object-cover"
            loading="lazy"
          />
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            After
          </div>
        </div>
      </div>
      
      {(city || category) && (
        <div className="p-4 bg-gray-50 flex items-center space-x-3 text-xs text-gray-500">
          {city && (
            <span className="flex items-center">
              📍 <span className="ml-1">{city}</span>
            </span>
          )}
          {category && (
            <span className="flex items-center">
              🏷️ <span className="ml-1">{category}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}