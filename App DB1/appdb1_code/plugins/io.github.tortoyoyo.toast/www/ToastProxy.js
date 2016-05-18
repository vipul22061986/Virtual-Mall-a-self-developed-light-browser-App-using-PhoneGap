var exec = require('cordova/exec'),
    platform = require('cordova/platform');


module.exports = {
    show: function(mensagem, sucesso, error, opcao) {

        var duration = opcao.duration;

        exec(sucesso, error, "Toast", "create", [mensagem, duration]);
    }
};