# 🏥 DEPADOC MVP - Plataforma Educativa para Preparación de Exámenes Médicos

## 📋 Descripción del Proyecto

DEPADOC MVP es una plataforma educativa innovadora diseñada específicamente para la preparación de exámenes médicos. Utiliza inteligencia artificial para generar exámenes personalizados basados en documentos médicos subidos por los usuarios, proporcionando una experiencia de aprendizaje adaptativa y eficiente.

### 🎯 Objetivo Principal
Crear una herramienta que permita a estudiantes de medicina y profesionales de la salud prepararse de manera efectiva para sus exámenes, utilizando sus propios materiales de estudio y generando evaluaciones personalizadas con IA.

## ✨ Funcionalidades Implementadas

### 🔐 Sistema de Autenticación
- ✅ Registro e inicio de sesión con Supabase Auth
- ✅ Gestión de sesiones seguras
- ✅ Protección de rutas privadas

### 📊 Dashboard Principal
- ✅ Vista general de estadísticas del usuario
- ✅ Progreso de estudio personalizado
- ✅ Navegación intuitiva entre secciones

### 📚 Gestión de Documentos
- ✅ Subida de documentos PDF
- ✅ Procesamiento y almacenamiento en Supabase
- ✅ Visualización de documentos subidos
- ✅ Organización por categorías

### 🧠 Generación de Exámenes con IA
- ✅ Creación de preguntas basadas en documentos subidos
- ✅ Diferentes tipos de preguntas (opción múltiple, verdadero/falso)
- ✅ Configuración personalizable de exámenes
- ✅ Sistema de evaluación automática

### 🎨 Interfaz de Usuario
- ✅ Diseño moderno y responsivo con Tailwind CSS
- ✅ Componentes reutilizables con shadcn/ui
- ✅ Tema claro/oscuro
- ✅ Animaciones fluidas con Framer Motion

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca principal para la interfaz de usuario
- **TypeScript 5.5.3** - Tipado estático para mayor robustez
- **Vite 5.4.1** - Herramienta de construcción y desarrollo rápido
- **React Router DOM 6.30.1** - Enrutamiento del lado del cliente

### Estilos y UI
- **Tailwind CSS 3.4.11** - Framework de CSS utilitario
- **shadcn/ui** - Componentes de UI modernos y accesibles
- **Radix UI** - Primitivos de UI sin estilos
- **Framer Motion 12.12.1** - Animaciones y transiciones
- **Lucide React 0.462.0** - Iconos modernos

### Backend y Base de Datos
- **Supabase 2.49.7** - Backend como servicio (BaaS)
- **PostgreSQL** - Base de datos relacional (a través de Supabase)
- **Supabase Auth** - Sistema de autenticación

### Gestión de Estado y Datos
- **Zustand 5.0.5** - Gestión de estado global
- **TanStack Query 5.79.0** - Gestión de estado del servidor y caché
- **React Hook Form 7.53.0** - Gestión de formularios
- **Zod 3.23.8** - Validación de esquemas

### Utilidades
- **pdf-lib 1.17.1** - Manipulación de archivos PDF
- **date-fns 3.6.0** - Manipulación de fechas
- **clsx 2.1.1** - Utilidad para clases CSS condicionales

## 📦 Instalación y Configuración

### Prerrequisitos
- **Node.js** (versión 18 o superior)
- **npm** o **yarn** o **bun**
- Cuenta en **Supabase**

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/WIZNEOAI/depadoc-mvp.git
cd depadoc-mvp
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
bun install
```

3. **Configurar variables de entorno**
Crear un archivo `.env.local` en la raíz del proyecto:
```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

