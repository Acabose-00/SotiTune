<h2>Vista previa de la app</h2>

<video src="https://github.com/Acabose-00/SotiTune/issues/19#issue-3343589844" width="600" autoplay loop muted></video>


# 🎵 SotiTune — Afinador y Gestor de Partituras (Ionic + Angular)

Aplicación móvil híbrida (Ionic + Capacitor) para Android que permite:
- Afinar instrumentos de cuerda en tiempo real usando el micrófono.
- Registrar/ingresar usuarios.
- Subir, listar y ver partituras compartidas por usuarios.
- Modo invitado para usar el afinador sin registrarse.

---

## 🧭 Contenidos de este README

1. Descripción
2. Características
3. Tecnologías
4. Requisitos previos

---

## 1. Descripción

SotiTune es una app diseñada para ayudar a músicos (amateurs y estudiantes) a afinar instrumentos de cuerda y compartir partituras.
Combina procesamiento de audio en tiempo real, almacenamiento en la nube y una interfaz móvil sencilla.

---

## 2. Características principales

- Afinador en tiempo real (detección de frecuencia).
- Selector de instrumentos y afinaciones por instrumento.
- Registro / Inicio de sesión (persistencia con Supabase).
- Subida y visualización de partituras (bucket en Supabase).
- Modo invitado.
- Interfaz responsiva con SCSS.
- Integración con visor nativo (descargar/abrir PDF).
- Control de versiones con GitHub y metodología Scrum aplicada.

---

## 3. Tecnologías

- Ionic (Angular)
- Capacitor
- Angular / TypeScript
- SCSS
- Supabase (Auth, Postgres y Storage)
- Cordova plugins (File, File Opener, InAppBrowser) o equivalentes Capacitor
- Node.js / npm
- Android Studio (compilación nativa)

---

## 4. Requisitos previos

En la máquina de desarrollo (Windows/macOS/Linux):

- Node.js (versión LTS recomendada) y npm
- Ionic CLI: `npm i -g @ionic/cli`
- Capacitor CLI: `npm i -g @capacitor/cli`
- Java JDK 17 (recomendado)
- Android Studio + Android SDK (platform-tools, build-tools)
- `adb` en PATH (Android platform-tools)
- Git
