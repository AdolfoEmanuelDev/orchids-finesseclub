export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image?: string;
  secondaryImages?: string[];
  checkoutUrl: string;
  zoom?: number;
  description?: string;
}

export const PRODUCTS: Product[] = [
{
    id: '1',
    name: 'Diesel® T-just G15 Black',
    price: 'R$ 555,00',
    originalPrice: 'R$ 650,00',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/1-resized-1766993128359.jpeg?width=8000&height=8000&resize=cover',
      secondaryImages: [
        'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/tjust-detelhe1-resized-1766999555080.jpeg?width=8000&height=8000&resize=contain',
        'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/tjust-detalhe-costa-resized-1766999555086.jpeg?width=8000&height=8000&resize=contain',
        'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/TAG-tjust-resized-1766999555084.jpeg?width=8000&height=8000&resize=contain'
      ],
    checkoutUrl: 'https://seguro.finesseclub.com.br/r/1YMS8P7GFD',
      description: "Pouquíssimo uso. (DS)\nModelagem relaxed / oversized\nSize S"
    },
    {
      id: '2',
      name: 'Diesel® umtee Black',
      price: 'R$ 200,00',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/umtee-frente-1766993377479.jpeg?width=8000&height=8000&resize=cover',
        secondaryImages: [
          'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-12-22-at-00.43.20-4-resized-1766999902938.jpeg?width=8000&height=8000&resize=contain',
          'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Umtee-Tag-resized-1766999689554.jpeg?width=8000&height=8000&resize=contain'
        ],
      checkoutUrl: 'https://seguro.finesseclub.com.br/r/MPMGCJXPW0',
      description: "Pouquíssimo uso. (Ds)\nModelagem regular/slim"
    },
    {
      id: '3',
      name: 'Suéter Polo Ralph Lauren®',
      price: "R$ 950,00",
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ralph-lauren-Frenteeeee-resized-1766997310267.webp?width=8000&height=8000&resize=contain',
        secondaryImages: [
          'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-12-22-at-00.43.20-6-resized-1767000342993.jpeg?width=8000&height=8000&resize=contain',
          'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-12-22-at-00.43.20-2-resized-1767000342874.jpeg?width=8000&height=8000&resize=contain',
          'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-12-22-at-00.43.20-3-resized-1767000342868.jpeg?width=8000&height=8000&resize=contain'
        ],
      checkoutUrl: 'https://seguro.finesseclub.com.br/r/AVRSF80NK8',
      zoom: 1.0,
      description: "Peça nova, sem etiqueta. (DS)\nPeça em tricô e logo bordado.\nAcompanha dust bag.\nSize S"
    },
  {
    id: '4',
    name: 'Lacoste® Pima Cotton',
    price: 'R$ 245,00',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_4212-resized-1766993521116.jpg?width=8000&height=8000&resize=cover',
      secondaryImages: [
        'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/imageeeeeeeeeeeeee-resized-1767000724763.jpg?width=8000&height=8000&resize=contain',
        'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/imageeeeeeeeee-resized-1767000724761.jpg?width=8000&height=8000&resize=contain'
      ],
      checkoutUrl: 'https://seguro.finesseclub.com.br/r/540WADO1SJ',
    zoom: 1.3,
    description: "Pouco uso. (Vnds)\nModelagem regular fit"
  }];
