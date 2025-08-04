"use client";

import Image from "next/image";
import { services } from "@/lib/constants";
import PaymentSection from "@/components/payments/PaymentSection";

export default function Home() {
  return (
    <main className="bg-white text-gray-800">
      <div className="px-9 py-0">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-16 items-center mb-32">
          {/* Left Column */}
          <div>
            <p className="text-lg mb-3 mt-14 sm:mt-[-2]">Lic. Fernanda Sarro</p>
            <h1 className="text-6xl font-semibold mb-6">
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
              className="rounded-3xl object-cover "
              priority
            />
          </div>
        </section>

        {/* Enfoque Orgánico Section */}
        <section className="grid md:grid-cols-3 gap-16 items-start mb-32">
          {/* Left Column */}
          <div className="md:col-span-1">
            <h2 className="text-5xl font-bold">Enfoque Orgánico:</h2>
          </div>
          {/* Right Column */}
          <div className="md:col-span-2 w-full">
            <p className="text-lg leading-relaxed">
              Imaginate despertar cada mañana livian@, con energía renovada y una claridad y calma mental que te permita enfrentar el día sin cargas innecesarias. Despierta tu inteligencia gastrointestinal con mi Plan Detox y de Modulación de Microbiota Intestinal. En pocas semanas, eliminarás toxinas físicas y emocionales y descubrirás todo el potencial que tienes adentro.
            </p>
          </div>
        </section>

        <hr />
        
        
        <hr className="pb-40"/>

        {/* Services Sections */}
        {services.map((service, index) => (
          <section
            key={service.id}
            
          >
            <div className="grid md:grid-cols-2 gap-16 items-start mb-52">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="flex items-baseline">
                <span className="text-5xl text-[#a8a427] mr-10">
                  {`0${index + 1}`}
                </span>
                <h3 className="text-5xl font-semibold w-full">
                  {service.title}
                </h3>
              </div>
              <div className="space-y-4 pl-25">
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
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <PaymentSection service={service} />
            </div>
            {/* Right Column */}
            <div className="space-y-8">
              <div className="relative">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="rounded-3xl object-cover"
                />
                <div className="absolute inset-0 flex justify-between items-center px-4">
                  <button className="bg-white bg-opacity-50 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button className="bg-white bg-opacity-50 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <h3 className="text-4xl mb-4">Un Viaje Hacia Tu Bienestar</h3>
              <p className="text-lg leading-relaxed">{service.description}</p>
            </div>
            </div>
            <hr className="pb-40" />
          </section>
        ))}
      </div>
    </main>
  );
}
