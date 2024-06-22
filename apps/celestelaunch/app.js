{ // must be inside our own scope here so that when we are unloaded everything disappears

  /* Celeste launcher
   *
   */
  let backgroundSource = () => {
    return require("heatshrink").decompress(atob("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"));
  }
  let background = backgroundSource();
  let postcardTopSource = () => {
    return require("heatshrink").decompress(atob("uEowcBkAsngMf/4Am/EcuIEBwInh8eOnBTC8E2n4qh/wpDh//459jFIPAtu27Apk/0f/u2g4pk+HbtvxfchTBn9sVAKnl4djFEYpDAQQpmAE34kF/FEv+gMkwIplwFJkmSn4oj/kSFIVHFMfgyQpspApjggp/FP4p/FKtHFMfgFNs/FMf8iQpBwIojAAOApMgv4pl/0Bj4OMRLX4FJmA44pm/k2/Apm8O27ZiMFLH4hoDBFMvDtu27B9kfAW2aMxTB2AsBFLMcv4LJtkPFDP+nEcuJxJgYoZ/+OnDsZPp8AAE8BA"));
  };
  let postcardTop = postcardTopSource();

  let postcardBottomSource = () => {
    return require("heatshrink").decompress(atob("tUkwcBFc+P/4Aj/kRE0n//0IE8vBj4nl8Ce/T36e/T36e/T36e/T36e/T36e/T36e/T36e/T36e/T36eogAAkgI="));
  };
  let postcardBottom = postcardBottomSource();

  let testIconSource = () => {
    return require("heatshrink").decompress(atob("jkcwcCpMk0mQpMEyUJkESomSyQIBBYMgyUIklJCoIUDgMgwVFkmSpEEwYdB4UJBwIUBiFB2GQtuEFgIUBhEg7cJg3YCIIUBIwNt2GAAQIIBkEDtu27cBAQIdBgFB2wUBBANggAyCjYfB7YdBgAyCoOA/gdB7AOBCgUYv0Ajdtw4UCyFB3/gGQQOBMoIpB//A/9t2//xMkwVAm3f/4UBIIMSpEgEwIID7dhkkShoIEAQPCNAIIDsE27dsKYIUJgwIFFIShBCg0SCgnAgAFBNAQpGXgNJgMABYkAxMSyAhBRwM24ECpGJlCfCSwMAAQOUyWABAQCDqRnBBAtJlIDBA"));
  };
  let testIcon = testIconSource();

  let bannerSource = () => {
    return require("heatshrink").decompress(atob("llDwcCpGWrNlAReUwcs2XLARXIEH4g/EH4gWw88+fPARQgBz1584CLEH4gR4QgO8mkEH4g/EH4gFwcs2XLARQgBy1ZsoCKsgg/AQMkEB0SEEFFEB8LEH4ghhEgwQCLUgMQyVJg0SpMgoVJkkYAQOBhMkx8pkmTlskyU80mSpm0yVI+QCBEB+XEAOSkoCBrggBpGUDQNyAoOQAoMWEAMipAdBrICByIgBh4gBdIIdBjgdBoGwDoNyqVHzxlByw+BkV4EAQaBvPhEAI+BEA0MEANA+VSk4gGvMJkVZgogCkPPEAmQnh9BhjCBjggCMQLIBEAMeEAdlEwIgCI4MLEYIgBIIggDwggCQYMeMQ0JkfKBAMLBAIgBMoNADQJiByUhWANIBANJlwjBkmaAQJKBkAA=="))
  };
  let banner = bannerSource();

  let cards = [ //array of cards to build menu from.
    {
      name: 'Games',
      apps: []
    },
    {
      name: 'Navigation',
      apps: []
    },
    {
      name: 'Time',
      apps: []
    },
    {
      name: 'other',
      apps: []
    },
  ];
  let activeCard = 0;
  let activeCardSelected = false;
  let activeApp = 0;
  let activeAppSelected = false;


  let settings = Object.assign({
    showClocks: true,
    showLaunchers: true,
    direct: false,
    swipeExit: false,
    timeOut: "Off",
    interactionBuzz: false,
  }, require('Storage').readJSON("dtlaunch.json", true) || {});

  let s = require("Storage");
  
  let launchCache = s.readJSON("launch.cache.json", true) || {};
  let launchHash = require("Storage").hash(/\.info/);
  if (launchCache.hash != launchHash) {
    launchCache = {
      hash: launchHash,
      apps: s.list(/\.info$/)
        .map(app => { var a = s.readJSON(app, 1); return a && { name: a.name, type: a.type, icon: a.icon, sortorder: a.sortorder, src: a.src, tags: a.tags}; }) // added tags: a.tags
        .filter(app => app && (app.type == "app" || (app.type == "clock" && settings.showClocks) || !app.type))
        .sort((a, b) => {
          var n = (0 | a.sortorder) - (0 | b.sortorder);
          if (n) return n; 
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
    };
    s.writeJSON("launch.cache.json", launchCache);
  }
  let apps = launchCache.apps;
  apps.forEach(app => {
    if (app.icon)
      {app.icon = s.read(app.icon);}
    if (apps.indexOf(app) < 3) {
      cards[0].apps.push(app);
    } else if (apps.indexOf(app) < 6) {
      cards[1].apps.push(app);
    } else if (apps.indexOf(app) < 9) {
      cards[2].apps.push(app);
    } 
  });


  let drawPostcard = function (x, y, title, icon, open) {
    if (!open) {
      g.drawImage(postcardBottom, x + 3 + open, y + 2);
    } else {
      g.drawImage(postcardBottom, x + 6 + open, y + 2);
    }
    g.drawImage(postcardTop, x - open, y);
    g.drawImage(icon, x - open + 9, y + 6);
    g.setFont('6x8').setFontAlign(0, 0).setColor(0, 0, 0);
    g.drawString(title, x + 71 - open, y + 20);

  };
  let drawPage = function () {
    g.reset();
    g.clear(1)
    g.drawImage(background, 0, 0)
    if (activeCardSelected == true) { // Draw Submenu
      g.drawImage(banner, 66, 0);
      g.drawImage(cards[activeCard].apps[activeApp].icon, 72, 15, { scale: 0.7 });
      for (i = 0; i < cards[activeCard].apps.length; i++) {
        let appX;
        if (i > activeApp) {
          appX = ((i - activeApp) * 30) + 90;
        }
        if (i < activeApp) {
          appX = ((i - activeApp) * 30) + 63;
        }
        if (i != activeApp) {
          g.drawImage(cards[activeCard].apps[i].icon, appX, 18, { scale: 0.5 });
        }
      }
    } else { //Draw Menu
      for (let i = 0; i < cards.length; i++) {
        let postcardSpread = 0;
        let postcardX = 32;
        let postcardY = 60 + (i * 45) - (activeCard * 45);

        if (cards.length < 5) {
          postcardY = 15 + (i * 45);
          if (activeCard > 1) {
            postcardY = (i * 45) - 14;
          }
        } else 
        if (activeCard >= cards.length - 2) {
          postcardY = -55 - (cards.length - 2) + (i * 45);
        }

        if (activeCard == i) {
          postcardSpread = 27;
        }
        drawPostcard(postcardX, postcardY, cards[i].name, testIcon, postcardSpread);
      }
    }
    g.flip();
  };

  let buzzShort = function () {
Bangle.buzz(60, 0.5);
  };
  let buzzLong = function () {
Bangle.buzz(100);
  };


  let swipeListener = function (dirLeftRight, dirUpDown) {
    updateTimeoutToClock();
    if (dirLeftRight == 1) {
      if (activeCardSelected == true && activeApp < cards[activeCard].apps.length - 1) {
        activeApp++;
        buzzShort();

      }
    }
    if (dirLeftRight == -1) {
      if (activeCardSelected == true && activeApp > 0) {
        activeApp--;
        buzzShort();

      }
    }
    if (dirUpDown == 1) {
      if (activeCard < cards.length - 1) {
        activeCard++;
        buzzShort();
      }
    }
    if (dirUpDown == -1) {
      if (activeCard > 0) {
        activeCard--;
        buzzShort();
      }
    }
    drawPage();
  };

  let touchListener = function (_, p) {
    updateTimeoutToClock();
    if (activeCardSelected) {
      console.log(apps[activeApp].src)
      Bangle.load(apps[activeApp].src)
      buzzLong();
    } else {
      activeCardSelected = true;
      buzzShort();
    }
    drawPage();
  };

  let buttonListener = function () {
    updateTimeoutToClock();
    if (activeCardSelected) {
      if (activeAppSelected) {
        activeAppSelected = false;
      } else {
        activeCardSelected = false;
      }
    } else {
      Bangle.showClock();
    }
    drawPage();
  };


  let unload = function () { //unload app
    if (timeoutToClock) { clearTimeout(timeoutToClock); }
    require("widget_utils").show();
    Bangle.drawWidgets();
  };

  // taken from dtlaunch
  let timeoutToClock;
  const updateTimeoutToClock = function () {
    if (settings.timeOut != "Off") {
      let time = parseInt(settings.timeOut);  //the "s" will be trimmed by the parseInt
      if (timeoutToClock) clearTimeout(timeoutToClock);
      timeoutToClock = setTimeout(Bangle.showClock, time * 1000);
    }
  };

  Bangle.setUI({
    mode: 'custom',
    swipe: swipeListener,
    touch: touchListener,
    btn: buttonListener,
    remove: unload
  });

  updateTimeoutToClock();
  Bangle.loadWidgets();
  require("widget_utils").hide();
  drawPage();
}