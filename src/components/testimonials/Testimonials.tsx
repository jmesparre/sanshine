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
    name: "Ana Pérez",
    testimonial: "El programa de Fernanda cambió mi vida. Aprendí a escuchar a mi cuerpo y a nutrirlo de verdad. ¡Me siento con más energía que nunca!",
    avatar: "/placeholder-fernanda.png", 
  },
  {
    name: "Carlos Gómez",
    testimonial: "Después de años de probar dietas sin éxito, Después de años de probar dietas sin éxito, Después de años de probar dietas sin éxito, Después de años de probar dietas sin éxito,   el enfoque de Fernanda fue revelador.  el enfoque de Fernanda  el enfoque de Fernanda fue revelador. No se trata de restringir, sino de entender y sanar.  de años de probar dietas sin éxito, el enfoque de Fernanda fue revelador. No se trata de restringir, sino de entender y sanar. ",
    avatar: "/placeholder-fernanda.png",
  },
  {
    name: "Luisa Fernández",
    testimonial: "El Detox Solar fue un antes y un después. No solo mejoró mi digestión, sino también mi claridad mental y mi estado de ánimo.",
    avatar: "/placeholder-fernanda.png",
  },
    {
    name: "Javier Rodríguez",
    testimonial: "Fernanda es una profesional increíble. Su acompañamiento cercano y su sabiduría hacen que todo el proceso sea fácil y transformador.",
    avatar: "/placeholder-fernanda.png",
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
                        "{item.testimonial}"
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
