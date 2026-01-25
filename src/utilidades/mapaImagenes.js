// Objeto estático que asocia nombres de equipos con sus imágenes
// React Native maneja las imágenes estáticas con `require` y necesita conocerlas en tiempo de compilación.
const imagenes = {
    "Atlanta Hawks": require("../../assets/Atlanta Hawks.png"),
    "Boston Celtics": require("../../assets/Boston Celtics.png"),
    "Brooklyn Nets": require("../../assets/Brooklyn Nets.png"),
    "Charlotte Hornets": require("../../assets/Charlotte Hornets.png"),
    "Chicago Bulls": require("../../assets/Chicago Bulls.png"),
    "Denver Nuggets": require("../../assets/Denver Nuggets.png"),
    "Los Angeles Lakers": require("../../assets/Los Angeles Lakers.png"),
    "Memphis Grizzlies": require("../../assets/Memphis Grizzlies.png"),
};

export default imagenes;
