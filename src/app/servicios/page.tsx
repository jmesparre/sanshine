"use client";

import Card from "@/components/Card";

const services = [
  {
    title: "Consulta Nutricional",
    description: "Una consulta personalizada para alcanzar tus objetivos de salud.",
    imageUrl: "https://via.placeholder.com/400x200",
    buttonText: "Más Información",
  },
  {
    title: "Curso de Cocina Saludable",
    description: "Aprende a preparar deliciosos y nutritivos platos.",
    imageUrl: "https://via.placeholder.com/400x200",
    buttonText: "Inscribirse",
  },
  {
    title: "Taller de Alimentación Consciente",
    description: "Descubre cómo mejorar tu relación con la comida.",
    imageUrl: "https://via.placeholder.com/400x200",
    buttonText: "Ver Fechas",
  },
];

const ServicesPage = () => {
  return (
    <div className="container mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Nuestros Servicios
      </h1>
      <div className="grid md:grid-cols-3 gap-12">
        {services.map((service) => (
          <Card
            key={service.title}
            title={service.title}
            description={service.description}
            imageUrl={service.imageUrl}
            buttonText={service.buttonText}
            onButtonClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
