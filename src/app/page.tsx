"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Service } from "@/types";
import PaymentSection from "@/components/payments/PaymentSection";
import Accordion from "@/components/ui/Accordion";
import Spinner from "@/components/ui/Spinner";
import DynamicIcon from "@/components/ui/DynamicIcon";

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const serviceImages: { [key: string]: string } = {
    'taller-ig': '/placeholder-producto.jpg',
    'detox-grupal': '/placeholder-producto.jpg',
    'detox-individual': '/placeholder-producto.jpg',
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(
          collection(db, "services"),
          where("isActive", "==", true),
          orderBy("order", "asc")
        );
        const querySnapshot = await getDocs(q);
        const servicesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching services: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (!loading && window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  }, [loading]);

  return (
    <main className="">
      <div className="px-9 py-0">
        {/* Hero Section */}
        <section className="grid pt-5 px-4 md:grid-cols-2 gap-1 items-center mb-32">
          {/* Left Column */}
          <div>
            <p className="text-lg mb-3 ">Lic. Fernanda Sarro</p>
            <h1 className="text-6xl font-semibold font-alegreya mb-6">
              Especialista en Nutrición Depurativa y Regenerativa
            </h1>
            <ul className="space-y-3 text-md italic">
              <li>+ Taller de Inteligencia Gastro Intestinal</li>
              <li>+ Detox Solar Grupal</li>
              <li>+ Detox Solar Indiviudal</li>
            </ul>
          </div>
          {/* Right Column */}
          <div className="relative ">
            <Image
              src="/placeholder-fernanda.png" // Placeholder
              alt="Fernanda Sarro"
              width={600}
              height={600}
              className="rounded-3xl object-cover pt-4"
              priority
            />
          </div>
        </section>

        {/* Descripcion Section */}
        <section className="grid px-4 md:grid-cols-7 gap-16 items-start mb-32">
          {/* Left Column */}
          <div className="md:col-span-2">
            <h2 className="text-5xl font-semibold font-alegreya">Nutrición Funcional y Depurativa:</h2>
          </div>
          {/* Right Column */}
          <div className="md:col-span-5 w-full">
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
              bienestar. Y hacerlo con método, guía y acompañamiento… </i>lo cambia todo.
            </p>
          </div>
        </section>
 
        
        <hr className="pb-15 border-black"/>

        {/* Services Sections */}
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Spinner />
          </div>
        ) : (
          services.map((service, index) => (
            <section
              key={service.id}
              id={service.id}
            >
              <div className="px-4 grid md:grid-cols-2 gap-1 items-start mb-52">
              {/* Left Column */}
              <div className="space-y-8 pr-20">
                  <span className="text-[3.3rem] text-[#a8a427] font-alegreya ">
                    {`0${index + 1}`}/
                  </span>
                  <h3 className="text-[2.9rem] mb-5 leading-13 pt-1 font-semibold font-alegreya w-6/7">
                    {service.leftColumn.title}
                  </h3>
                <div className="space-y-3.5">
                  {service.leftColumn.bulletPoints.map((point, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <DynamicIcon name={point.icon as keyof typeof import('lucide-react')} className="h-6 w-6 text-gray-500" />
                      <span className="italic font-light">{point.text}</span>
                    </div>
                  ))}
                </div>
                <PaymentSection service={service} />
              </div>
              {/* Right Column */}
              <div className="space-y-8 pt-5">
                <div className="relative">
                  <Image
                    src={serviceImages[service.id]}
                    alt={service.leftColumn.title}
                    width={600}
                    height={400}
                    className="rounded-3xl object-cover"
                  />
                  
                </div>
                <p className="text-md leading-relaxed whitespace-pre-line mb-4">{service.rightColumn.text}</p>
                {service.rightColumn.accordion && service.rightColumn.accordion.length > 0 && (
                  <div>
                    <Accordion items={service.rightColumn.accordion} />
                  </div>
                )}
              </div>
              </div>
              <hr className="pb-20 border-black" />
            </section>
          ))
        )}
      </div>
    </main>
  );
}
