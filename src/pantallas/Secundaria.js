import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import imagenes from '../utilidades/mapaImagenes';

const { width } = Dimensions.get('window');

const Secundaria = ({ route, navigation }) => {
    const { equipoLocal, equipoVisitante } = route.params || {};

    const [puntosLocal, setPuntosLocal] = useState(0);
    const [puntosVisitante, setPuntosVisitante] = useState(0);

    const [estadisticasJugadores, setEstadisticasJugadores] = useState({});

    React.useEffect(() => {
        const inicializar = {};
        if (equipoLocal?.jugadores) {
            equipoLocal.jugadores.forEach(j => {
                const key = `${j}-local`;
                inicializar[key] = { nombre: j, puntos: 0, equipo: equipoLocal.nombre, color: equipoLocal.color };
            });
        }
        if (equipoVisitante?.jugadores) {
            equipoVisitante.jugadores.forEach(j => {
                const key = `${j}-visitante`;
                inicializar[key] = { nombre: j, puntos: 0, equipo: equipoVisitante.nombre, color: equipoVisitante.color };
            });
        }
        setEstadisticasJugadores(prev => ({ ...inicializar, ...prev }));
    }, [equipoLocal, equipoVisitante]);

    const sumarPuntos = (equipo, puntos, nombreJugador) => {
        if (equipo === 'local') {
            setPuntosLocal(prev => prev + puntos);
        } else {
            setPuntosVisitante(prev => prev + puntos);
        }

        if (nombreJugador) {
            const key = `${nombreJugador}-${equipo}`;
            setEstadisticasJugadores(prev => ({
                ...prev,
                [key]: {
                    ...prev[key],
                    puntos: (prev[key]?.puntos || 0) + puntos
                }
            }));
        }
    };

    const finalizarJuego = () => {
        navigation.navigate('Ganador', {
            equipoLocal,
            equipoVisitante,
            puntosLocal,
            puntosVisitante,
            estadisticasJugadores
        });
    };

    const RenderJugador = ({ nombre, equipo, lado }) => {
        const key = `${nombre}-${lado}`;

        return (
            <View style={estilos.jugadorRow}>
                <Text style={[estilos.nombreJugador, { color: equipo.color }]} numberOfLines={1}>
                    {nombre} <Text style={{ fontSize: 10, color: '#555' }}>
                        ({estadisticasJugadores[key]?.puntos || 0} pts)
                    </Text>
                </Text>
                <View style={estilos.botonesPuntos}>
                    <TouchableOpacity
                        style={[estilos.botonPunto, { backgroundColor: equipo.color }]}
                        onPress={() => sumarPuntos(lado, 2, nombre)}
                    >
                        <Text style={estilos.textoBotonPunto}>+2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[estilos.botonPunto, { backgroundColor: '#ffd700', borderColor: equipo.color }]}
                        onPress={() => sumarPuntos(lado, 3, nombre)}
                    >
                        <Text style={[estilos.textoBotonPunto, { color: '#000' }]}>+3</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <LinearGradient
            colors={['#1a2a6c', '#b21f1f', '#fdbb2d']}
            style={estilos.contenedor}
        >
            <SafeAreaView style={estilos.areaSegura}>

                {/* Header Match Info */}
                <View style={estilos.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.backButton}>
                        <Ionicons name="arrow-back" size={28} color="#fff" />
                    </TouchableOpacity>
                    <Text style={estilos.tituloHeader}>ENCUENTRO EN VIVO</Text>
                </View>

                {/* Scoreboard */}
                <View style={estilos.contenedorMarcador}>
                    {/* Local */}
                    <View style={estilos.infoEquipo}>
                        <Image source={imagenes[equipoLocal.nombre]} style={estilos.logoSmall} resizeMode="contain" />
                        <Text style={estilos.puntos}>{puntosLocal}</Text>
                    </View>

                    {/* Timer/Status placeholder */}
                    <View style={estilos.reloj}>
                        <Text style={estilos.textoCuarto}>Q4</Text>
                        <Text style={estilos.tiempo}>02:30</Text>
                    </View>

                    {/* Visitante */}
                    <View style={estilos.infoEquipo}>
                        <Text style={estilos.puntos}>{puntosVisitante}</Text>
                        <Image source={imagenes[equipoVisitante.nombre]} style={estilos.logoSmall} resizeMode="contain" />
                    </View>
                </View>

                {/* Roster Lists */}
                <View style={estilos.cuerpoJuego}>
                    {/* Columna Local */}
                    <View style={estilos.columnaEquipo}>
                        <Text style={[estilos.tituloEquipo, { color: '#fff' }]}>LOCAL</Text>
                        <LinearGradient colors={['rgba(0,0,0,0.3)', 'transparent']} style={estilos.listaFondo}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {equipoLocal.jugadores.map((jugador, index) => (
                                    <RenderJugador key={`local-${index}`} nombre={jugador} equipo={equipoLocal} lado="local" />
                                ))}
                            </ScrollView>
                        </LinearGradient>
                    </View>

                    {/* Columna Visitante */}
                    <View style={estilos.columnaEquipo}>
                        <Text style={[estilos.tituloEquipo, { color: '#fff' }]}>VISITANTE</Text>
                        <LinearGradient colors={['rgba(0,0,0,0.3)', 'transparent']} style={estilos.listaFondo}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {equipoVisitante.jugadores.map((jugador, index) => (
                                    <RenderJugador key={`visitante-${index}`} nombre={jugador} equipo={equipoVisitante} lado="visitante" />
                                ))}
                            </ScrollView>
                        </LinearGradient>
                    </View>
                </View>

                {/* Footer Buttons */}
                <View style={estilos.pie}>
                    <TouchableOpacity
                        style={estilos.botonFin}
                        onPress={finalizarJuego}
                    >
                        <Text style={estilos.textoBotonFin}>FIN DEL JUEGO</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    tituloHeader: {
        color: '#ffd700',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        letterSpacing: 1,
    },
    contenedorMarcador: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginHorizontal: 10,
        borderRadius: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ffd700',
    },
    infoEquipo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '35%',
        justifyContent: 'space-around',
    },
    logoSmall: {
        width: 40,
        height: 40,
    },
    puntos: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '900',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    reloj: {
        alignItems: 'center',
    },
    textoCuarto: {
        color: '#ffd700',
        fontSize: 12,
        fontWeight: 'bold',
    },
    tiempo: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'monospace',
    },
    cuerpoJuego: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 5,
    },
    columnaEquipo: {
        flex: 1,
        marginHorizontal: 2,
    },
    tituloEquipo: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 14,
        letterSpacing: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingVertical: 5,
    },
    listaFondo: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    jugadorRow: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        marginBottom: 8,
        marginHorizontal: 5,
        borderRadius: 8,
        padding: 8,
        elevation: 2,
    },
    nombreJugador: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    botonesPuntos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    botonPunto: {
        flex: 1,
        paddingVertical: 5,
        alignItems: 'center',
        borderRadius: 4,
        marginHorizontal: 2,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    textoBotonPunto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    pie: {
        padding: 10,
        alignItems: 'center',
    },
    botonFin: {
        backgroundColor: '#d32f2f',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#fff',
        elevation: 5,
    },
    textoBotonFin: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 2,
    }
});

export default Secundaria;
