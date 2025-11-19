# Respuestas: Página `/precio/*` - Global66

## 1. ¿Qué metas técnicas y de negocio monitorearías en `/precio/*`?

**Técnicas:** Core Web Vitals (LCP <2.5s, CLS <0.1), tiempo de carga <3s, y que todas las divisas estén indexadas correctamente. Verificar que el schema `ExchangeRateSpecification` se renderice bien para rich snippets.

**Negocio:** CTR al CTA (objetivo >3%), tiempo en página >60s, scroll depth (especialmente hasta el CTA), y tasa de rebote <50%. Por divisa: posiciones en SERP para queries como "precio dólar [divisa]", tráfico orgánico segmentado, y conversión por divisa para identificar cuáles convierten mejor.

**Stack:** Google Analytics 4 para eventos personalizados (scroll depth, clicks en CTA), Search Console para SEO, y Hotjar para ver comportamiento real de usuarios.

---

## 2. Caída del 20% orgánico en "precio dólar" para CLP: ¿cómo la investigarías y qué acciones tomarías en 72h?

**Primeras 24h:** Verificar en Search Console si hay errores de rastreo, cambios en impresiones/clics, o penalizaciones. Revisar que `/precio/peso-chileno` responda 200, que el schema.org esté correcto, y ejecutar Lighthouse para comparar performance. Analizar SERP: ¿aparecieron nuevos competidores? ¿Cambió el featured snippet?

**24-48h:** Si es técnico, corregir schema.org y optimizar meta description con keywords. Si es contenido, actualizar H1 y primer párrafo con "precio dólar peso chileno", agregar FAQ section, y mejorar internal linking desde páginas de alto tráfico.

**48-72h:** Implementar actualización visible de timestamp ("Actualizado hace X minutos") para señalar contenido dinámico a Google. Configurar monitoreo diario de posición en SERP y tráfico orgánico. Documentar cambios y resultados esperados.

**Prioridad:** Identificar causa raíz (técnica, contenido, o competencia) y actuar rápido. Si es competencia, enfocarse en diferenciación con contenido más completo o calculadora interactiva.

---

## 3. 3 mejoras de velocidad aplicables a esta página sin sacrificar SEO

**1. Lazy loading de imágenes:** Agregar `loading="lazy"` y `decoding="async"` a las banderas y el stand en `AppHeroBanner.vue`. Las imágenes below the fold no bloquean el render inicial. Impacto: -200ms en LCP, -150KB en carga inicial.

**2. Code splitting del CTA:** Usar `LazyAppCallToAction` en lugar de import directo, o cargar con Intersection Observer cuando esté cerca del viewport. El componente está below the fold, así que no necesita cargarse inmediatamente. Impacto: -400KB en bundle inicial, -500ms en TTI.

**3. Optimización de fuentes:** Preload de Montserrat Bold (usado en headings) y cargar el resto de forma asíncrona. Ya hay preconnect a Google Fonts, pero podemos ser más agresivos. Impacto: -300ms en FCP.

**Total estimado:** -600KB bundle, -350ms LCP, -550ms FCP. Todo mantiene SSR, así que los crawlers ven el contenido completo y el SEO no se afecta.

---

## 4. 2 hipótesis para mejorar conversión del hero (y cómo A/B testearlas)

**Hipótesis 1: Urgencia y actualización en tiempo real**

Agregar badge "Actualizado hace X minutos" con pulso animado y cambiar CTA a "Consulta el precio actualizado ahora". La variante B muestra que la info es fresca, aumentando confianza.

**Test:** 50/50 split con cookies persistentes (30 días). Métricas: CTR al CTA (+15% objetivo), tiempo en página (+20%), rebote (-10%). Duración: 2 semanas, mínimo 1,000 visitantes por variante. Usar Google Optimize o custom con GA4.

**Hipótesis 2: Calculadora interactiva en el hero**

Reemplazar tipo de cambio estático con input "¿Cuántos USD quieres cambiar?" y output "Recibirás X CLP". CTA "Cambiar ahora" lleva a registro/descarga. Los usuarios quieren calcular, no solo ver el tipo de cambio.

**Test:** Mismo setup. Métricas: interacción con calculadora (>40% en variante B), CTR al CTA (+25%), tiempo en página (+30%), conversión a registro (+20%). Duración: 3 semanas, mínimo 1,500 visitantes por variante.

**Implementación:** Usar cookies para asignar variante, trackear eventos en GA4, y validar significancia estadística (p < 0.05) antes de decidir.

---

## 5. ¿Cuánto tiempo te tomó realizar este requerimiento y qué aceleraste con IA?

**Tiempo total:** ~30-35 horas de desarrollo real.

**Acelerado con IA (60% del tiempo):**
- Generación de estructura de componentes Vue y configuración de Nuxt.js (~8-10h ahorradas)
- Implementación de schema.org JSON-LD y validación (~2-3h)
- Setup de API Express con TypeScript e integración Google Sheets (~4-5h)
- Documentación y README (~3-4h)
- Debugging y solución de problemas comunes (~2-3h)

**Desarrollado manualmente (40% del tiempo):**
- **Armado de lógica:** Lógica de negocio específica (mapeo de divisas, formateo, validación de rutas, sistema de slugs)
- **Implementación pixel-perfect del diseño de Figma:** Ajustes de spacing, animaciones, responsive design
- **Testing en dispositivos reales y ajustes de UX:** Validación visual y refinamiento de experiencia de usuario

**Sin IA habría tomado:** ~70-80 horas. La IA fue especialmente útil para boilerplate, estándares (SEO, TypeScript), y documentación. El valor real estuvo en el desarrollo manual de componentes y lógica de negocio, entender requisitos del negocio, implementar el diseño específico, y validar que todo funcione correctamente en producción.

