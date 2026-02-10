const { calcularNuevoMarcador } = require('./reglas');

describe('Pruebas para calcularNuevoMarcador', () => {
    test('Escenario A: Si tengo 10 puntos y anoto 2, el resultado debe ser 12', () => {
        const resultado = calcularNuevoMarcador(10, 2);
        expect(resultado).toBe(12);
    });

    test('Escenario B: Si tengo 10 puntos y anoto un triple (3), el resultado debe ser 13', () => {
        const resultado = calcularNuevoMarcador(10, 3);
        expect(resultado).toBe(13);
    });
});
