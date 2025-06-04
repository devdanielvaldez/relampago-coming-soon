import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Store, Clock, Send, Check, ChevronDown, Sparkles, MapPin } from 'lucide-react';
import logoImage from './assets/logo.png';
import deliveryImage from './assets/Delivery.png';
import selectFoodImage from './assets/SelectFood.png';
import selectLocationImage from './assets/SelectYourLocation.png';
import { createClient } from "smtpexpress"

const smtpexpressClient = createClient({
  projectId: "sm0pid-t5x_S8m0SWiFT6MwL0mxiybgj",
  projectSecret: "50440c1d7a86ad8350f480b97e816c1ee4e5530e3d9647d113"
});

function App() {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email || !userType) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.turbo-smtp.com/api/v2/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'consumerKey': 'f3e89e82897d45e9be1dff1f21bde71f',
          'consumerSecret': 'HfS2TogWtxVLIzrdwhD9cpXKslOUjAaP'
        },
        body: JSON.stringify({ 
          from: 'no-reply@relampagoexpress.com',
          to: email,
          content: getUserTypeContent(userType, email),
          html_content: `<p>${getUserTypeContent(userType, email)}</p>`,
          subject: '¡Bienvenido a RelampagoExpress!',
        }),
      });

      // await smtpexpressClient.sendApi.sendMail({
      //   // Subject of the email
      //   subject: `Nuevo cliente registrado en Relampago - ${userType}`,
      //   // Body of the email
      //   message: `<h2>Nuevo interesado de tipo: ${userType}, su email es: ${email}</h2>`,
      //   // Sender's details
      //   sender: {
      //     // Sender's name
      //     name: "Relampago Express",
      //     // Sender's email address
      //     email: "relampago-15fecc@smtpexpress.email",
      //   },
      //   // Recipient's details
      //   recipients: {
      //     // Recipient's email address (obtained from the form)
      //     email: "hello@daniel-valdez.com",
      //   },
      // });

      // await smtpexpressClient.sendApi.sendMail({
      //   // Subject of the email
      //   subject: `Bienvenido a Relampago Express`,
      //   // Body of the email
      //   message: `<h2>${getUserTypeContent(userType, email)}</h2>`,
      //   // Sender's details
      //   sender: {
      //     // Sender's name
      //     name: "Relampago Express",
      //     // Sender's email address
      //     email: "relampago-15fecc@smtpexpress.email",
      //   },
      //   // Recipient's details
      //   recipients: {
      //     // Recipient's email address (obtained from the form)
      //     email: email,
      //   },
      // });
      
      setSuccess(true);
      setEmail('');
      setUserType(null);
      
      // Resetear el estado de éxito después de 5 segundos
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para generar contenido personalizado según el tipo de usuario
  const getUserTypeContent = (type: any, email: any) => {
    const userTypes: any = {
      driver: {
        title: 'Únete a nuestro equipo de Delivery',
        message: `Hola futuro repartidor de RelampagoExpress. Gracias por registrarte con ${email}. Te contactaremos pronto con instrucciones para comenzar a ganar hasta RD$20,000 semanales.`
      },
      business: {
        title: 'Impulsa tu negocio con RelampagoExpress',
        message: `Hola emprendedor. Gracias por registrar tu negocio con ${email}. Pronto te contactaremos para ofrecerte las comisiones más bajas del mercado.`
      },
      customer: {
        title: 'Bienvenido a RelampagoExpress',
        message: `¡Hola! Gracias por registrarte con ${email}. Te notificaremos en cuanto lancemos nuestra aplicación para que puedas disfrutar de entregas instantáneas en San Francisco de Macorís.`
      }
    };
    
    return userTypes[type];
  };
  
  // Variantes para animaciones
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    transition: { duration: 2, repeat: Infinity }
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 text-white overflow-x-hidden">
      {/* Patrón de fondo animado */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0,_transparent_50%)]"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      {/* Barra de navegación con efecto al desplazar */}
      <motion.header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-red-600/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <motion.img 
              src={logoImage} 
              alt="RelampagoExpress" 
              className="h-10"
              whileHover={{ rotate: 10 }}
            />
            <motion.span 
              className="text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              RelampagoExpress
            </motion.span>
          </div>
          
          <motion.div 
            className="hidden md:flex items-center space-x-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {["Inicio", "Servicios"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-amber-200 transition-colors"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.header>

      {/* Héroe con animación mejorada */}
      <motion.section 
        id="inicio"
        className="relative pt-28 min-h-screen flex items-center"
      >
        <div className="container mx-auto px-4 py-16 z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                animate={pulseAnimation}
                className="inline-flex items-center px-3 py-1 mb-6 bg-white/20 text-sm backdrop-blur-sm rounded-full border border-white/30"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                <span>¡Próximamente en San Francisco de Macorís!</span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                La Primera App de 
                <motion.span 
                  className="bg-gradient-to-r from-amber-200 to-yellow-300 text-transparent bg-clip-text"
                  animate={{ 
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "linear" 
                  }}
                > Delivery </motion.span>
                que necesitas
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl mb-8 text-white/90"
              >
                Entregas ultrarrápidas, comisiones bajas y la mejor experiencia para clientes.
                ¡Regístrate ahora para ser el primero en saber cuando lancemos!
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center space-x-4"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(n => (
                    <div key={n} className={`w-10 h-10 rounded-full bg-gradient-to-r from-amber-${n*100} to-orange-${n*100} border-2 border-white flex items-center justify-center text-xs font-bold`}>
                      {n}º
                    </div>
                  ))}
                </div>
                <span className="text-sm">Más de 100 personas ya se han registrado</span>
              </motion.div>
              
              <motion.div
                className="mt-8 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <MapPin className="h-5 w-5 mr-2 text-amber-200" />
                <span className="text-amber-200">San Francisco de Macorís, Rep. Dom.</span>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative z-10"
            >
              <motion.div 
                className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20"
                whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              >
                <h3 className="text-2xl font-bold mb-6 text-center">
                  {success ? '¡Gracias por registrarte!' : 'Únete a la lista de espera'}
                </h3>
                
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        className="w-20 h-20 bg-green-500 mx-auto rounded-full flex items-center justify-center mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <Check className="w-10 h-10" />
                      </motion.div>
                      <p className="text-lg mb-4">Te notificaremos cuando lancemos la app</p>
                      <p className="text-sm opacity-80">Revisa tu correo electrónico</p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      onSubmit={handleSubmit} 
                      className="space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                      >
                        <motion.div variants={fadeInUp}>
                          <label className="block text-sm font-medium mb-3">Soy un:</label>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { id: 'driver', icon: Rocket, label: 'Delivery' },
                              { id: 'business', icon: Store, label: 'Negocio' },
                              { id: 'customer', icon: Clock, label: 'Cliente' }
                            ].map((option: any) => (
                              <motion.button
                                key={option.id}
                                type="button"
                                onClick={() => setUserType(option.id)}
                                className={`p-4 rounded-xl border-2 transition-all ${
                                  userType === option.id 
                                    ? 'border-amber-300 bg-gradient-to-r from-amber-500/30 to-orange-500/30 shadow-lg' 
                                    : 'border-white/20 hover:border-white/40 hover:bg-white/10'
                                }`}
                                whileHover={{ translateY: -5 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <motion.div 
                                  className="mx-auto mb-2"
                                  whileHover={{ rotate: 10 }}
                                >
                                  <option.icon className={`mx-auto ${userType === option.id ? 'text-amber-300' : ''}`} />
                                </motion.div>
                                <span className="text-sm">{option.label}</span>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                        
                        <motion.div variants={fadeInUp} className="mt-6">
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Correo Electrónico
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/30 focus:border-amber-300 focus:outline-none focus:bg-white/20 transition-all placeholder-white/50"
                              placeholder="tu@email.com"
                              required
                            />
                          </div>
                        </motion.div>

                        <motion.button
                          variants={fadeInUp}
                          type="submit"
                          disabled={isSubmitting || !email || !userType}
                          className={`mt-6 w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 ${
                            !email || !userType 
                              ? 'bg-white/50 cursor-not-allowed' 
                              : 'bg-gradient-to-r from-amber-400 to-orange-500 text-red-900 hover:from-amber-300 hover:to-orange-400 shadow-lg hover:shadow-amber-500/30'
                          } transition-all`}
                          whileHover={{ scale: !isSubmitting && email && userType ? 1.03 : 1 }}
                          whileTap={{ scale: !isSubmitting && email && userType ? 0.98 : 1 }}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Enviando...
                            </span>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              <span>Notifícame al lanzar</span>
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Ciudad ilustración */}
              {/* <motion.img 
                src={cityImage} 
                alt="Ciudad"
                className="absolute -bottom-16 w-full opacity-30 z-0"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 0.3 }}
                transition={{ delay: 0.6, duration: 1 }}
              /> */}
            </motion.div>
          </div>
        </div>
        
        {/* Indicador de desplazamiento */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/70" />
        </motion.div>
      </motion.section>

      {/* Sección de características con tarjetas mejoradas */}
      <motion.section 
        id="servicios"
        className="relative py-24 bg-gradient-to-b from-transparent to-red-700"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold">Para todos en San Francisco de Macorís</h2>
            <p className="text-xl mt-4 max-w-2xl mx-auto text-white/80">
              Una plataforma revolucionaria que conecta clientes, negocios y repartidores
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: deliveryImage,
                title: "Para Deliverys",
                description: "Gana hasta RD$20,000 por semana sin pagar comisiones. ¡Sé tu propio jefe y maximiza tus ganancias!",
                icon: Rocket,
                color: "from-amber-400 to-yellow-300"
              },
              {
                image: selectFoodImage,
                title: "Para Negocios",
                description: "Disfruta de las comisiones más bajas del mercado. Aumenta tus ventas sin sacrificar tus ganancias.",
                icon: Store,
                color: "from-orange-400 to-rose-300"
              },
              {
                image: selectLocationImage,
                title: "Para Clientes",
                description: "Tu comida llegará al instante. Paga fácilmente y disfruta de un servicio rápido y confiable.",
                icon: Clock,
                color: "from-red-400 to-pink-300"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-bl-full"></div>
                
                <div className="p-8">
                  <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-r ${item.color}`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <motion.img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 object-contain mb-6"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                  />
                  
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-white/80">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Footer */}
      <footer className="bg-red-900 py-12 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img src={logoImage} alt="RelampagoExpress" className="h-10 mb-4" />
              <p className="text-white/70">© 2025 RelampagoExpress. Todos los derechos reservados.</p>
            </div>
            {/* <div className="flex space-x-6">
              {["Instagram", "Facebook", "Twitter", "WhatsApp"].map(social => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-white/70 hover:text-white"
                  whileHover={{ scale: 1.2 }}
                >
                  {social}
                </motion.a>
              ))}
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;