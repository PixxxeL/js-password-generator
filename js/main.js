
$( function () {
	$('#do-password-generate').on('click', function (e) {
		e.preventDefault();
		$('#generated-password').val(
			$.password_generator({
				count   : $('#password-chars-count').val(),
	            digits  : $('#is-password-digits').is(':checked'),
	            upper   : $('#is-password-upper').is(':checked'),
	            lower   : $('#is-password-lower').is(':checked'),
	            special : $('#is-password-special').is(':checked')
			})
		);
	}).trigger('click');
	$('#generated-password').on('focus', function () {
		this.select();
	});
});
