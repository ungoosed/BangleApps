{ // must be inside our own scope here so that when we are unloaded everything disappears

  /* Celeste launcher
   *
   */
  let postcardTope = () => {
    return require("heatshrink").decompress(atob("uEowcBkAsngMf/4Am/EcuIEBwInh8eOnBTC8E2n4qh/wpDh//459jFIPAtu27Apk/0f/u2g4pk+HbtvxfchTBn9sVAKnl4djFEYpDAQQpmAE34kF/FEv+gMkwIplwFJkmSn4oj/kSFIVHFMfgyQpspApjggp/FP4p/FKtHFMfgFNs/FMf8iQpBwIojAAOApMgv4pl/0Bj4OMRLX4FJmA44pm/k2/Apm8O27ZiMFLH4hoDBFMvDtu27B9kfAW2aMxTB2AsBFLMcv4LJtkPFDP+nEcuJxJgYoZ/+OnDsZPp8AAE8BA"));
  };
  let postcardTop = postcardTope();

  let postcardBottome = () => {
    return require("heatshrink").decompress(atob("tUkwcBFc+P/4Aj/kRE0n//0IE8vBj4nl8Ce/T36e/T36e/T36e/T36e/T36e/T36e/T36e/T36e/T36eogAAkgI="));
  };
  let postcardBottom = postcardBottome();

  let testIcone = () => {
    return require("heatshrink").decompress(atob("jkcwcCpMk0mQpMEyUJkESomSyQIBBYMgyUIklJCoIUDgMgwVFkmSpEEwYdB4UJBwIUBiFB2GQtuEFgIUBhEg7cJg3YCIIUBIwNt2GAAQIIBkEDtu27cBAQIdBgFB2wUBBANggAyCjYfB7YdBgAyCoOA/gdB7AOBCgUYv0Ajdtw4UCyFB3/gGQQOBMoIpB//A/9t2//xMkwVAm3f/4UBIIMSpEgEwIID7dhkkShoIEAQPCNAIIDsE27dsKYIUJgwIFFIShBCg0SCgnAgAFBNAQpGXgNJgMABYkAxMSyAhBRwM24ECpGJlCfCSwMAAQOUyWABAQCDqRnBBAtJlIDBA"));
  };
  let testIcon = testIcone();

  let settings = Object.assign({
    showClocks: true,
    showLaunchers: true,
    direct: false,
    swipeExit: false,
    timeOut: "Off",
    interactionBuzz: false,
  }, require('Storage').readJSON("celestelaunch.json", true) || {});

  let s = require("Storage");
  // Borrowed caching from Icon Launcher, code by halemmerich.
  let launchCache = s.readJSON("launch.cache.json", true) || {};
  let launchHash = require("Storage").hash(/\.info/);
  if (launchCache.hash != launchHash) {
    launchCache = {
      hash: launchHash,
      apps: s.list(/\.info$/)
        .map(app => { var a = s.readJSON(app, 1); return a && { name: a.name, type: a.type, icon: a.icon, sortorder: a.sortorder, src: a.src }; })
        .filter(app => app && (app.type == "app" || (app.type == "clock" && settings.showClocks) || !app.type))
        .sort((a, b) => {
          var n = (0 | a.sortorder) - (0 | b.sortorder);
          if (n) return n; // do sortorder first
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
      app.icon = s.read(app.icon); // should just be a link to a memory area
  });
  let cards = [
    {
      name: 'Games',
      apps: ['setting']
    },
    {
      name: 'Navigation',
      apps: ['health', 'about']
    },
    {
      name: 'Time',
      apps: ['antonclk', 'alarm']
    },
    {  
      name: 'Other',
      apps: [],
    },
  ];
  let pageState = {
    activeCard: 0,
    activeCardSelected: false,
    activeApp: 0,
    activeAppSelected: false,
  }
  let animState = {
    postcardSpread: [],
    pageScrollY: pageState.activeCard * 45,
    pageScrollX: Number,
    appScrollX: Number,
  }
  let maxPage = cards.length - 1;
  let selected = 0;
  let activeCard = 0;
  for (let i = 0; i < cards.length; i++) {
    animState.postcardSpread.push(0);
  }

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
    g.clearRect(0, 0, 175, 175);
    let i = 0;
    for (i = 0; i < cards.length; i++) {
      let postcardSpread = 0;
      let postcardX = 32;

      let target = -pageState.activeCard * 45;
      if ((pageState.activeCard == 0) || (pageState.activeCard == 1)) {
        target = -45;
      }
      if ((pageState.activeCard == maxPage) || (pageState.activeCard == (maxPage - 1))) {
        target = ((-cards.length + 2) * 45) + 17
      }
      let diff = animState.pageScrollY - target;

      if (Math.abs(diff)) {
        if (Math.abs(diff) >= 4) {
          animState.pageScrollY -= ((Math.sign(diff)) * 4);
        }
        if (Math.abs(diff) < 4) {
          animState.pageScrollY = target;
        }
      }
      let postcardY = animState.pageScrollY + 60 + (i * 45);

      if (i == pageState.activeCard) {
        if (animState.postcardSpread[i] <= 19) {
          animState.postcardSpread[i] += 8;
        } else {
          animState.postcardSpread[i] = 27;
        }
      } else {
        if (animState.postcardSpread[i] >= 8) {
          animState.postcardSpread[i] -= 8;
        } else {
          animState.postcardSpread[i] = 0;
        }
      }
      postcardSpread = animState.postcardSpread[i]

      drawPostcard(postcardX, postcardY, cards[i].name, testIcon, postcardSpread);
    }
    g.flip();
  };

  let buzzShort = function () {
    if (settings.interactionBuzz) Bangle.buzz(60, 0.2);
  };
  let buzzLong = function () {
    if (settings.interactionBuzz) Bangle.buzz(100);
  };


  let swipeListener = function (dirLeftRight, dirUpDown) {
    updateTimeoutToClock();
    selected = -1;
    if (dirLeftRight == 1) {
      Bangle.showClock();
    }
    if (dirUpDown == -1) {
      if (pageState.activeCard != 0) {
        --pageState.activeCard;
        buzzShort();
      }
    } else if (dirUpDown == 1) {
      if (pageState.activeCard != maxPage) {
        ++pageState.activeCard;
        buzzShort();
      }

    }
  };

  let touchListener = function (_, p) {
    buzzLong();
    load('alarm.app.js');
    console.log(apps[activeCard].src);
  };

  Bangle.setUI({
    mode: 'custom',
    back: Bangle.showClock,
    swipe: swipeListener,
    touch: touchListener,
    remove: () => { if (timeoutToClock) clearTimeout(timeoutToClock); }
  });

  // taken from Icon Launcher with minor alterations
  let timeoutToClock;
  const updateTimeoutToClock = function () {
    if (settings.timeOut != "Off") {
      let time = parseInt(settings.timeOut);  //the "s" will be trimmed by the parseInt
      if (timeoutToClock) clearTimeout(timeoutToClock);
      timeoutToClock = setTimeout(Bangle.showClock, time * 1000);
    }
  };
  updateTimeoutToClock();
  setInterval(() => { drawPage(); }, 100);
  Bangle.loadWidgets();
  require("widget_utils").hide();
  updateTimeoutToClock();
}