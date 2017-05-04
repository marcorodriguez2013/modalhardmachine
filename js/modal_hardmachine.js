// definición de la función
$.fn.hm_modal = function(options) {
    $.fn.hm_modal.defecto = {
        cerrarclick: true,
        centrar: false,
        width: 80,
        sombra: false,
    };
    // puede recibir un array de parámetros nombrados
    // invocamos a una función genérica que hace el merge 
    // entre los recibidos y los de por defecto 
    var opts = $.extend({}, $.fn.hm_modal.defecto, options);
    // para cada componente que puede contener el objeto jQuery que invoca a esta función
    this.each(function() {
        $(this).addClass('hm-modal');
        var $element = $(this).prop('tagName');
        switch ($element) {
            case 'DIV':
                $(this).find('.hm-modal-content').prepend('<span class="hm-modal-close">Cerrar</span>');
                $(this).find('span').click(function() {
                    $(this).parent().parent().fadeOut();
                    $('.hm-modal-content').slideToggle();
                });
                break;
            case 'BUTTON':
                var $nombre = $(this).data('hm-modal');
                $(this).click(function() {
                    $('#' + $nombre).fadeIn(10);
                    setTimeout(function() {
                        $('.hm-modal-content').slideToggle();
                    }, 100);
                    switch (opts.centrar) {
                        case false:
                            $('.hm-modal-content').css('margin', 'auto')
                            $('.hm-modal-content').removeClass('hm-centrar');
                            break
                        case true:
                            $('.hm-modal-content').css('margin', '0');
                            $('.hm-modal-content').addClass('hm-centrar');
                            break;
                    };
                    $('.hm-modal-content').css('width', opts.width + '%');
                    switch (opts.sombra) {
                        case false:
                            break
                        case true:
                            $('.hm-modal-content').addClass('hm-sombra')
                            break
                    };
                });
                break;
        }
        window.onclick = function(event) {
            var $elemento = $(event.target);
            var $elementotagname = $elemento.prop('tagName');
            var $elementoclass = $elemento.prop('class');
            var $elementoid = $elemento.prop('id');
            var $elementoclass2 = $elementoclass.split(" ");
            console.log($elementoid);
            if ($elementotagname == 'DIV' && $elementoclass == $elementoclass2[0] + ' ' + 'hm-modal') {
                if (opts.cerrarclick == true) {
                    //console.log($elementoclass.replace($elementoclass2[0], ''));
                    $('div#' + $elementoid).fadeOut();
                    $('.hm-modal-content').slideToggle();
                };
            }
        }
    });
    // definimos los parámetros junto con los valores por defecto de la función
};