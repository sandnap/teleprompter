$(function () {
  window.prompter = {
    speed: 7,
    size: 97,
    delay: 5,
    background: 'black',
    foreground: 'white',
    script: 'A teleprompter is a display device that prompts the person speaking with an electronic visual text of a speech or script. Using a teleprompter is similar to using cue cards. The screen is in front of, and usually below, the lens of a professional video camera, and the words on the screen are reflected to the eyes of the presenter using a sheet of clear glass or a specially prepared beam splitter. Light from the performer passes through the front side of the glass into the lens, while a shroud surrounding the lens and the back side of the glass prevents unwanted light from entering the lens.',
    initialize: function () {
      $('input[name="speed"]').val(this.speed);
      $('input[name="size"]').val(this.size);
      $('input[name="delay"]').val(this.delay);
      $('input[name="background"]').val(this.background);
      $('input[name="foreground"]').val(this.foreground);
      $('textarea[name="script"]').val(this.script);
      $('html, body').css('background-color', this.background);
      $('html, body').css('color', this.foreground);
      $('#script').css('font-size', this.size + 'px');
      $('#script p').html(this.script);
      $('#script').css('margin-top', window.innerHeight/2 + 'px').css('margin-bottom', window.innerHeight + 'px');
      this._resetCountdown();
      setTimeout(function () {
        $(window).scrollTop(0);
      }, 1000);
    },
    updateSettings: function () {
      this.speed = $('input[name="speed"]').val();
      this.size = $('input[name="size"]').val();
      this.delay = $('input[name="delay"]').val();
      this.background = $('input[name="background"]').val();
      this.foreground = $('input[name="foreground"]').val();
      this.script = $('textarea[name="script"]').val();
      this.initialize();
      this.hideSettings();
    },
    start: function () {
      this.hideSettings();
      if (this.stopped === true) {
        this._startScrolling();
      } else {
        this._countdown();
      }
    },
    stop: function () {
      this._resetCountdown();
      this._clearTimers();
      this.stopped = true;
    },
    reset: function () {
      $(window).scrollTop(0);
      this._clearTimers();
      this.stopped = false;
      this._resetCountdown();
    },
    showSettings: function () {
      $('#settings').removeClass('settings-closed');
    },
    hideSettings: function () {
      $('#settings').addClass('settings-closed');
    },
    toggleMirror: function () {
      $('#script, #countdown').toggleClass('mirror');
    },
    _countdown: function (curr) {
      var _this = this;
      curr = curr !== undefined ? curr : this.delay;
      $('#countdown-mask').css('display', 'flex');
      if (curr > 0) {
        this.countTimer = setTimeout(function () {
          $('#countdown').html(curr);
          curr -= 1;
          _this._countdown(curr);
        }, 1000);
      } else {
        this._resetCountdown();
        this._startScrolling();
      }
    },
    _resetCountdown: function () {
      $('#countdown').html(this.delay);
      $('#countdown-mask').css('display', 'none');
    },
    _startScrolling: function () {
      this.stopped = false;
      speed = 16 - this.speed;
      if (speed < 5) speed = 5;
      this.interval = setInterval(function () {
        $(window).scrollTop($(window).scrollTop() + 1);
      }, speed);
    },
    _clearTimers: function () {
      clearInterval(this.interval);
      clearInterval(this.countTimer);
    }
  };

  prompter.initialize();
});
