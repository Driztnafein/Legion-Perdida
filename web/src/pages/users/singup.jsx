import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { create } from '../../services/api-service';

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await create(data);
            console.log('Usuario registrado:', response);
            // Redirigir al usuario a la página de inicio de sesión u otra página
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
        }
    };

    return (
        <div>
            <h1>Registrarse</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre de usuario:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <span className="text-danger">Este campo es obligatorio</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <span className="text-danger">Este campo es obligatorio</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <span className="text-danger">Este campo es obligatorio</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        {...register("confirmPassword", { 
                            required: "Este campo es obligatorio",
                            validate: value =>
                                value === getValues("password") || "Las contraseñas no coinciden"
                        })}
                    />
                    {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary">Registrarse</button>
                <Link className="btn btn-link" to="/users/login">¿Ya tienes cuenta? Inicia sesión</Link>
            </form>
        </div>
    );
};

export default RegisterForm;
