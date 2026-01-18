import Image from "next/image";

// Dummy data for gallery images
const galleryImages = [
  { id: 1, src: "/artwork/artwork1.jpg", title: "Abstract Dreams" },
  { id: 2, src: "/artwork/artwork2.jpg", title: "Urban Landscape" },
  { id: 3, src: "/artwork/artwork3.png", title: "Nature's Beauty" },
  { id: 4, src: "/artwork/artwork4.png", title: "Portrait Study" },
];

export const ArtGallery = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Art Gallery</h2>

      <div className="grid grid-cols-3 gap-4">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow"
          >
            <Image
              src={image.src}
              alt={image.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-semibold text-center px-2">
                {image.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
