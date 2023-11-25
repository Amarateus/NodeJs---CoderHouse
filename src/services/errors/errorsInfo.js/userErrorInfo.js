export const generateUserErrorInfo = (user) => {
    return `Una o mas propiedades quedaron incompletas o son invalidas
    Lista de requerimientos:
    *first_name debe ser un String, se recibio: ${user.first_name}
    *last_name debe ser un String, se recibio: ${user.last_name}
    *email debe ser un String, se recibio: ${user.email}
    *age debe ser un String, se recibio: ${user.age}
    *password debe ser un String, se recibio: ${user.password}`
}