import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import imagenes from '../utilidades/mapaImagenes';

const SelectorEquipo = ({ equipo, tipo, alCambiarEquipo }) => {
    const esLocal = tipo === 'LOCAL';
    const colorPanel = esLocal ? '#1a2a6c' : '#b21f1f';

    const renderizarJugador = ({ item, index }) => (
        <View style={estilos.filaJugador}>
            <Text style={estilos.numeroJugador}>{index + 1}</Text>
            <Text style={estilos.nombreJugador}>{item}</Text>
        </View>
    );

    return (
        <View style={[estilos.contenedor, { borderColor: equipo.color || '#fff' }]}>
            {/* Cabecera que muestra si es LOCAL o VISITANTE */}
            <View style={[estilos.cabecera, { backgroundColor: colorPanel }]}>
                <Text style={estilos.textoCabecera}>{tipo}</Text>
            </View>

            {/* Sección principal del equipo con logo y botón */}
            <View style={estilos.infoEquipo}>
                <Image
                    source={imagenes[equipo.nombre]}
                    style={estilos.logo}
                    resizeMode="contain"
                />
                <Text style={estilos.nombreEquipo} numberOfLines={1}>{equipo.nombre}</Text>

                {/* Botón interactivo para cambiar de equipo con Icono (Theory Ch 7) */}
                <TouchableOpacity style={estilos.botonCambio} onPress={alCambiarEquipo}>
                    <Ionicons name="refresh-circle" size={32} color="#ffd700" />
                    <Text style={estilos.textoBotonCambio}>CAMBIAR</Text>
                </TouchableOpacity>
            </View>

            {/* Lista de jugadores (Plantilla) */}
            <View style={estilos.contenedorPlantilla}>
                <Text style={estilos.tituloPlantilla}>PLANTILLA</Text>
                <FlatList
                    data={equipo.jugadores}
                    keyExtractor={(item, index) => `${equipo.id}-${index}`}
                    renderItem={renderizarJugador}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={estilos.contenidoLista}
                />
            </View>
        </View>
    );
};

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        margin: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderWidth: 2,
        borderRadius: 10,
        overflow: 'hidden',
    },
    cabecera: {
        padding: 8,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
    },
    textoCabecera: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 16,
        letterSpacing: 2,
    },
    infoEquipo: {
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.2)',
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 5,
    },
    nombreEquipo: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        textShadowColor: 'black',
        textShadowRadius: 2,
    },
    botonCambio: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ffd700',
    },
    textoBotonCambio: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 10,
        marginLeft: 5,
    },
    contenedorPlantilla: {
        flex: 1,
        padding: 5,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    tituloPlantilla: {
        color: '#aaa',
        fontSize: 10,
        textAlign: 'center',
        marginBottom: 5,
        textTransform: 'uppercase',
    },
    contenidoLista: {
        paddingBottom: 10,
    },
    filaJugador: {
        flexDirection: 'row',
        paddingVertical: 4,
        paddingHorizontal: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    numeroJugador: {
        color: '#ffd700',
        width: 20,
        fontSize: 12,
        fontWeight: 'bold',
    },
    nombreJugador: {
        color: '#fff',
        fontSize: 12,
    }
});

export default SelectorEquipo;
