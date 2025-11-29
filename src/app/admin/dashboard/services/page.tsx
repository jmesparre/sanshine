"use client";

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Service, BulletPoint } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Trash2 } from 'lucide-react';

const servicesToEdit = [
  { id: 'taller-ig', name: 'Servicio 1' },
  { id: 'detox-grupal', name: 'Servicio 2' },
  { id: 'detox-individual', name: 'Servicio 3' },
  { id: 'plan-antiinflamatorio', name: 'Servicio 4' },
  { id: 'servicio-nuevo-1', name: 'Servicio 5' },
  { id: 'servicio-nuevo-2', name: 'Servicio 6' },
];

const currencyOrder = ['USD', 'EUR', 'ARS', 'MXN'];

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(servicesToEdit[0].id);
  const { toast } = useToast();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const fetchedServices = await Promise.all(
        servicesToEdit.map(async (serviceInfo, index) => {
          const docRef = doc(db, 'services', serviceInfo.id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const bulletPoints = data.leftColumn.bulletPoints || [];
            data.leftColumn.bulletPoints = bulletPoints.map((bp: BulletPoint | { text: string; icon: string; }) =>
              typeof bp === 'string' ? { text: bp, icon: 'CheckCircle' } : bp
            );
            return { id: docSnap.id, ...data } as Service;
          }
          let defaultData: Service = {
            id: serviceInfo.id,
            isActive: true,
            order: index,
            leftColumn: {
              title: serviceInfo.name,
              prices: { MXN: 0, ARS: 0, USD: 0, EUR: 0 },
              bulletPoints: [
                { text: '', icon: 'CheckCircle' },
                { text: '', icon: 'CheckCircle' },
                { text: '', icon: 'CheckCircle' }
              ]
            },
            rightColumn: { image: '', text: '', accordion: [] }
          };

          if (serviceInfo.id === 'servicio-nuevo-1') {
            defaultData = {
              ...defaultData,
              leftColumn: {
                ...defaultData.leftColumn,
                title: 'Servicio Nuevo 1',
                prices: { USD: 100, ARS: 100000, EUR: 90, MXN: 1800 },
                bulletPoints: [
                  { icon: "CheckCircle", text: "Característica 1" },
                  { icon: "CheckCircle", text: "Característica 2" }
                ]
              },
              rightColumn: {
                image: 'placeholder-producto1.png',
                text: 'Descripción del servicio nuevo 1. Este es un servicio agregado recientemente.',
                accordion: [{ title: "Detalles", content: "Más información sobre este servicio." }]
              }
            };
          } else if (serviceInfo.id === 'servicio-nuevo-2') {
            defaultData = {
              ...defaultData,
              leftColumn: {
                ...defaultData.leftColumn,
                title: 'Servicio Nuevo 2',
                prices: { USD: 150, ARS: 150000, EUR: 140, MXN: 2700 },
                bulletPoints: [
                  { icon: "CheckCircle", text: "Beneficio Premium" },
                  { icon: "CheckCircle", text: "Soporte Exclusivo" }
                ]
              },
              rightColumn: {
                image: 'placeholder-producto.png',
                text: 'Descripción del servicio nuevo 2. Este es otro servicio agregado.',
                accordion: [{ title: "Incluye", content: "Todo lo necesario para empezar." }]
              }
            };
          }

          return defaultData;
        })
      );
      setServices(fetchedServices);
      setLoading(false);
    };

    fetchServices();
  }, []);

  const handleInputChange = <T extends 'leftColumn' | 'rightColumn', K extends keyof Service[T]>(
    serviceId: string,
    section: T,
    field: K,
    value: Service[T][K]
  ) => {
    setServices(prevServices =>
      prevServices.map(service => {
        if (service.id === serviceId) {
          return {
            ...service,
            [section]: {
              ...service[section],
              [field]: value,
            },
          };
        }
        return service;
      })
    );
  };

  const handleOrderChange = (serviceId: string, value: string) => {
    setServices(prevServices =>
      prevServices.map(service => {
        if (service.id === serviceId) {
          return { ...service, order: parseInt(value, 10) || 0 };
        }
        return service;
      })
    );
  };

  const handleBulletPointChange = (serviceId: string, index: number, field: 'text' | 'icon', value: string) => {
    setServices(prevServices =>
      prevServices.map(service => {
        if (service.id === serviceId) {
          const newBulletPoints = [...service.leftColumn.bulletPoints];
          newBulletPoints[index] = { ...newBulletPoints[index], [field]: value };
          return {
            ...service,
            leftColumn: {
              ...service.leftColumn,
              bulletPoints: newBulletPoints,
            },
          };
        }
        return service;
      })
    );
  };

  const addBulletPoint = (serviceId: string) => {
    setServices(prevServices =>
      prevServices.map(service => {
        if (service.id === serviceId) {
          return {
            ...service,
            leftColumn: {
              ...service.leftColumn,
              bulletPoints: [...service.leftColumn.bulletPoints, { text: '', icon: 'CheckCircle' }],
            },
          };
        }
        return service;
      })
    );
  };

  const removeBulletPoint = (serviceId: string, index: number) => {
    setServices(prevServices =>
      prevServices.map(service => {
        if (service.id === serviceId) {
          return {
            ...service,
            leftColumn: {
              ...service.leftColumn,
              bulletPoints: service.leftColumn.bulletPoints.filter((_, i) => i !== index),
            },
          };
        }
        return service;
      })
    );
  };

  const handlePriceChange = (serviceId: string, currency: string, value: string) => {
    const numericValue = value === '' ? 0 : parseFloat(value);
    if (isNaN(numericValue)) return;

    setServices(prevServices =>
      prevServices.map(service => {
        if (service.id === serviceId) {
          return {
            ...service,
            leftColumn: {
              ...service.leftColumn,
              prices: {
                ...service.leftColumn.prices,
                [currency]: numericValue,
              },
            },
          };
        }
        return service;
      })
    );
  };

  const handleAccordionChange = (serviceId: string, index: number, field: 'title' | 'content', value: string) => {
    setServices(prevServices =>
      prevServices.map(service => {
        if (service.id === serviceId) {
          const newAccordion = [...service.rightColumn.accordion];
          newAccordion[index] = { ...newAccordion[index], [field]: value };
          return {
            ...service,
            rightColumn: {
              ...service.rightColumn,
              accordion: newAccordion,
            },
          };
        }
        return service;
      })
    );
  };

  const addAccordionItem = (serviceId: string) => {
    setServices(prevServices =>
      prevServices.map(service => {
        if (service.id === serviceId) {
          return {
            ...service,
            rightColumn: {
              ...service.rightColumn,
              accordion: [...service.rightColumn.accordion, { title: '', content: '' }],
            },
          };
        }
        return service;
      })
    );
  };

  const removeAccordionItem = (serviceId: string, index: number) => {
    setServices(prevServices =>
      prevServices.map(service => {
        if (service.id === serviceId) {
          return {
            ...service,
            rightColumn: {
              ...service.rightColumn,
              accordion: service.rightColumn.accordion.filter((_, i) => i !== index),
            },
          };
        }
        return service;
      })
    );
  };

  const handleSave = async (serviceId: string) => {
    const serviceToSave = services.find(s => s.id === serviceId);
    if (!serviceToSave) return;

    try {
      const docRef = doc(db, 'services', serviceId);
      await setDoc(docRef, serviceToSave, { merge: true });
      toast({
        title: 'Éxito',
        description: 'Servicio actualizado correctamente.',
      });
    } catch (error) {
      console.error("Error updating document: ", error);
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el servicio.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  const activeService = services.find(s => s.id === activeTab);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Editar Contenido de Servicios</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {servicesToEdit.map(tab => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {activeService && (
          <TabsContent value={activeService.id}>
            <Card>

              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Columna Izquierda */}
                  <div className="space-y-6">
                    <Card>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="title">Título</Label>
                          <Input
                            id="title"
                            value={activeService.leftColumn.title}
                            onChange={e => handleInputChange(activeService.id, 'leftColumn', 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="order">Orden</Label>
                          <Input
                            id="order"
                            type="number"
                            value={activeService.order}
                            onChange={e => handleOrderChange(activeService.id, e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Precios</Label>
                          {currencyOrder.map(currency => (
                            <div key={currency} className="flex items-center mt-2">
                              <span className="w-12 text-muted-foreground">{currency}</span>
                              <Input
                                type="number"
                                value={activeService.leftColumn.prices[currency as keyof typeof activeService.leftColumn.prices] || ''}
                                onChange={e => handlePriceChange(activeService.id, currency, e.target.value)}
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Bullet Points</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {activeService.leftColumn.bulletPoints.map((point, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              placeholder="Texto del bullet point"
                              value={point.text}
                              onChange={e => handleBulletPointChange(activeService.id, index, 'text', e.target.value)}
                            />
                            <Input
                              placeholder="Ícono (ej. CheckCircle)"
                              value={point.icon}
                              onChange={e => handleBulletPointChange(activeService.id, index, 'icon', e.target.value)}
                              className="w-48"
                            />
                            <Button variant="ghost" size="icon" onClick={() => removeBulletPoint(activeService.id, index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button onClick={() => addBulletPoint(activeService.id)} variant="outline" size="sm">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Añadir Bullet Point
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Columna Derecha */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Contenido Adicional</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="text">Texto</Label>
                          <Textarea
                            id="text"
                            value={activeService.rightColumn.text}
                            onChange={e => handleInputChange(activeService.id, 'rightColumn', 'text', e.target.value)}
                            rows={6}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">Acordeón</h3>
                          <div className="space-y-4 mt-2">
                            {activeService.rightColumn.accordion.map((item, index) => (
                              <div key={index} className="p-4 border border-gray-400 rounded-md space-y-2">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-semibold">Item {index + 1}</h4>
                                  <Button variant="ghost" size="icon" onClick={() => removeAccordionItem(activeService.id, index)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div>
                                  <Label>Título</Label>
                                  <Input
                                    value={item.title}
                                    onChange={e => handleAccordionChange(activeService.id, index, 'title', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <Label>Contenido</Label>
                                  <Textarea
                                    value={item.content}
                                    onChange={e => handleAccordionChange(activeService.id, index, 'content', e.target.value)}
                                    rows={3}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                          <Button onClick={() => addAccordionItem(activeService.id)} variant="outline" size="sm" className="mt-4">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Añadir Item al Acordeón
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => handleSave(activeService.id)}>
                    Guardar Cambios
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ServicesPage;
