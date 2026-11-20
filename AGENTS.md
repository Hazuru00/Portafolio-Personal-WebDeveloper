# AGENTS.md — Instrucciones para agentes de IA

## ⚠️ PROYECTO PROTEGIDO: `PORTAFOLIO2/`

**NO modificar, NO mover, NO renombrar, NO borrar nada dentro de `PORTAFOLIO2/`.**

- Es la **primera versión** del portafolio (React + Vite), **desplegada en un proyecto de Vercel separado** que apunta a esta carpeta desde este repositorio.
- Cualquier cambio ahí alteraría el sitio histórico publicado en producción.
- Este archivo es solo de protección: el proyecto viejo **no se toca ni se "limpia"**.

## Proyecto activo: `portfolio-next/`

- Todo el desarrollo actual (Next.js 16 + Tailwind v4) ocurre **exclusivamente** aquí.
- Comandos: `npm run dev` (desarrollo), `npm run build` (build de producción), `npm run lint` (lint), `npx tsc --noEmit` (tipos).
- Estructura esperada: `src/app/` (rutas y layout), `src/components/sections/` (secciones de la página), `src/data/` (datos centralizados), `src/actions/` (server actions).

## Reglas generales

- No tocar `PORTAFOLIO2/` (ver arriba).
- Mantener el estilo de commits en español con prefijo convencional (`fix:`, `feat:`, `refactor:`, `chore:`).
- Verificar con `npm run lint` y `npm run build` antes de commitear cambios en `portfolio-next/`.
