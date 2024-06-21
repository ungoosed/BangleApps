(function(back) {
    var FILE = "celestelaunch.json"; // settings code taken from dtlaunch with a few modifications
    
    var settings = Object.assign({
      showClocks: true,
      showLaunchers: true,
      direct: false,
      swipeExit: false,
      timeOut: "Off",
    }, require('Storage').readJSON(FILE, true) || {});
  
    function writeSettings() {
      require('Storage').writeJSON(FILE, settings);
    }
  
    const timeOutChoices = [/*LANG*/"Off", "10s", "15s", "20s", "30s"];
  
    E.showMenu({
      "" : { "title" : "Celeste launcher" },
      /*LANG*/"< Back" : () => back(),
      /*LANG*/'Show clocks': {
        value: settings.showClocks,
        onchange: v => {
          settings.showClocks = v;
          writeSettings();
        }
      },
      /*LANG*/'Show launchers': {
        value: settings.showLaunchers,
        onchange: v => {
          settings.showLaunchers = v;
          writeSettings();
        }
      },
      /*LANG*/'Direct launch': {
        value: settings.direct,
        onchange: v => {
          settings.direct = v;
          writeSettings();
        }
      },
      /*LANG*/'Time Out': { // Taken from dtlaunch
        value: timeOutChoices.indexOf(settings.timeOut),
        min: 0,
        max: timeOutChoices.length-1,
        format: v => timeOutChoices[v],
        onchange: v => {
          settings.timeOut = timeOutChoices[v];
          writeSettings();
        }
      },
    });
  });
  