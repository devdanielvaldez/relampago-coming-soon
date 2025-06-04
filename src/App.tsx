import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Store, Clock, ExternalLink, ChevronDown, Sparkles, MapPin } from 'lucide-react';
import logoImage from './assets/logo.png';
import deliveryImage from './assets/Delivery.png';
import selectFoodImage from './assets/SelectFood.png';
import selectLocationImage from './assets/SelectYourLocation.png';

// Configuración de los colores corporativos
const colors = {
  primary: '#000000',    // Rojo corporativo
  secondary: '#FFCC00',  // Amarillo corporativo
  black: '#DA291C',      // Negro
  white: '#FFFFFF'       // Blanco
};

function App() {
  const [userType, setUserType] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  
  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Redirigir al formulario de Google con la información del tipo de usuario
  const redirectToForm = () => {
    const formUrl = 'https://forms.gle/JmF72KaxZphDG6Rt6';
    // Aquí podrías añadir parámetros URL si el Google Form los soportara
    window.open(formUrl, '_blank');
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
    <div className="min-h-screen font-sans text-white overflow-x-hidden" style={{ 
      background: `linear-gradient(135deg, ${colors.primary} 0%, #FF5A46 100%)` 
    }}>
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
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{ 
          backgroundColor: scrolled ? `${colors.primary}E6` : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          padding: scrolled ? '0.5rem 0' : '1rem 0',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none'
        }}
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
              Relampago Express
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
                className="text-white hover:text-secondary transition-colors"
                style={{ 
                  textShadow: '0px 1px 2px rgba(0,0,0,0.3)'
                }}
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
                className="inline-flex items-center px-3 py-1 mb-6 text-sm rounded-full border border-white/30"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <Sparkles className="w-4 h-4 mr-2" style={{ color: colors.secondary }} />
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
                  style={{ 
                    color: colors.secondary,
                    textShadow: '0px 2px 4px rgba(0,0,0,0.2)'
                  }}
                  animate={{ 
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut" 
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
                    <div 
                      key={n} 
                      className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold"
                      style={{ background: `linear-gradient(135deg, ${colors.secondary}${n*20} 0%, ${colors.secondary} 100%)` }}
                    >
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
                <MapPin className="h-5 w-5 mr-2" style={{ color: colors.secondary }} />
                <span style={{ color: colors.secondary }}>San Francisco de Macorís, Rep. Dom.</span>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative z-10"
            >
              <motion.div 
                className="rounded-2xl p-8 shadow-xl border border-white/20"
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }}
                whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              >
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Únete a la lista de espera
                </h3>
                
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="space-y-6"
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
                          className={`p-4 rounded-xl border-2 transition-all`}
                          style={{
                            borderColor: userType === option.id ? colors.secondary : 'rgba(255, 255, 255, 0.2)',
                            backgroundColor: userType === option.id ? 'rgba(255, 204, 0, 0.2)' : 'transparent',
                            boxShadow: userType === option.id ? '0 4px 12px rgba(255, 204, 0, 0.3)' : 'none'
                          }}
                          whileHover={{ translateY: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div 
                            className="mx-auto mb-2"
                            whileHover={{ rotate: 10 }}
                          >
                            <option.icon 
                              className="mx-auto" 
                              style={{ 
                                color: userType === option.id ? colors.secondary : '#fff'
                              }} 
                            />
                          </motion.div>
                          <span className="text-sm">{option.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.button
                    variants={fadeInUp}
                    onClick={redirectToForm}
                    disabled={!userType}
                    className="w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 transition-all"
                    style={{
                      backgroundColor: !userType ? 'rgba(255, 255, 255, 0.5)' : colors.secondary,
                      color: !userType ? 'rgba(0, 0, 0, 0.5)' : colors.black,
                      cursor: !userType ? 'not-allowed' : 'pointer',
                      boxShadow: !userType ? 'none' : '0 4px 15px rgba(255, 204, 0, 0.4)'
                    }}
                    whileHover={{ 
                      scale: userType ? 1.03 : 1,
                      boxShadow: userType ? '0 6px 20px rgba(255, 204, 0, 0.6)' : 'none'
                    }}
                    whileTap={{ scale: userType ? 0.98 : 1 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Completar registro</span>
                  </motion.button>
                  
                  <motion.p 
                    variants={fadeInUp}
                    className="text-center text-xs opacity-80"
                  >
                    Te redirigiremos a un formulario para completar tu registro
                  </motion.p>
                </motion.div>
              </motion.div>
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
        className="relative py-24"
        style={{ 
          background: `linear-gradient(to bottom, ${colors.primary}00, ${colors.primary})` 
        }}
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
                color: colors.secondary
              },
              {
                image: selectFoodImage,
                title: "Para Negocios",
                description: "Disfruta de las comisiones más bajas del mercado. Aumenta tus ventas sin sacrificar tus ganancias.",
                icon: Store,
                color: colors.secondary
              },
              {
                image: selectLocationImage,
                title: "Para Clientes",
                description: "Tu comida llegará al instante. Paga fácilmente y disfruta de un servicio rápido y confiable.",
                icon: Clock,
                color: colors.secondary
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-white/20 shadow-xl"
                style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(10px)'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  backgroundColor: 'rgba(0, 0, 0, 0.7)'
                }}
              >
                <div 
                  className="absolute top-0 right-0 w-20 h-20 rounded-bl-full"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.secondary}40, transparent)` 
                  }}
                ></div>
                
                <div className="p-8">
                  <div 
                    className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.secondary}, ${colors.secondary}90)`,
                      boxShadow: `0 8px 16px ${colors.secondary}40`
                    }}
                  >
                    <item.icon className="w-8 h-8 text-black" />
                  </div>
                  
                  <motion.img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 object-contain mb-6"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                  />
                  
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-white/80">{item.description}</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={redirectToForm}
                    className="mt-6 px-6 py-2 rounded-lg font-medium text-sm inline-flex items-center"
                    style={{ 
                      backgroundColor: colors.secondary,
                      color: colors.black
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Registrarme
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Footer */}
      <footer 
        className="py-12 px-4 relative z-10"
        style={{ backgroundColor: colors.black }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img src={logoImage} alt="RelampagoExpress" className="h-10 mb-4" />
              <p className="text-white/70">© 2025 RelampagoExpress. Todos los derechos reservados.</p>
            </div>
            <div>
              <button 
                onClick={redirectToForm}
                className="px-6 py-3 rounded-lg font-bold inline-flex items-center"
                style={{ 
                  backgroundColor: colors.secondary,
                  color: colors.black
                }}
              >
                Únete ahora
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;