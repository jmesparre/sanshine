"use client";

import Image from "next/image";
import Button from "@/components/Button";



export default function Home() {
  return (
    <main className="bg-white text-gray-800">
      <div className="px-12 py-20">

        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-16 items-center mb-32">
          {/* Left Column */}
          <div>
            <p className="text-sm mb-4 pt-2">Lic. Fernanda Sarro</p>
            <h1 className="text-6xl font-bold leading-tight mb-6">
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
              className="rounded-3xl object-cover"
              priority
            />
          </div>
        </section>

        {/* Enfoque Orgánico Section */}
        <section className="grid md:grid-cols-2 gap-16 items-start mb-32">
          {/* Left Column */}
          <div>
            <h2 className="text-5xl font-bold">Enfoque Orgánico:</h2>
          </div>
          {/* Right Column */}
          <div>
            <p className="text-lg leading-relaxed">
              Imaginate despertar cada mañana livian@, con energía renovada y una claridad y calma mental que te permita enfrentar el día sin cargas innecesarias. Despierta tu inteligencia gastrointestinal con mi Plan Detox y de Modulación de Microbiota Intestinal. En pocas semanas, eliminarás toxinas físicas y emocionales y descubrirás todo el potencial que tienes adentro.
            </p>
          </div>
        </section>

        {/* Mis Servicios Section */}
        <section className="grid md:grid-cols-2 gap-16 items-start mb-32">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl font-bold">Mis servicios</h2>
          </div>
          {/* Right Column */}
          <div>
            <div className="space-y-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-orange-500 mr-6">01</span>
                <h3 className="text-4xl font-bold">Consultas Virtuales</h3>
              </div>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-orange-500 mr-6">02</span>
                <h3 className="text-4xl font-bold">Workshops Grupales</h3>
              </div>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-orange-500 mr-6">03</span>
                <h3 className="text-4xl font-bold">Detox Virtual</h3>
              </div>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-orange-500 mr-6">04</span>
                <h3 className="text-4xl font-bold">Productos</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Consultas Virtuales Section */}
        <section className="grid md:grid-cols-2 gap-16 items-start mb-32">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-orange-500 mr-6">01</span>
              <h3 className="text-4xl font-bold">Consultas Virtuales</h3>
            </div>
            <div className="space-y-4 pl-20">
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Encuentro virtual de 2 horas</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Plan nutricional 100% personalizado</span>
              </div>
               <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>Seguimiento y soporte vía WhatsApp</span>
              </div>
            </div>
            <div className="pl-20">
              <p className="text-sm text-gray-500">costo:</p>
              <p className="text-4xl font-bold">200 USD</p>
            </div>
            <div className="pl-20">
              <Button variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span>Abona tu consulta</span>
              </Button>
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-8">
            <div className="relative">
              <Image
                src="/placeholder-consulta.jpg" // Placeholder
                alt="Consulta virtual"
                width={600}
                height={400}
                className="rounded-3xl object-cover"
              />
              <div className="absolute inset-0 flex justify-between items-center px-4">
                <button className="bg-white bg-opacity-50 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button className="bg-white bg-opacity-50 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
            <h3 className="text-3xl font-bold">Un Viaje Hacia Tu Bienestar</h3>
            <p className="text-lg leading-relaxed">
              Cada consulta es un espacio seguro y confidencial donde exploramos juntos tus hábitos, objetivos y desafíos. Mi enfoque no se centra en dietas restrictivas, sino en crear un plan de alimentación consciente y sostenible que se adapte a tu estilo de vida y te nutra desde adentro hacia afuera.
            </p>
            <p className="text-lg leading-relaxed">
              Aprenderás a escuchar a tu cuerpo, a elegir los alimentos que te dan energía y vitalidad, y a construir una relación saludable y amorosa con la comida. Este es el primer paso hacia una transformación profunda y duradera.
            </p>
          </div>
        </section>


          {/* Consultas Workshops Grupales */}
        <section className="grid md:grid-cols-2 gap-16 items-start mb-32">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-orange-500 mr-6">02</span>
              <h3 className="text-4xl font-bold">Workshops Grupales</h3>
            </div>
            <div className="space-y-4 pl-20">
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Encuentro virtual de 2 horas</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Plan nutricional 100% personalizado</span>
              </div>
               <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>Seguimiento y soporte vía WhatsApp</span>
              </div>
            </div>
            <div className="pl-20">
              <p className="text-sm text-gray-500">costo:</p>
              <p className="text-4xl font-bold">200 USD</p>
            </div>
            <div className="pl-20">
              <Button variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span>Abona tu consulta</span>
              </Button>
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-8">
            <div className="relative">
              <Image
                src="/placeholder-consulta.jpg" // Placeholder
                alt="Consulta virtual"
                width={600}
                height={400}
                className="rounded-3xl object-cover"
              />
              <div className="absolute inset-0 flex justify-between items-center px-4">
                <button className="bg-white bg-opacity-50 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button className="bg-white bg-opacity-50 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
            <h3 className="text-3xl font-bold">Un Viaje Hacia Tu Bienestar</h3>
            <p className="text-lg leading-relaxed">
              Cada consulta es un espacio seguro y confidencial donde exploramos juntos tus hábitos, objetivos y desafíos. Mi enfoque no se centra en dietas restrictivas, sino en crear un plan de alimentación consciente y sostenible que se adapte a tu estilo de vida y te nutra desde adentro hacia afuera.
            </p>
            <p className="text-lg leading-relaxed">
              Aprenderás a escuchar a tu cuerpo, a elegir los alimentos que te dan energía y vitalidad, y a construir una relación saludable y amorosa con la comida. Este es el primer paso hacia una transformación profunda y duradera.
            </p>
          </div>
        </section>

        {/* Productos Section */}
        <section className="mb-32">
          <div className="flex items-baseline mb-12">
            <span className="text-4xl font-bold text-orange-500 mr-6">06</span>
            <h3 className="text-4xl font-bold">Productos</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="bg-gray-50 p-8 rounded-3xl">
              <Image src="/placeholder-producto.jpg" alt="Producto" width={400} height={400} className="rounded-2xl mb-6" style={{ height: 'auto' }} />
              <h4 className="font-bold mb-2">Kit Detox Intestinal</h4>
              <p className="text-sm text-gray-600">Una selección de suplementos y hierbas naturales diseñados para limpiar y restaurar tu sistema digestivo, mejorando la absorción de nutrientes y tu bienestar general.</p>
            </div>
            {/* Product 2 */}
            <div className="bg-gray-50 p-8 rounded-3xl">
              <Image src="/placeholder-producto.jpg" alt="Producto" width={400} height={400} className="rounded-2xl mb-6" style={{ height: 'auto' }} />
              <h4 className="font-bold mb-2">Tónico Regenerativo Celular</h4>
              <p className="text-sm text-gray-600">Fórmula avanzada con antioxidantes y adaptógenos para combatir el estrés oxidativo y promover la regeneración celular, dándote una piel radiante y más energía.</p>
            </div>
            {/* Product 3 */}
            <div className="bg-gray-50 p-8 rounded-3xl">
              <Image src="/placeholder-producto.jpg" alt="Producto" width={400} height={400} className="rounded-2xl mb-6" style={{ height: 'auto' }} />
              <h4 className="font-bold mb-2">Infusión Equilibrio Hormonal</h4>
              <p className="text-sm text-gray-600">Mezcla de hierbas orgánicas que ayudan a regular el sistema endocrino, aliviando síntomas de desequilibrio hormonal y promoviendo un ciclo menstrual saludable.</p>
            </div>
            {/* Product 4 */}
            <div className="bg-gray-50 p-8 rounded-3xl">
              <Image src="/placeholder-producto.jpg" alt="Producto" width={400} height={400} className="rounded-2xl mb-6" style={{ height: 'auto' }} />
              <h4 className="font-bold mb-2">Proteína Vegana "Vitalidad"</h4>
              <p className="text-sm text-gray-600">Proteína en polvo de alta calidad a base de plantas, enriquecida con superalimentos para apoyar la masa muscular, la recuperación y un estilo de vida activo.</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
