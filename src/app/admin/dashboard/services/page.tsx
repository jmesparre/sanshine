"use client";

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Service, BulletPoint } from '@/types';

const servicesToEdit = [
  { id: 'taller-ig', name: 'Taller de Inteligencia Gastro Intestinal' },
  { id: 'detox-grupal', name: 'Detox Solar Grupal' },
  { id: 'detox-individual', name: 'Detox Solar Individual' },
];

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(servicesToEdit[0].id);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const fetchedServices = await Promise.all(
        servicesToEdit.map(async (serviceInfo, index) => {
          const docRef = doc(db, 'services', serviceInfo.id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // Ensure bulletPoints is always an array
            const data = docSnap.data();
            const bulletPoints = data.leftColumn.bulletPoints || [];
            data.leftColumn.bulletPoints = bulletPoints.map((bp: BulletPoint | { text: string; icon: string; }) => 
              typeof bp === 'string' ? { text: bp, icon: 'CheckCircle' } : bp
            );
            return { id: docSnap.id, ...data } as Service;
          }
          return {
            id: serviceInfo.id,
            isActive: true,
            order: index,
            leftColumn: { 
              title: serviceInfo.name, 
              prices: { ARS: 0, USD: 0, EUR: 0, MXN: 0 }, 
              bulletPoints: [
                { text: '', icon: 'CheckCircle' },
                { text: '', icon: 'CheckCircle' },
                { text: '', icon: 'CheckCircle' }
              ] 
            },
            rightColumn: { image: '', text: '', accordion: [] }
          } as Service;
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
          const updatedService = {
            ...service,
            [section]: {
              ...service[section],
              [field]: value,
            },
          };
          return updatedService;
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
          const newBulletPoints = [...service.leftColumn.bulletPoints, { text: '', icon: 'CheckCircle' }];
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

  const removeBulletPoint = (serviceId: string, index: number) => {
    setServices(prevServices =>
      prevServices.map(service => {
        if (service.id === serviceId) {
          const newBulletPoints = service.leftColumn.bulletPoints.filter((_, i) => i !== index);
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
          const newAccordion = service.rightColumn.accordion.filter((_, i) => i !== index);
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

  const handleSave = async (serviceId: string) => {
    const serviceToSave = services.find(s => s.id === serviceId);
    if (!serviceToSave) return;

    try {
      const docRef = doc(db, 'services', serviceId);
      await setDoc(docRef, serviceToSave, { merge: true });
      alert('Servicio actualizado con éxito!');
    } catch (error) {
      console.error("Error updating document: ", error);
      alert('Error al actualizar el servicio.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  const activeService = services.find(s => s.id === activeTab);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Contenido de Servicios</h1>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {servicesToEdit.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-8">
        {activeService && (
          <div key={activeService.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Columna Izquierda */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2">Columna Izquierda</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Título</label>
                  <input
                    type="text"
                    value={activeService.leftColumn.title}
                    onChange={e => handleInputChange(activeService.id, 'leftColumn', 'title', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Precios</label>
                  {Object.entries(activeService.leftColumn.prices).map(([currency, price]) => (
                    <div key={currency} className="flex items-center mt-2">
                      <span className="w-12 text-gray-500">{currency}</span>
                      <input
                        type="number"
                        value={price}
                        onChange={e => handlePriceChange(activeService.id, currency, e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bullet Points</label>
                  {activeService.leftColumn.bulletPoints.map((point, index) => (
                    <div key={index} className="mt-2 space-y-2 p-2 border rounded-md relative">
                      <input
                        type="text"
                        placeholder="Texto del bullet point"
                        value={point.text}
                        onChange={e => handleBulletPointChange(activeService.id, index, 'text', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Nombre del ícono (ej. CheckCircle)"
                        value={point.icon}
                        onChange={e => handleBulletPointChange(activeService.id, index, 'icon', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mt-2"
                      />
                      <button 
                        onClick={() => removeBulletPoint(activeService.id, index)} 
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => addBulletPoint(activeService.id)} 
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Añadir Bullet Point
                  </button>
                </div>
              </div>

              {/* Columna Derecha */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2">Columna Derecha</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Texto</label>
                  <textarea
                    value={activeService.rightColumn.text}
                    onChange={e => handleInputChange(activeService.id, 'rightColumn', 'text', e.target.value)}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Acordeón</h3>
                  <div className="space-y-4 mt-2">
                    {activeService.rightColumn.accordion.map((item, index) => (
                      <div key={index} className="p-4 border rounded-md">
                        <div className="flex justify-between items-center mb-2">
                           <h4 className="font-semibold">Item {index + 1}</h4>
                           <button onClick={() => removeAccordionItem(activeService.id, index)} className="text-red-500 hover:text-red-700">Eliminar</button>
                        </div>
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={e => handleAccordionChange(activeService.id, index, 'title', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-2">Contenido</label>
                        <textarea
                          value={item.content}
                          onChange={e => handleAccordionChange(activeService.id, index, 'content', e.target.value)}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    ))}
                  </div>
                  <button onClick={() => addAccordionItem(activeService.id)} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Añadir Item al Acordeón
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSave(activeService.id)}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
