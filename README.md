# Sistema de Reservas de Canchas Deportivas 🏟️⚽

Este proyecto consiste en un sistema de reservas para canchas deportivas, desarrollado en Node.js con Express y MySQL. Permite a los usuarios realizar reservas, consultar disponibilidad, y gestionar las reservas de forma sencilla. El sistema tiene funcionalidades de autenticación y autorización de usuarios.

---

## 📦 Tecnologías utilizadas

- **Node.js** (backend)
- **Express.js** (servidor)
- **MySQL2** (base de datos, con promesas)
- **JWT** (autenticación)
- **CORS**
- **Dotenv**

---

## 📁 Estructura del proyecto

```
reservationSystem/
├── config/
├── middlewares/
├── utils/
├── controllers/
├── models/
├── routes/
├── app.js
├── .env
├── server.js
```

---

## ⚙️ Funcionalidades principales

- 🗓️ Crear, editar y eliminar reservas para canchas deportivas.
- 🔒 Autenticación y autorización de usuarios (JWT).
- 📅 Consultar la disponibilidad de canchas.
- 💬 Visualizar la información detallada de las reservas.

---

## 🔌 Endpoints disponibles

### POST `/reservas`
Crea una nueva reserva.

**Body ejemplo:**
```json
{
  "usuario_id": 1,
  "cancha_id": 2,
  "fecha": "2025-04-15T10:00:00Z",
  "hora_inicio": "10:00",
  "hora_fin": "12:00"
}
```

---

### GET `/reservas`
Obtiene todas las reservas de un usuario.

**Respuesta ejemplo:**
```json
[
  {
    "id": 1,
    "usuario_id": 1,
    "cancha_id": 2,
    "fecha": "2025-04-15T10:00:00Z",
    "hora_inicio": "10:00",
    "hora_fin": "12:00"
  }
]
```

---

### PUT `/reservas/:id`
Actualiza una reserva existente.

**Body ejemplo:**
```json
{
  "hora_inicio": "11:00",
  "hora_fin": "13:00"
}
```

---

### DELETE `/reservas/:id` **Agregar el id correspondiente al final de la ruta (sustituir por :id) "/reservas/4"**

**Response ejemplo:**
```json
{ 
  "message": "Reserva eliminada con exito",
  "deletedReservation":{
    "message":"Reserva eliminadaa conexito", 
    "deletedId": "4"
  }
}
```

---

## 🛠 Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/luisdev265/reservationSystem

# Instalar dependencias
npm install

# Crear archivo .env y agregar las variables necesarias:
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=nombre_base_de_datos
JWT_SECRET=tu_secreto_jwt

# Iniciar el servidor
npm start
```

---

## 🧠 Notas

Este proyecto es ideal para gestionar la reserva de canchas deportivas en un entorno escolar, de entrenamiento o para pequeños negocios. Incluye un sistema de autenticación y una estructura de base de datos que se puede expandir fácilmente.

---

## 👨‍💻 Autor

- Luis Dev (@luisdev265)
