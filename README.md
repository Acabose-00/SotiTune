<h2>Vista previa de la app</h2>

<video src="https://private-user-images.githubusercontent.com/198034497/480748654-022578ef-b28d-45fb-a8b6-0b818bf0322c.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTU4MjE5NDAsIm5iZiI6MTc1NTgyMTY0MCwicGF0aCI6Ii8xOTgwMzQ0OTcvNDgwNzQ4NjU0LTAyMjU3OGVmLWIyOGQtNDVmYi1hOGI2LTBiODE4YmYwMzIyYy5tcDQ_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwODIyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDgyMlQwMDE0MDBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1kZjUyMGRhNzVhMzgxNDJjZmMzNmFiNDJkYjdkZmYyMWJiNzU5ZmYxNDY4NGJmNWU2NDEwOWVhNzBjZWQzZTQ0JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.9JVihxZUx3L0_Va2gJxG3ToUAqXu-1ST0uf495FyUrk" width="600" autoplay loop muted></video>

<video src="https://private-user-images.githubusercontent.com/198034497/480748696-8d24a08d-6502-48d1-b4c9-4de6332646cf.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTU4MjIwMTUsIm5iZiI6MTc1NTgyMTcxNSwicGF0aCI6Ii8xOTgwMzQ0OTcvNDgwNzQ4Njk2LThkMjRhMDhkLTY1MDItNDhkMS1iNGM5LTRkZTYzMzI2NDZjZi5tcDQ_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwODIyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDgyMlQwMDE1MTVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0zZTM1MWJmMDkxYTMxNjFjNzI3ODViOWVkZjA5MGViNjg4M2I2YzExZjM0OTc5MDE3M2YyY2ZmZGFhNjg5YjdjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.4depPnqJ3BuSbsvwGLjVHnDvF63hp3YIMg64tycLq2k" width="600" autoplay loop muted></video>
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
