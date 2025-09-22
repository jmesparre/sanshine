import { Resend } from 'resend';
import { Order } from '@/types';
import { db } from '@/lib/firebase-admin';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(orderId: string) {
  if (!db) {
    throw new Error('Firebase Admin SDK not initialized');
  }

  const orderRef = db.collection('orders').doc(orderId);
  const orderDoc = await orderRef.get();

  if (!orderDoc.exists) {
    throw new Error(`Order with ID ${orderId} not found`);
  }

  const order = orderDoc.data() as Order;

  if (!order.userId) {
    throw new Error(`Order with ID ${orderId} is missing a userId`);
  }

  const userRef = db.collection('users').doc(order.userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new Error(`User with ID ${order.userId} not found`);
  }

  const userData = userDoc.data();
  const userEmail = userData?.email;

  if (!userEmail) {
    throw new Error(`User with ID ${order.userId} does not have an email`);
  }

  await resend.emails.send({
    from: 'Plataforma Fernanda Sarro <noreply@nutricionsanshine.com>',
    to: userEmail,
    subject: `Confirmación de tu orden para ${order.serviceName}`,
    html: `<h1>¡Gracias por tu pago, ${order.userName}!</h1>
           <p>Hola, muchas Gracias por sumarte, feliz que comiences este recorrido. ${order.serviceName}.</p>
           <p>Te pido por favor que me envíes un mensaje a sarrofernanda21@gmail.com.</p>
           <p>Nombre y Apellido:</p>
           <p>Pais:</p>
           <p>WhatsApp: Con la característica del país correspondiente.</p>
           <p>Y si tenes análisis Clinicos recientes ( menor a 6 meses).</p>
           <p>Muchas Gracias.</p>
           <p>Licenciada Fernanda Sarro Nutricion Depurativa y Funcional.</p>`,
  });

  console.log(`Confirmation email sent successfully for order ${orderId}`);
}
