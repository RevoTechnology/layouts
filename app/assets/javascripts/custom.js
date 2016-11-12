//= require jquery

$(document).ready(function() {
    var $window = $(window),
        $body = $('body');

    $('.link-register-step2').on('click', function() {
        $('.popup.profile').bPopup({
            closeClass: 'popup-close',
            opacity: 0.8,
            follow: false
            // , scrollBar: false
        });
    });

    $('.link-register-step3').on('click', function() {
        $('.popup.profilePhoto').bPopup({
            closeClass: 'popup-close',
            opacity: 0.8,
            follow: false
            // , scrollBar: false
        });
    });


    /****************************** FORM ******************************/
    /***** input focus/blur *****/
    $('.fieldContainer__field').on({
        focus: function() {
            var $inputContainer = $(this).closest('.fieldContainer');

            $inputContainer.addClass('is-focused');
            $inputContainer.removeClass('is-filled');
        },
        blur: function() {
            var $inputContainer = $(this).closest('.fieldContainer'),
                $this = $(this);

              $inputContainer.removeClass('is-focused');
              setTimeout(function() {
                  if ($this.val().length) {
                      $inputContainer.addClass('is-filled');
                  }
              }, 0);
        }
    });

    /***** input radio period *****/
    $('.fieldContainer__fieldPeriod').on('change', function() {
        var $formBlock = $(this).closest('.formBlock'),
            $fieldContainers = $formBlock.find('.fieldContainer'),
            $fieldContainerCurrent = $(this).closest('.fieldContainer'),
            $labels = $fieldContainers.find('.labelRadio').not('.labelRadio--header'),
            $labelCurrent = $fieldContainerCurrent.find('.labelRadio').not('.labelRadio--header');

        $labels.slideUp(300);
        $labelCurrent.slideDown(300);
        $fieldContainers.removeClass('is-checked');
        $fieldContainerCurrent.addClass('is-checked');
    });

    /***** input image load *****/
    $('.field-image').on('change', function() {
        var $container = $(this).closest('.fieldContainer'),
            $preview = $container.find('.fieldContainer__imgBg'),
            reader  = new FileReader(),
            file = $(this).prop('files')[0];

        reader.onloadend = function () {
            $container.addClass('with-image');
            $preview.attr('src', reader.result);
        }

        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
        } else {
            $preview.attr('src', '');
            $container.removeClass('with-image');
        }
    });

    /***** input reset *****/
    $('.field-reset').on('click', function(e) {
        e.preventDefault();
        var $block = $(this).closest('.formBlock');

        $block.find('.fieldContainer__field').val('');
        $block.find('.fieldContainer').removeClass('is-filled');
    });

    /***** input masks *****/
    $(".field-date").inputmask("dd/mm/yyyy",{ "placeholder": "дд/мм/гггг" });
    $(".field-mobile").inputmask('+7(999)-999-99-99');

    /***** input select *****/
    $('.field_select').selectize({
        sortField: {
            field: 'text',
            direction: 'asc'
        }
    });


    /***** send sms *****/
    $('.send-sms').on('click', function(e) {
        e.preventDefault();
        var $self = $(this);

        if ($self.hasClass('is-disabled')) {
            return false;
        }

        var $container = $(this).closest('.formBlockWrapper'),
            $hiddenBlock = $container.find('.formSendHidden'),
            $timeLeftBlock = $hiddenBlock.find('.formSendHiddenInfo__time'),
            timeLeft = parseInt($timeLeftBlock.text()),
            timeLeftStart = timeLeft;

        $self.addClass('is-disabled');
        $hiddenBlock.slideDown(300);

        var timerId = setInterval(function() {
            timeLeft = parseInt($timeLeftBlock.text());
            timeLeft -= 1;
            $timeLeftBlock.text(timeLeft);

            if (timeLeft == -1) {
                clearInterval(timerId);
                $self.removeClass('is-disabled');
                $hiddenBlock.slideUp(300);
                $timeLeftBlock.text(timeLeftStart);
            }
        }, 1000);
    });
});
