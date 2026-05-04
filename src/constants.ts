import { Property, BlogPost } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Ático de lujo con terraza panorámica',
    type: 'Venta',
    location: 'Martorell - Centre',
    price: 385000,
    sqm: 145,
    rooms: 3,
    bathrooms: 2,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAoLns08_hESkkpo8LDdtNDCZfKdWr5mP7AjThjSLALD92ombb4RSFfrsnQWPHpKH4acqs10GOoK_GbYpK0cVhiMNpn4B1mk-APgpSEH146KWc0AJ7Whzqpy1wPNOiyvhtaohAGAQ38nJaoHC75E1EWNlsPTSBUeln1DgsKK0qWLdtMkMso9sAE--pKzeO2AUJxf6aAq1ouLOwxPYYkVcz8_W7UalcGvtlLPoKdBPPemnZm4Vw5G02mrcAdxHUtXPNR4ke5tywiEQM',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTQLzpm8z9wvs1lY28lfjYE1z_RqkMHWBax7lLDQvS7HtqH0lWNTEN1JKAAn3rcTIT6da-LB2VBwT0pZoDZ6ZHxm6EA5UJOPJqqR2B6SGxfRjdmwkArkqzvIwTW2NXvUX5pNwVciqlxqYwf6ACl8fpsxnUM_1-NwidJeLZUIEjV6r4FvfXCpR2Ujl70gN9MfFs1OMV0XAQL4dA6c0w3Bvn4Tfahmi9Q97qKmazLWCwkX1jyccg8zpkGxvpNND8QErY7G_Fe-9tX34',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBIJewWM_1z148wGU1ZwTnt56rqKg_K0ggqd9W1Sv69i9o5eih4m8MMl5Mim8RFQQ7FTjqYjuAy91l5Qfuhyaod2eK2Yu7RmXeeqeff5_OG8fkeyZFI-AJh7mogi9IvXOz7fK0IwA7HZK5KUS-Wj10GJx0D4M17wJmEApmdhDMzTxrTTnOwhxF-qtVxCqXojlvTkGb21uk8Iu3bu_kYByENx93vWxUffozWNG2EqSN76ggeG0hLa5RlQR0-Vt5ZbX3IoA07dQwn7pg'
    ],
    exclusive: true,
    description: 'Exclusivo ático reformado con acabados de alta gama y gran terraza privada orientada al sur.'
  },
  {
    id: '2',
    title: 'Casa unifamiliar con jardín privado',
    type: 'Venta',
    location: 'Martorell - Camí Fondo',
    price: 520000,
    sqm: 210,
    rooms: 4,
    garage: 2,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBkpMdDFaJNDggkRPiK91lMZjTeh0YDtWTnC9dk1LUc0jveHGTqANhLsG7b-YQVS3zdHJ3Y-DEimvZcwuhu2Edq3JuoPGY9kS8IDPc0Oq31RK3cdo79YWDtxs85vxPML4vKdiUiKXoovH_hKFEMG2C1wwlSP4YoEAGheuLJQD3gQp4DvD6Clcq337q7I7mS3SuT1un9xpaffBMR4NnLU4V6q36T_jQv_2VwVWM6NRwT_MiinBa31ALkoSWSvDWum9oereg1X-mWILs',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTQLzpm8z9wvs1lY28lfjYE1z_RqkMHWBax7lLDQvS7HtqH0lWNTEN1JKAAn3rcTIT6da-LB2VBwT0pZoDZ6ZHxm6EA5UJOPJqqR2B6SGxfRjdmwkArkqzvIwTW2NXvUX5pNwVciqlxqYwf6ACl8fpsxnUM_1-NwidJeLZUIEjV6r4FvfXCpR2Ujl70gN9MfFs1OMV0XAQL4dA6c0w3Bvn4Tfahmi9Q97qKmazLWCwkX1jyccg8zpkGxvpNND8QErY7G_Fe-9tX34',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBIJewWM_1z148wGU1ZwTnt56rqKg_K0ggqd9W1Sv69i9o5eih4m8MMl5Mim8RFQQ7FTjqYjuAy91l5Qfuhyaod2eK2Yu7RmXeeqeff5_OG8fkeyZFI-AJh7mogi9IvXOz7fK0IwA7HZK5KUS-Wj10GJx0D4M17wJmEApmdhDMzTxrTTnOwhxF-qtVxCqXojlvTkGb21uk8Iu3bu_kYByENx93vWxUffozWNG2EqSN76ggeG0hLa5RlQR0-Vt5ZbX3IoA07dQwn7pg'
    ],
    description: 'Vivienda independiente con jardín privado y piscina comunitaria en zona residencial tranquila.'
  },
  {
    id: '3',
    title: 'Piso reformado con vistas a Montserrat',
    type: 'Alquiler',
    location: 'Martorell - Torrent de Llops',
    price: 1200,
    priceUnit: '€/mes',
    sqm: 95,
    rooms: 3,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA1rZS-a5PeNd06v7UDfpynywLFwgGT5bNHpChcEnmYwimxYCQhXCF0cG9s7vY0wV0ygiLTjq45ZLz0SKvIXLrsWrSDLZ3T8VA0jqMCqm9l1EeUnAcgG_1la1l_NzRMVGJnjgCJlufEt_ng05BRW3JWlPvVj3ABHuF9x-HIr6GLaGxKStjXF1TbNzdANhnD7u94_TyIDEu2mC3QD6P_1vLLqOaknWcM4Q3CSSaWKfNaT5B4YpMZhnlhPfQZVgjsB7EoJJFr23qc0EM',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTQLzpm8z9wvs1lY28lfjYE1z_RqkMHWBax7lLDQvS7HtqH0lWNTEN1JKAAn3rcTIT6da-LB2VBwT0pZoDZ6ZHxm6EA5UJOPJqqR2B6SGxfRjdmwkArkqzvIwTW2NXvUX5pNwVciqlxqYwf6ACl8fpsxnUM_1-NwidJeLZUIEjV6r4FvfXCpR2Ujl70gN9MfFs1OMV0XAQL4dA6c0w3Bvn4Tfahmi9Q97qKmazLWCwkX1jyccg8zpkGxvpNND8QErY7G_Fe-9tX34',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBIJewWM_1z148wGU1ZwTnt56rqKg_K0ggqd9W1Sv69i9o5eih4m8MMl5Mim8RFQQ7FTjqYjuAy91l5Qfuhyaod2eK2Yu7RmXeeqeff5_OG8fkeyZFI-AJh7mogi9IvXOz7fK0IwA7HZK5KUS-Wj10GJx0D4M17wJmEApmdhDMzTxrTTnOwhxF-qtVxCqXojlvTkGb21uk8Iu3bu_kYByENx93vWxUffozWNG2EqSN76ggeG0hLa5RlQR0-Vt5ZbX3IoA07dQwn7pg'
    ],
    rented: true,
    description: 'Piso totalmente reformado con vistas espectaculares, ideal para familias.'
  },
  {
    id: '4',
    title: 'Ático con vistas panorámicas',
    type: 'Alquiler',
    location: 'Martorell - Centre',
    price: 950,
    priceUnit: '€/mes',
    sqm: 85,
    rooms: 3,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAygktPqijZoU2uXIuQLtH_B8Yea4BsQFPz9zcbBR7ATqdLh0I2TzUAnv2OzOEUUA7zJpTUqq3LfdHjXxeQx9EQOuFFif4l1IkpJHpA7uqJcoURsm1UW6t1O6L944uJzcFZa51oIN1PFjmBsBGTGZVCIkiYiylDPMEu8FlJmBVzbR4ae53U_iD5VX2YAlspfB0BJ2ejmQAXpWURo0-9WxSotGBlWpba1xi_2IhCUa1O2JBV7AomqZtCS5e0ehUXzel7XSJNWq2kCbM',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTQLzpm8z9wvs1lY28lfjYE1z_RqkMHWBax7lLDQvS7HtqH0lWNTEN1JKAAn3rcTIT6da-LB2VBwT0pZoDZ6ZHxm6EA5UJOPJqqR2B6SGxfRjdmwkArkqzvIwTW2NXvUX5pNwVciqlxqYwf6ACl8fpsxnUM_1-NwidJeLZUIEjV6r4FvfXCpR2Ujl70gN9MfFs1OMV0XAQL4dA6c0w3Bvn4Tfahmi9Q97qKmazLWCwkX1jyccg8zpkGxvpNND8QErY7G_Fe-9tX34',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBIJewWM_1z148wGU1ZwTnt56rqKg_K0ggqd9W1Sv69i9o5eih4m8MMl5Mim8RFQQ7FTjqYjuAy91l5Qfuhyaod2eK2Yu7RmXeeqeff5_OG8fkeyZFI-AJh7mogi9IvXOz7fK0IwA7HZK5KUS-Wj10GJx0D4M17wJmEApmdhDMzTxrTTnOwhxF-qtVxCqXojlvTkGb21uk8Iu3bu_kYByENx93vWxUffozWNG2EqSN76ggeG0hLa5RlQR0-Vt5ZbX3IoA07dQwn7pg'
    ],
    description: 'Exclusivo ático reformado con acabados de alta gama y gran terraza privada orientada al sur.'
  },
  {
    id: '5',
    title: 'Casa unifamiliar moderna',
    type: 'Alquiler',
    location: 'Martorell - Camí Fondo',
    price: 1200,
    priceUnit: '€/mes',
    sqm: 120,
    rooms: 4,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAzam1oGo4x6iw0kWcC4zrPUmbMFG_3I6oFYEeT7FtLj_PH9-nF4MzJZdVFZUyh5l3BEH_wgfnQAm-ZP-gZvLRV6fo2qOq6sjTfr-MiZ0y3eaCSRjpt6BD48u5a6Yk_eqDitVWIu9BM3G3H_CoXcBo1Wa8TNgIkua5_uix8LSCahYJMjmUiMmxGnrj5GcNc436MOQHBKNG3a_TPVNhCvVNdOvWRHs5llGpG2JKNJ52fBc4JvslO-ZkaIubNin3XZXj_0uAVXo-XR9g',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTQLzpm8z9wvs1lY28lfjYE1z_RqkMHWBax7lLDQvS7HtqH0lWNTEN1JKAAn3rcTIT6da-LB2VBwT0pZoDZ6ZHxm6EA5UJOPJqqR2B6SGxfRjdmwkArkqzvIwTW2NXvUX5pNwVciqlxqYwf6ACl8fpsxnUM_1-NwidJeLZUIEjV6r4FvfXCpR2Ujl70gN9MfFs1OMV0XAQL4dA6c0w3Bvn4Tfahmi9Q97qKmazLWCwkX1jyccg8zpkGxvpNND8QErY7G_Fe-9tX34',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBIJewWM_1z148wGU1ZwTnt56rqKg_K0ggqd9W1Sv69i9o5eih4m8MMl5Mim8RFQQ7FTjqYjuAy91l5Qfuhyaod2eK2Yu7RmXeeqeff5_OG8fkeyZFI-AJh7mogi9IvXOz7fK0IwA7HZK5KUS-Wj10GJx0D4M17wJmEApmdhDMzTxrTTnOwhxF-qtVxCqXojlvTkGb21uk8Iu3bu_kYByENx93vWxUffozWNG2EqSN76ggeG0hLa5RlQR0-Vt5ZbX3IoA07dQwn7pg'
    ],
    description: 'Vivienda independiente con jardín privado y piscina comunitaria en zona residencial tranquila.'
  },
  {
    id: '6',
    title: 'Loft de diseño industrial',
    type: 'Alquiler',
    location: 'Martorell - El Pla',
    price: 750,
    priceUnit: '€/mes',
    sqm: 65,
    rooms: 1,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkLPxh7T_WNA2kadWowOh0UbZ4gIDHaVqxH45a6DiGZSBMFf-YqQ2K-o1wkgbBCI0j7MHjylreRkiTShbKQLbYr3MNSvkd1pzkcMLZvyQzlv6zvUTwYGn2YDFAncW-zQUbnNWj9oP1RWlXQduzJBqc9yttvC_BDTgtxVfHWOfH3sXNr6nDbc5dIwERl4DYuZm68boW5Iatxc_6vvO_BBhLC2cKQGMVgU40WaPFxAhT8F0QfzRzhz90qcODCMe8TEYnSB1AmqGe9kQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTQLzpm8z9wvs1lY28lfjYE1z_RqkMHWBax7lLDQvS7HtqH0lWNTEN1JKAAn3rcTIT6da-LB2VBwT0pZoDZ6ZHxm6EA5UJOPJqqR2B6SGxfRjdmwkArkqzvIwTW2NXvUX5pNwVciqlxqYwf6ACl8fpsxnUM_1-NwidJeLZUIEjV6r4FvfXCpR2Ujl70gN9MfFs1OMV0XAQL4dA6c0w3Bvn4Tfahmi9Q97qKmazLWCwkX1jyccg8zpkGxvpNND8QErY7G_Fe-9tX34',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBIJewWM_1z148wGU1ZwTnt56rqKg_K0ggqd9W1Sv69i9o5eih4m8MMl5Mim8RFQQ7FTjqYjuAy91l5Qfuhyaod2eK2Yu7RmXeeqeff5_OG8fkeyZFI-AJh7mogi9IvXOz7fK0IwA7HZK5KUS-Wj10GJx0D4M17wJmEApmdhDMzTxrTTnOwhxF-qtVxCqXojlvTkGb21uk8Iu3bu_kYByENx93vWxUffozWNG2EqSN76ggeG0hLa5RlQR0-Vt5ZbX3IoA07dQwn7pg'
    ],
    description: 'Espacio diáfano ideal para parejas o profesionales, totalmente equipado.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '¿Por qué Martorell se ha convertido en el refugio inmobiliario del Baix Llobregat?',
    category: 'MERCADO LOCAL',
    date: '15 MAR 2024',
    excerpt: 'Analizamos el crecimiento sostenido de los precios y la demanda creciente en zonas como Camí Fondo y el Centre.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDf0A6AfPXX5crcrPs6NKw9bH4DqGAVcgg-ZUsJLk718mvFb1CEwlH0zJjUu2yPWLKickLb0u1icTbv_Ed5zQtBu37ZeyAGJwwOgpOFEN7U2F64aqbVoDvSjaWCBnARLaX-wwde0TzH6n_8f8UmGdvTX8OzqAnR2sqpnbWG31xVrTIPL231PKscBxYgi15hdVIne7RjsGiWomnGScp5GadDbO11svV5KRoSbY9VcWARh4AeoVT49IDYq0Wv7Jmtfhm-I99rB_ZA40',
    author: {
      name: 'Joan Serra',
      role: 'Director de Estrategia',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZMSU5qS9b8wpXcI15e1XV3AGV4bIn4CgexnF_v60VbSWsnM9CGR9gmTuvsG0VHidbGnEhpmkFUdVqMncI0YYA-ezF8SE2e0TnIAka8zQMDlLK5ZyY9ll5Kf52OoJnQQ88LiG4Pr1cnl6Eulg9gdT-DqQqjKvoKXnAJU_GZUkUWxYYN_Kvw87QQaeR_HwbO6lBJSJM88XN5zihK7F4DJLxhIOFA_fqFXyPssXQU-JbUe3PAtnSLsel7Vd3q5ViSdRFUsxq__xqv7E'
    },
    content: `Martorell se ha consolidado como uno de los nodos logísticos e industriales más potentes de Cataluña, pero su atractivo no se limita al ámbito laboral. En los últimos años, hemos observado una tendencia clara: familias y jóvenes profesionales que buscan escapar de los precios prohibitivos de Barcelona encuentran en nuestra ciudad el equilibrio perfecto entre servicios, conectividad y calidad de vida.

### El factor conectividad
La ubicación estratégica de Martorell, con acceso directo a la AP-7, la A-2 y una red de transporte público envidiable (FGC y Renfe), permite estar en el centro de Barcelona en menos de 45 minutos. Esto ha disparado la demanda en barrios consolidados como **Camí Fondo** y el **Centre**.

### Precios competitivos vs Barcelona
Mientras que en la capital el precio por metro cuadrado sigue batiendo récords, en Martorell todavía es posible adquirir viviendas de alta calidad, como áticos con terraza o casas unifamiliares, por una fracción del coste.

### Inversión segura
Para el inversor, Martorell ofrece una rentabilidad bruta por alquiler muy superior a la media del área metropolitana. La presencia de grandes empresas como SEAT garantiza una demanda constante de perfiles solventes.

En JSF Finques, estamos convencidos de que Martorell no es solo un refugio, sino una apuesta de futuro para quienes valoran la estabilidad y el crecimiento patrimonial.`
  },
  {
    id: '2',
    title: 'La importancia de una tasación profesional en el mercado actual',
    category: 'TÉCNICO',
    date: '10 MAR 2024',
    excerpt: 'No deje que el azar decida el precio de su patrimonio. Descubra cómo influyen el AICAT y la ubicación.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJPVR-vMP1EdYVE8kpjd2k61hkeSgJLaqQCTX2N_muetRb5ypDGFxl1q-MwX4FKvPzvu4j9om046fVNTx1ZrsoXDoqfwDxobE4U5SvotDg5IIMM0YAV551d3RjiuBVCi70a3xwaq9cxXQi8fEfNKaJ9VgdWpf0bv_0GMZS8h9S1lvdXysOhGrKy3ImiJ6UjiA2TYdP849YjV0lQ-JD7UbobryAPqh4WFDd08hWPN7q-IDelrKdYfXwHd1K04NM8X37OVp8YY20H7M',
    author: {
      name: 'Jose Solis',
      role: 'Tasador Judicial',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkY4nmuKhHxKTIqLgGhJlyCewJNl__Iz0AmNjIfPt1TQqta5axH5FslYhdE-0hZqU7LFWe7fHIOcegYqK6h4mLNm7OHRwHwBgsnTgvlm-EIVbO1JTlAwDmOlN_eflLJsfJBFli-QQk20ttUGHErbrM1xXTIZgPR6PN48J8aXIznPOVewN-km6FlUkaIGs4NKqMmbPM-lGBlKdP4lh3EUtdsl_4-2a7xB3WtpThi_zNw1lO2i0PyGd8pC7MEGfA4TRhXhpv5lxD-Iw'
    },
    content: `Poner precio a una vivienda no es una ciencia exacta, pero sí una disciplina técnica que requiere rigor. Muchos propietarios caen en el error de fijar el precio basándose en el "valor sentimental" o en lo que pide el vecino, lo cual suele derivar en meses de espera y quemar el producto en el mercado.

### ¿Qué es una tasación profesional?
A diferencia de una valoración online gratuita, una tasación realizada por un perito judicial inmobiliario tiene en cuenta factores intrsecos y extrínsecos:
- **Estado de conservación real:** Instalaciones, eficiencia energética y reformas.
- **Entorno:** Proyectos urbanísticos futuros, servicios cercanos y demanda específica de la calle.
- **Datos de registro:** Precios reales de venta final, no precios de oferta en portales.

### La garantía AICAT
Contar con un agente colegiado (AICAT 8394) asegura que el profesional está sujeto a un código deontológico y posee los seguros de responsabilidad civil necesarios. En un mercado tan volátil como el actual, la autoridad técnica es su mejor aliada para cerrar una venta exitosa en el menor tiempo posible.

Una tasación correcta es el primer paso para una venta sin sorpresas. En JSF Finques, protegemos su patrimonio con datos, no con suposiciones.`
  },
  {
    id: '3',
    title: '5 Consejos de Home Staging para vender su vivienda en 30 días',
    category: 'VENTAS',
    date: '05 MAR 2024',
    excerpt: 'Pequeños cambios visuales que generan grandes retornos. Cómo preparar su hogar para las visitas.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmWXqIg9ZXRhMAdZt4rtnevXHdKwzVBMS7yE1fKa2MzW7r5wmVUhVaDLy0C8W3YWs9B7gmRQ9S9vs9DXUNEbTbJZT5ApeH_ogFIqzECv6HNCFrr1fxNRkw9JWPFLFEg5lGK5nFpGWVTalyj7b_4GZ3731-oNiJik18tXhAITC1PkrqXinzd2fNqJiEeA1a2lQCY0_csAeuuwEh832xY9LUnBMwRLO1nrtrKZ7K3LVvJx2ydv4g1RHdYpk185iQkuB3zNUaC5qMRUk',
    author: {
      name: 'Jose Solis',
      role: 'Tasador Judicial',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkY4nmuKhHxKTIqLgGhJlyCewJNl__Iz0AmNjIfPt1TQqta5axH5FslYhdE-0hZqU7LFWe7fHIOcegYqK6h4mLNm7OHRwHwBgsnTgvlm-EIVbO1JTlAwDmOlN_eflLJsfJBFli-QQk20ttUGHErbrM1xXTIZgPR6PN48J8aXIznPOVewN-km6FlUkaIGs4NKqMmbPM-lGBlKdP4lh3EUtdsl_4-2a7xB3WtpThi_zNw1lO2i0PyGd8pC7MEGfA4TRhXhpv5lxD-Iw'
    },
    content: `El Home Staging no es decorar, es preparar una vivienda para que guste al mayor número de personas posible. Aquí tiene 5 claves:

1. **Despersonalizar:** Quite fotos familiares y objetos muy personales. El comprador debe imaginarse viviendo allí.
2. **Iluminación:** Abra persianas y use bombillas de luz cálida. Una casa oscura no se vende.
3. **Reparaciones menores:** Ese grifo que gotea o la persiana encallada dan sensación de abandono. Arréglelo.
4. **Limpieza profunda:** Es el factor más económico y el que más impacto tiene.
5. **Aromatización:** El olor a café recién hecho o a limpio evoca sensaciones positivas.

En JSF Finques incluimos asesoramiento de Home Staging en nuestros servicios exclusivos.`
  },
  {
    id: '4',
    title: 'Guía para el primer comprador: Hipotecas y trámites en 2024',
    category: 'GUÍA',
    date: '01 MAR 2024',
    excerpt: 'Todo lo que necesita saber antes de firmar las arras. Desglose de impuestos y gastos.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOz75NDz2GRZfjwTCXVystFDivh_YlV8rSX2ykakIclRzhp2LldkTqb-TM7YpNZMAYcfE2ejbPqFu1B8s4ARI8iuWoZ63QtA9loucVO9Q4_oxEKuMXFm_7t2uBdsFhV6xFsDGb-jQvccraqPGR9ivc5NE5zJylGhwvTUBUtZlfPtcSYgN2hzvC7BOVNoiDtNct68pVlAPAp9SeYVSYmNSGJYp13WMAoxmbizaRSdDyyu5xBnwBiFqe3wweySZu0PZml3AreoZv5vQ',
    author: {
      name: 'Joan Serra',
      role: 'Director de Estrategia',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZMSU5qS9b8wpXcI15e1XV3AGV4bIn4CgexnF_v60VbSWsnM9CGR9gmTuvsG0VHidbGnEhpmkFUdVqMncI0YYA-ezF8SE2e0TnIAka8zQMDlLK5ZyY9ll5Kf52OoJnQQ88LiG4Pr1cnl6Eulg9gdT-DqQqjKvoKXnAJU_GZUkUWxYYN_Kvw87QQaeR_HwbO6lBJSJM88XN5zihK7F4DJLxhIOFA_fqFXyPssXQU-JbUe3PAtnSLsel7Vd3q5ViSdRFUsxq__xqv7E'
    },
    content: `Comprar su primera vivienda es emocionante, pero el laberinto burocrático puede ser abrumador.

### Gastos e Impuestos
En Cataluña, debe calcular aproximadamente un 12-13% adicional sobre el precio de venta:
- **ITP (Impuesto de Transmisiones Patrimoniales):** Generalmente el 10%.
- **Notaría y Registro:** Alrededor del 1-2%.
- **Gestoría:** Gastos de tramitación.

### La Hipoteca
En 2024, los tipos de interés están estabilizándose. Le recomendamos comparar entre tipo fijo, variable y mixto. Recuerde que el banco suele financiar el 80% del valor de tasación, por lo que necesitará tener ahorrado el 20% restante más los gastos.

### El contrato de Arras
Es el documento que blinda la operación. Nunca firme nada sin que un profesional lo revise.

En JSF Finques le acompañamos desde la primera visita hasta la firma en notaría, asegurando que su primera compra sea un éxito.`
  }
];
