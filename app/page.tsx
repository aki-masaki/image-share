import prisma from '@/lib/db';

const HomePage = async () => {
  const images = await prisma.image.findMany();

  return (
    <main>
      {images.map(image => (
        <span key={image.id}>{image.title}</span>
      ))}
    </main>
  );
};

export default HomePage;
