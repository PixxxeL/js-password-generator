
module('Тестирование jQuery-плагина генерирования пароля');

var ITERATIONS = 2000;

test('Тесты обработки', ITERATIONS * 5, function () {
    var tested = $.password_generator, i = 0;
    for (; i < ITERATIONS; i++) {
    	ok(
    		(/[A-z0-9]{6}/g).test(tested()),
    		'Параметры по умолчанию'
    	);
    	ok(
    		(/[0-9]{32}/g).test(tested({count: 32, lower: false, upper: false})),
    		'Все символы - только цифры'
    	);
    	ok(
    		(/[A-Z]{32}/g).test(tested({count: 32, digits: false, lower: false})),
    		'Все символы - только заглавные'
    	);
    	ok(
    		(/[a-z]{32}/g).test(tested({count: 32, digits: false, upper: false})),
    		'Все символы - только прописные'
    	);
    	ok(
    		(/[\!"#\$%&'\(\)\*\+\,\-\.\/\:;<\=>\?@\[\\\]\^_`\{\|\}~]{32}/g).test(tested({count: 32, digits: false, upper: false, lower: false, special: true})),
    		'Все символы - только специальные'
    	);
    }
});
