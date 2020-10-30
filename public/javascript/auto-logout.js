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
    // this.warnTimeout = setTimeout(this.warn, 1 * 10 * 1000);

    // this.logoutTimeout = setTimeout(this.logout, 1 * 20 * 1000);
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
    // logout();
    this.destroy(); // Cleanup
  }

  destroy() {
    this.clearTimeout();

    this.events.forEach((event) => {
      window.removeEventListener(event, this.resetTimeout);
    });
  }
}

// Set timeout variables.
// var timeoutWarning = 840000; // Display warning in 14 Mins.
// var timeoutNow = 60000; // Warning has been shown, give the user 1 minute to interact
// var logoutUrl = 'logout.php'; // URL to logout page.

// var warningTimer;
// var timeoutTimer;

// // Start warning timer.
// function StartWarningTimer() {
//     warningTimer = setTimeout("IdleWarning()", timeoutWarning);
// }

// // Reset timers.
// function ResetTimeOutTimer() {
//     clearTimeout(timeoutTimer);
//     StartWarningTimer();
//     $("#timeout").dialog('close');
// }

// // Show idle timeout warning dialog.
// function IdleWarning() {
//     clearTimeout(warningTimer);
//     timeoutTimer = setTimeout("IdleTimeout()", timeoutNow);
//     $("#timeout").dialog({
//         modal: true
//     });
// Add code in the #timeout element to call ResetTimeOutTimer() if
// the "Stay Logged In" button is clicked
// }

// Logout the user.
// function IdleTimeout() {
//     window.location = logoutUrl;
// }

// var AutoLogout = (function() {
//   function AutoLogout() {
//     this.events = ['load', 'mousemove', 'mousedown',
//                    'click', 'scroll', 'keypress'];

//     this.warn = this.warn.bind(this);
//     this.logout = this.logout.bind(this);
//     this.resetTimeout = this.resetTimeout.bind(this);

//     var self = this;
//     this.events.forEach(function(event) {
//       window.addEventListener(event, self.resetTimeout);
//     });

//     this.setTimeout();
//   }

//   var _p = AutoLogout.prototype;

//   _p.clearTimeout = function() {
//     if(this.warnTimeout)
//       clearTimeout(this.warnTimeout);

//     if(this.logoutTimeout)
//       clearTimeout(this.logoutTimeout);
//   };

//   _p.setTimeout = function() {
//     this.warnTimeout = setTimeout(this.warn, 1 * 5 * 1000);

//     this.logoutTimeout = setTimeout(this.logout, 1 * 10 * 1000);
//   };

//   _p.resetTimeout = function() {
//     this.clearTimeout();
//     this.setTimeout();
//   };

//   _p.warn = function() {
//     alert('You will be logged out automatically in 1 minute.');
//   };

//   _p.logout = function() {
//     // Send a logout request to the API
//     console.log('Sending a logout request to the API...');

//     this.destroy();  // Cleanup
//   };

//   _p.destroy = function() {
//     this.clearTimeout();

//     var self = this;
//     this.forEach(function(event) {
//       window.removeEventListener(event, self.resetTimeout);
//     });
//   };

//   return AutoLogout;
// })();

// module.exports = AutoLogout;

// var myVar;

// function openWin() {
//   var myWindow = window.open("", "myWindow", "width=200, height=100");
//   myWindow.document.write("<p>This is 'myWindow'</p>");
//   setTimeout(function(){ myWindow.close() }, 3000);
// }

window.onload = new AutoLogout();

// function alertFunc() {
//   alert("Hello!");
// }