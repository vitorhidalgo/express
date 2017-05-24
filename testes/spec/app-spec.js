describe("Elevador", function(){
    var Elevador = require('../app');
    it('deve estar no andar 0', function(){
        expect(Elevador.andar).toBe(0);
    })

    it('deve ir ao andar 1', function(){
        Elevador.subir();
        expect(Elevador.andar).toBe(1);
    });

    it('deve ir ao andar 2', function(){
        Elevador.subir();
        expect(Elevador.andar).toBe(2);
    });

    it('deve ir ao andar 1', function(){
        Elevador.descer();
        expect(Elevador.andar).toBe(1);
    })
});