import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import imagenes from '../utilidades/mapaImagenes';

const { width } = Dimensions.get('window');

const Secundaria = ({ route, navigation }) => {
    // Desestructuramos los datos recibidos desde la pantalla anterior
    const { equipoLocal, equipoVisitante } = route.params || {};

    return (
        <LinearGradient
            colors={['#1a2a6c', '#b21f1f', '#fdbb2d']}
            style={estilos.contenedor}
        >
            <SafeAreaView style={estilos.areaSegura}>

                {/* Custom Header with Back Button (Theory Ch 7) */}
                <View style={estilos.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.backButton}>
                        <Ionicons name="arrow-back" size={28} color="#fff" />
                    </TouchableOpacity>
                    <Text style={estilos.tituloHeader}>MARCADOR</Text>
                </View>

                <View style={estilos.contenedorMarcador}>

                    {/* Lado Local */}
                    <View style={[estilos.contenedorEquipo, { borderRightWidth: 1, borderColor: 'rgba(255,255,255,0.3)' }]}>
                        <Text style={estilos.etiqueta}>LOCAL</Text>
                        <Image
                            source={imagenes[equipoLocal.nombre]}
                            style={estilos.logo}
                            resizeMode="contain"
                        />
                        <Text style={[estilos.nombreEquipo, { color: equipoLocal.color }]}>{equipoLocal.nombre}</Text>
                    </View>

                    {/* Insignia VS Central */}
                    <View style={estilos.insigniaVs}>
                        <Text style={estilos.textoVs}>VS</Text>
                    </View>

                    {/* Lado Visitante */}
                    <View style={estilos.contenedorEquipo}>
                        <Text style={estilos.etiqueta}>VISITANTE</Text>
                        <Image
                            source={imagenes[equipoVisitante.nombre]}
                            style={estilos.logo}
                            resizeMode="contain"
                        />
                        <Text style={[estilos.nombreEquipo, { color: equipoVisitante.color }]}>{equipoVisitante.nombre}</Text>
                    </View>

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
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    backButton: {
        marginRight: 15,
    },
    tituloHeader: {
        color: '#ffd700',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 2,
    },
    contenedorMarcador: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 20,
        margin: 10,
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#ffd700',
        position: 'relative',
        maxHeight: 400,
    },
    contenedorEquipo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: '100%',
    },
    logo: {
        width: 120,
        height: 120,
        marginVertical: 20,
    },
    nombreEquipo: {
        fontSize: 20,
        fontWeight: '900',
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        marginTop: 10,
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        overflow: 'hidden',
    },
    etiqueta: {
        color: '#ffd700',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginBottom: 10,
    },
    insigniaVs: {
        position: 'absolute',
        left: '50%',
        marginLeft: -30,
        width: 60,
        height: 60,
        backgroundColor: '#ff0000',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
        zIndex: 10,
        top: '50%',
        marginTop: -30,
    },
    textoVs: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        fontStyle: 'italic',
    },
    pie: {
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    textoPie: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        paddingHorizontal: 20,
    }
});

export default Secundaria;
