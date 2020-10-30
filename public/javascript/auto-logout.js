class AutoLogout {
  constructor() {
    this.events = ['load', 'mousemove', 'mousedown',
      'click', 'scroll', 'keypress'
    ];

    this.warn = this.warn.bind(this);
    this.logout = this.logout.bind(this);
    this.resetTimeout = this.resetTimeout.bind(this);

    this.events.forEach((event) => {
      window.addEventListener(event, this.resetTimeout);
    });

    this.setTimeout();
  }

  clearTimeout() {
    if (this.warnTimeout)
      clearTimeout(this.warnTimeout);

    if (this.logoutTimeout)
      clearTimeout(this.logoutTimeout);
  }

  setTimeout() {
    this.warnTimeout = setTimeout(this.warn, 1 * 20 * 1000);

    this.logoutTimeout = setTimeout(this.logout, 1 * 30 * 1000);
  }

  resetTimeout() {
    this.clearTimeout();
    this.setTimeout();
  }

  warn() {
    alert('If your session remains idle, you will be logged out automatically. Click ok within 10 seconds to continue session.');
    // $('#myModal').modal('show');

    // $('#myModal').on('shown.bs.modal', function () {
    //   $('#myInput').trigger('focus')
    // })
    // var DISPLAY_TIME = 5;
  //   $('#myModal')
  //     .on('show.bs.modal', function () {
  //       $(this).find('.modal-body span').text(DISPLAY_TIME);
  //     }).on('shown.bs.modal', function () {
  //       var countdownTimer = setInterval(function (timedAlert) {
  //         var spanElt = timedAlert.find('.modal-body span'),
  //           timeLeft = parseInt(spanElt.text());
  //         $('.modal-body span').text(--timeLeft);
  //         if (timeLeft <= 0) timedAlert.modal('hide');
  //       }, 1000, $(this));
  //       $(this).data('countdownTimer', countdownTimer);
  //     }).on('hidden.bs.modal', function () {
  //       clearInterval($(this).data('countdownTimer'));
  //     });
      
  }

  logout() {
    // Send a logout request to the API
    // $('#myModal').on('shown.bs.modal', function () {
    //   $('#myInput').trigger('focus')
    // })

    console.log('Sending a logout request to the API...');
    alert('You have been automatically logged out due to inactivity!')
    logout();
    this.destroy(); // Cleanup
  }

  destroy() {
    this.clearTimeout();

    this.events.forEach((event) => {
      window.removeEventListener(event, this.resetTimeout);
    });
  }
}

window.onload = new AutoLogout();

