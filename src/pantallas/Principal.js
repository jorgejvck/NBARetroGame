import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import datosEquipos from '../datos/equipos.json';
import SelectorEquipo from '../componentes/SelectorEquipo';

const Principal = ({ navigation }) => {
    const [indiceLocal, setIndiceLocal] = useState(0);
    const [indiceVisitante, setIndiceVisitante] = useState(1);

    const iniciarJuego = () => {
        const equipoLocal = datosEquipos[indiceLocal];
        const equipoVisitante = datosEquipos[indiceVisitante];
        navigation.navigate('Juego', { equipoLocal, equipoVisitante });
    };

    const manejarCambioLocal = () => {
        setIndiceLocal((prev) => (prev + 1) % datosEquipos.length);
    };

    const manejarCambioVisitante = () => {
        setIndiceVisitante((prev) => (prev + 1) % datosEquipos.length);
    };

    return (
        <LinearGradient
            colors={['#1a2a6c', '#b21f1f', '#fdbb2d']}
            style={estilos.contenedor}
        >
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={estilos.areaSegura}>

                <View style={estilos.cabecera}>
                    <Text style={estilos.titulo}>NBA RETRO</Text>
                    <Text style={estilos.subtitulo}>CONFIGURACIÓN DE PARTIDO</Text>
                </View>

                <View style={estilos.contenedorSelectores}>
                    <SelectorEquipo
                        equipo={datosEquipos[indiceLocal]}
                        tipo="LOCAL"
                        alCambiarEquipo={manejarCambioLocal}
                    />

                    <View style={estilos.contenedorVs}>
                        <Text style={estilos.textoVs}>VS</Text>
                    </View>

                    <SelectorEquipo
                        equipo={datosEquipos[indiceVisitante]}
                        tipo="VISITANTE"
                        alCambiarEquipo={manejarCambioVisitante}
                    />
                </View>

                <View style={estilos.pie}>
                    <TouchableOpacity
                        style={estilos.botonInicio}
                        onPress={iniciarJuego}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="basketball-outline" size={24} color="#fff" style={{ marginRight: 10 }} />
                        <Text style={estilos.textoBotonInicio}>JUGAR AHORA</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </LinearGradient>
    );
};

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
    },
    areaSegura: {
        flex: 1,
    },
    cabecera: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    titulo: {
        fontSize: 32,
        fontWeight: '900',
        color: '#ffd700',
        letterSpacing: 4,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        fontStyle: 'italic',
    },
    subtitulo: {
        color: '#fff',
        fontSize: 10,
        marginTop: 5,
        letterSpacing: 2,
        fontWeight: 'bold',
        opacity: 0.8,
    },
    contenedorSelectores: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contenedorVs: {
        position: 'absolute',
        left: '50%',
        marginLeft: -15,
        width: 30,
        height: 30,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        zIndex: 10,
        borderWidth: 1,
        borderColor: '#ffd700',
    },
    textoVs: {
        color: '#ffd700',
        fontWeight: 'bold',
        fontSize: 10,
    },
    pie: {
        padding: 20,
        alignItems: 'center',
        paddingBottom: 20,
    },
    botonInicio: {
        flexDirection: 'row',
        backgroundColor: '#ff3d00',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#fff',
        elevation: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    textoBotonInicio: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
});

export default Principal;
