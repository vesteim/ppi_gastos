import { useForm } from "react-hook-form";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmited = async (data) => {
    console.log("Datos del formulario:", data);

    try {
      // Cambia "" por el endpoint correcto
      const respuesta = await axios.post("http://localhost:8000/usuario", data);

      console.log("Respuesta del servidor:", respuesta);

      alert("Bienvenido");
      onLogin(respuesta.data.nombre); // Asegúrate de que 'nombre' exista en la respuesta
      navigate("/Home");
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al iniciar sesión, verifica tus credenciales.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmited)}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          User
        </label>
        <input
          type="email"
          {...register("username", { required: true })}
          className="form-control"
          id="username"
          aria-describedby="emailHelp"
        />
        {errors.username && <span className="text-danger">El usuario es obligatorio</span>}
        <div id="emailHelp" className="form-text">
          Nunca compartiremos tu correo con nadie más.
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          {...register("password", { required: true })}
          className="form-control"
          id="password"
        />
        {errors.password && <span className="text-danger">La contraseña es obligatoria</span>}
      </div>

      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