4. **Configurar Supabase**
- Crear un nuevo proyecto en [Supabase](https://supabase.com)
- Ejecutar las migraciones de la base de datos (ubicadas en `/supabase/migrations/`)
- Configurar las políticas de seguridad (RLS)

5. **Iniciar el servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
# o
bun dev
```

6. **Abrir en el navegador**
Visita `http://localhost:5173` para ver la aplicación.

## 🗂️ Estructura del Proyecto

```
depadoc-mvp/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── auth/          # Componentes de autenticación
│   │   ├── dashboard/     # Componentes del dashboard
│   │   ├── exam/          # Componentes de exámenes
│   │   ├── onboarding/    # Componentes de onboarding
│   │   └── ui/            # Componentes de UI base
│   ├── hooks/             # Hooks personalizados
│   ├── integrations/      # Integraciones externas (Supabase)
│   ├── lib/               # Utilidades y configuraciones
│   ├── pages/             # Páginas principales
│   ├── services/          # Servicios y APIs
│   ├── store/             # Gestión de estado global
│   └── utils/             # Funciones utilitarias
├── supabase/              # Configuración de Supabase
│   ├── migrations/        # Migraciones de base de datos
│   └── config.toml        # Configuración local
└── ...archivos de configuración
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run build:dev` - Construye en modo desarrollo
- `npm run lint` - Ejecuta el linter
- `npm run preview` - Previsualiza la build de producción

## 🚧 Funcionalidades Pendientes por Implementar

### 🔄 Mejoras en el Sistema de Exámenes
- [ ] **Tipos de preguntas avanzadas**: Preguntas de emparejamiento, ordenamiento, respuesta corta
- [ ] **Banco de preguntas**: Sistema para guardar y reutilizar preguntas generadas
- [ ] **Exámenes cronometrados**: Implementar temporizadores para simular condiciones reales
- [ ] **Revisión de exámenes**: Permitir revisar respuestas después de completar un examen

### 📈 Analytics y Reportes
- [ ] **Estadísticas detalladas**: Análisis de rendimiento por tema y tipo de pregunta
- [ ] **Progreso histórico**: Gráficos de evolución del rendimiento
- [ ] **Reportes exportables**: Generar PDFs con resultados y análisis
- [ ] **Comparativas**: Comparar rendimiento con otros usuarios (anonimizado)

### 🤖 Mejoras en IA
- [ ] **IA más avanzada**: Integración con modelos más potentes (GPT-4, Claude)
- [ ] **Preguntas adaptativas**: Ajustar dificultad según el rendimiento del usuario
- [ ] **Explicaciones automáticas**: Generar explicaciones detalladas para cada respuesta
- [ ] **Detección de temas débiles**: Identificar áreas que necesitan más estudio

### 👥 Funcionalidades Sociales
- [ ] **Grupos de estudio**: Crear y unirse a grupos colaborativos
- [ ] **Competencias**: Desafíos entre usuarios
- [ ] **Foros de discusión**: Espacios para resolver dudas
- [ ] **Mentorías**: Sistema de conexión entre estudiantes y profesionales

### 📱 Mejoras de UX/UI
- [ ] **Aplicación móvil**: Versión nativa para iOS y Android
- [ ] **Modo offline**: Permitir estudiar sin conexión a internet
- [ ] **Notificaciones**: Recordatorios de estudio y nuevos contenidos
- [ ] **Personalización avanzada**: Temas personalizables, configuraciones de estudio

### 🔒 Seguridad y Administración
- [ ] **Panel de administración**: Gestión de usuarios y contenido
- [ ] **Moderación de contenido**: Sistema para revisar documentos subidos
- [ ] **Backup automático**: Respaldos regulares de datos de usuario
- [ ] **Auditoría de seguridad**: Logs de actividad y accesos

### 💰 Monetización
- [ ] **Planes de suscripción**: Freemium con funcionalidades premium
- [ ] **Marketplace de contenido**: Venta de materiales de estudio
- [ ] **Certificaciones**: Emisión de certificados de completación
- [ ] **API para instituciones**: Integración con universidades y centros de formación

## 🤝 Contribución

Este proyecto está en desarrollo activo. Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

Para preguntas, sugerencias o colaboraciones, puedes contactar a través de:
- GitHub Issues: [Crear un issue](https://github.com/WIZNEOAI/depadoc-mvp/issues)
- Email: [Contacto del desarrollador]

---

**Desarrollado con ❤️ para la comunidad médica y educativa**