"use client";

import Image from "next/image";
import { services } from "@/lib/constants";
import PaymentSection from "@/components/payments/PaymentSection";
import Accordion from "@/components/ui/Accordion";

export default function Home() {
  return (
    <main className="">
      <div className="px-9 py-0">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-16 items-center mb-32">
          {/* Left Column */}
          <div>
            <p className="text-lg mb-3 mt-14 sm:mt-[-2]">Lic. Fernanda Sarro</p>
            <h1 className="text-6xl font-semibold font-alegreya mb-6">
              Especialista en Nutrición Depurativa y Regenerativa
            </h1>
            <ul className="space-y-3 text-lg">
              <li>• Accede a mis consultas</li>
              <li>• Inscribite a mis workshops</li>
              <li>• Conoce mi catalogo de productos</li>
            </ul>
          </div>
          {/* Right Column */}
          <div className="relative ">
            <Image
              src="/placeholder-fernanda.jpg" // Placeholder
              alt="Fernanda Sarro"
              width={600}
              height={600}
              className="rounded-3xl object-cover pt-12"
              priority
            />
          </div>
        </section>

        {/* Enfoque Orgánico Section */}
        <section className="grid md:grid-cols-3 gap-16 items-start mb-32">
          {/* Left Column */}
          <div className="md:col-span-1">
            <h2 className="text-5xl font-semibold font-alegreya">Nutrición Funcional y Depurativa:</h2>
          </div>
          {/* Right Column */}
          <div className="md:col-span-2 w-full">
            <p className="text-lg leading-relaxed">
             <b>¿Por qué cuidar tu intestino y microbiota intestinal?</b> 
             <br />
              Tu digestión es mucho más que absorber nutrientes: es tu segundo cerebro, regula tus
              hormonas, tu energía, tu ánimo y tu inflamación.
              Si tu intestino está inflamado, parasitado o sobrecargado, podés sentirte cansad@, con la
              mente nublada, la piel reactiva, ansiedad o dificultad para bajar de peso.
              <br />
              <b>Sanar tu microbiota es regresar a tu eje.</b> 
              <i> Desintoxicar tu cuerpo es hacer espacio para tu
              bienestar. Y hacerlo con método, guía y acompañamiento… lo cambia todo.</i>
            </p>
          </div>
        </section>
 
        
        <hr className="pb-20 border-black"/>

        {/* Services Sections */}
        {services.map((service, index) => (
          <section
            key={service.id}
            
          >
            <div className="grid md:grid-cols-2 gap-16 items-start mb-52">
            {/* Left Column */}
            <div className="space-y-8 pl-5">
                <span className="text-[3.3rem] text-[#a8a427] font-alegreya ">
                  {`0${index + 1}`}/
                </span>
                <h3 className="text-[2.9rem] mb-5 leading-13 pt-1 font-semibold font-alegreya w-6/7">
                  {service.title}
                </h3>
              <div className="space-y-3.5">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="italic font-light">{feature}</span>
                  </div>
                ))}
              </div>
              <PaymentSection service={service} />
            </div>
            {/* Right Column */}
            <div className="space-y-8 pt-3">
              <div className="relative">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="rounded-3xl object-cover"
                />
                
              </div>
              <p className="text-md leading-relaxed">{service.description}</p>
              {service.accordionItems && (
                <div className="pt-8">
                  <p className="mb-4">Donde dividiremos en 4 etapas:</p>
                  <Accordion items={service.accordionItems} />
                </div>
              )}
            </div>
            </div>
            <hr className="pb-20 border-black" />
          </section>
        ))}
      </div>
    </main>
  );
}
