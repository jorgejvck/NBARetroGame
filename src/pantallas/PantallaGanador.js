import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import imagenes from '../utilidades/mapaImagenes';

const { width } = Dimensions.get('window');

const PantallaGanador = ({ route, navigation }) => {
    // Recibir parámetros
    const { equipoLocal, equipoVisitante, puntosLocal, puntosVisitante, estadisticasJugadores } = route.params || {};

    // Lógica para determinar el ganador
    let ganador = null;
    let esEmpate = false;

    if (puntosLocal > puntosVisitante) {
        ganador = equipoLocal;
    } else if (puntosVisitante > puntosLocal) {
        ganador = equipoVisitante;
    } else {
        esEmpate = true;
    }

    // Calcular el Top 5 de jugadores
    const top5Jugadores = React.useMemo(() => {
        if (!estadisticasJugadores) return [];
        return Object.entries(estadisticasJugadores)
            .map(([nombre, datos]) => ({ nombre, ...datos }))
            .sort((a, b) => b.puntos - a.puntos)
            .slice(0, 5);
    }, [estadisticasJugadores]);

    const volverAlMenu = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Principal' }],
        });
    };

    return (
        <LinearGradient
            colors={['#000000', '#434343']}
            style={estilos.contenedor}
        >
            <SafeAreaView style={estilos.areaSegura}>
                <View style={estilos.contenido}>

                    <Text style={estilos.tituloResultado}>RESULTADO FINAL</Text>

                    <View style={estilos.marcadorFinal}>
                        <Text style={estilos.puntosFinal}>{puntosLocal}</Text>
                        <Text style={estilos.guion}>-</Text>
                        <Text style={estilos.puntosFinal}>{puntosVisitante}</Text>
                    </View>

                    {esEmpate ? (
                        <View style={estilos.contenedorEmpate}>
                            <Text style={estilos.textoGanador}>¡EMPATE!</Text>
                            <View style={estilos.filaLogos}>
                                <Image source={imagenes[equipoLocal.nombre]} style={estilos.logo} resizeMode="contain" />
                                <Image source={imagenes[equipoVisitante.nombre]} style={estilos.logo} resizeMode="contain" />
                            </View>
                        </View>
                    ) : (
                        <View style={estilos.contenedorGanador}>
                            <Image
                                source={imagenes[ganador.nombre]}
                                style={estilos.logoGanador}
                                resizeMode="contain"
                            />
                            <Text style={estilos.etiquetaGanador}>GANADOR</Text>
                            <Text style={[estilos.nombreGanador, { color: ganador.color }]}>
                                {ganador.nombre.toUpperCase()}
                            </Text>
                        </View>
                    )}

                    {/* Nueva sección: Top 5 Jugadores */}
                    {top5Jugadores.length > 0 && (
                        <View style={estilos.contenedorTop}>
                            <Text style={estilos.tituloTop}>★ MEJORES JUGADORES ★</Text>
                            {top5Jugadores.map((jugador, index) => {
                                const isNets = jugador.equipo === 'Brooklyn Nets';
                                return (
                                    <View key={index} style={estilos.filaTop}>
                                        <Text style={estilos.rankTop}>#{index + 1}</Text>
                                        <Text style={[
                                            estilos.nombreTop,
                                            { color: jugador.color },
                                            isNets && {
                                                color: 'white'
                                            }
                                        ]}>
                                            {jugador.nombre}
                                        </Text>
                                        <Text style={estilos.puntosTop}>{jugador.puntos} pts</Text>
                                    </View>
                                );
                            })}
                        </View>
                    )}

                    <TouchableOpacity
                        style={estilos.botonVolver}
                        onPress={volverAlMenu}
                    >
                        <Ionicons name="home" size={24} color="#000" style={{ marginRight: 10 }} />
                        <Text style={estilos.textoBotonVolver}>VOLVER AL MENÚ</Text>
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
    contenido: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center', // Changed to allow scrolling/better layout if needed, or keeping it but ensuring space
        padding: 20,
    },
    tituloResultado: {
        color: '#fff',
        fontSize: 24,
        letterSpacing: 3,
        marginBottom: 10, // Reduced margin
        opacity: 0.8,
        marginTop: 10,
    },
    marcadorFinal: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20, // Reduced margin
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 20,
    },
    puntosFinal: {
        fontSize: 36, // Slightly smaller
        fontWeight: 'bold',
        color: '#ffd700',
    },
    guion: {
        fontSize: 36,
        color: '#fff',
        marginHorizontal: 20,
    },
    contenedorGanador: {
        alignItems: 'center',
        marginBottom: 20, // Reduced margin
    },
    logoGanador: {
        width: 120, // Smaller logo
        height: 120,
        marginBottom: 10,
    },
    etiquetaGanador: {
        color: '#fff',
        fontSize: 14,
        letterSpacing: 5,
        marginBottom: 5,
    },
    nombreGanador: {
        fontSize: 24,
        fontWeight: '900',
        textAlign: 'center',
        textShadowColor: 'rgba(255,255,255,0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    contenedorEmpate: {
        alignItems: 'center',
        marginBottom: 20,
    },
    textoGanador: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        letterSpacing: 2,
    },
    filaLogos: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    logo: {
        width: 80,
        height: 80,
    },
    // Nuevos estilos para Top 5
    contenedorTop: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },
    tituloTop: {
        color: '#ffd700',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        letterSpacing: 1,
    },
    filaTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        paddingBottom: 2,
    },
    rankTop: {
        color: '#fff',
        width: 30,
        fontWeight: 'bold',
    },
    nombreTop: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 14,
    },
    puntosTop: {
        color: '#fff',
        fontWeight: 'bold',
    },
    botonVolver: {
        flexDirection: 'row',
        backgroundColor: '#ffd700',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
        alignItems: 'center',
        elevation: 5,
    },
    textoBotonVolver: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: 1,
    }
});

export default PantallaGanador;
