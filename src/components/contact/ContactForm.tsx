'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Instagram, Mail, MessageCircle } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce un correo electrónico válido.' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje.');
      }

      toast({
        title: '¡Mensaje Enviado!',
        description: 'Gracias por contactarte.',
        variant: 'default',
      });
      reset();
      setIsSubmitted(true);
    } catch {
      toast({
        title: 'Error',
        description: 'Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-1 pb-20">
      <div className="px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <div className='w-5/6'>
              <h2 className="text-5xl font-bold text-gray-800 mb-4 pt-20 pb-5 font-serif">Pongámonos en contacto</h2>
              <p className="text-gray-700 mb-4 ">
                Si tienes alguna duda, escríbeme.
              </p>

              <div className="space-y-4 text-md pt-5">
                <a href="https://www.instagram.com/fernanda.sarro/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                  <Instagram size={24} className="text-gray-500" />
                  <span>@fernanda.sarro</span>
                </a>
                <a href="mailto:tu-email@example.com" className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors">
                  <Mail size={24} className="text-gray-500" />
                  <span>sarrofernanda21@gmail.com</span>
                </a>
                <a href="https://api.whatsapp.com/send?phone=5491164421989&text=Hola%20Fer!%20%E2%9C%A8%0AMi%20nombre%20es%20%E2%80%A6%E2%80%A6%E2%80%A6%20%0AEstoy%20interesado%2Fa%20en%20%E2%80%A6%E2%80%A6%E2%80%A6..%20" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors">
                  <MessageCircle size={24} className="text-gray-500" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full ">
            <Card className=" border-1  border-black mt-34 rounded-2xl shadow-none p-4">

              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <h3 className="text-2xl font-bold text-primary mb-4">¡Gracias por tu mensaje!</h3>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-2 py-3 md:py-7">
                    <div className="space-y-1">
                      <Label htmlFor="name" className="font-light">Nombre</Label>
                      <Input
                        id="name"
                        {...register('name')}
                        className="border-black rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      />
                      {errors.name && <p className="text-red-300 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-light">Correo Electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        className=" border-black rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      />
                      {errors.email && <p className="text-red-300 text-sm">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className=" font-light">Mensaje</Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        className=" border-black rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent min-h-[150px]"
                      />
                      {errors.message && <p className="text-red-300 text-sm">{errors.message.message}</p>}
                    </div>
                    <Button type="submit" className="w-full font-normal mt-4 bg-background border border-black text-black hover:bg-accent rounded-lg py-3 cursor-pointer" disabled={isLoading}>
                      {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
