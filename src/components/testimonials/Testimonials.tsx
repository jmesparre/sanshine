"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Andrea",
    testimonial: "Wow, esto fue un viaje 🥹 pasé por todas las emociones: irritabilidad al dejar café y azúcar, crisis depurativas con náuseas, ansiedad por los cambios… pero hoy me siento increíble, con la mente despejada, energía renovada y sin los dolores articulares que me limitaban. Hasta mi rodilla lesionada mejoró con la alimentación antiinflamatoria.",
    avatar: "/testimonio-andrea.jpg", 
  },
  {
    name: "Karla",
    testimonial: "Este detox me ayudó muchísimo a escuchar a mi cuerpo y tener esa conexión con lo que necesita. La intención fue clara, aprender lo que realmente requiere mi cuerpo y la verdad que muy bien logrado con tanta información tan rica! Me llevo muchísimo y seguiré aprendiendo 🙏✨🪄mil gracias muy lindo todoooo.",
    avatar: "/testimonio-karla2.jpg",
  },
  {
    name: "Flor",
    testimonial: "Hola grupo! Hoy desayuné tortitas de almendra con aguacate y me nutrí de sus palabras 🥹. Este detox coincidió con mi microdosis 🍄 y depuré cuerpo, emociones y vínculos. Me desinflamé, bajé kilitos, volví a danza área, tuve más energía y creatividad en la cocina. Agradezco el sostén, la comunidad y todas las herramientas que recibimos.",
    avatar: "/testimonio-flor.jpg",
  },
  {
    name: "Rosa",
    testimonial: "Yo si he sentido mejorías. Ya duermo un poco más. La piel de mi cara mejoró porque antes me salían unos granitos tipo rosácea y ya no. Mis glucosas también están mejorando...antes había días que me subía hasta 160. Hoy ya me tomo la lectura y me marca 105-- 120 en ese rango. Pero he aprendido mucho. Sobre todo a comer mejor y más sano.",
    avatar: "/testimonio-rosa.jpg",
  },
    {
    name: "Karla",
    testimonial: "Me llevo una nueva forma de hacer mis comidas y hacerme cargo de mi alimentación. Esto fue clave: además de perder kilos que no necesitaba, ordené mis días y complementé el trabajo interno de meses limpiando viejos patrones. Ahora sé que es un estilo de vida donde respiración, conexión y amor a mi intestino son esenciales.",
    avatar: "/testimonio-karla1.jpg",
  },
];

export function Testimonials() {
  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex flex-col space-y-6 pl-5 pb-10 ">
          <h2 className="text-4xl md:text-5xl font-semibold font-alegreya">Testimonios:</h2>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto mt-12"
        >
          <CarouselContent>
            {testimonials.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-full">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <Avatar className="w-20 h-20 mb-4">
                        <AvatarImage src={item.avatar} alt={item.name} />
                        <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {item.testimonial}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
