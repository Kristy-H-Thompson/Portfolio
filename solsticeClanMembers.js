


//AJAX - helps to load characters faster
$( document ).ready(function()  {
//Script link and setting up the character array
const scriptURL = 'https://script.google.com/macros/s/AKfycbzsNEjjseObXABaBT4-6O8BTtUkMse-4KPY2XqCL4vpk8FaYBgMle5t4o3q4bRynybB/exec';
var chars = [];
      
//Setting up locations for all of the character ranks
const priest_location = document.getElementById("priest");
const sun_location = document.getElementById("scsuns");
const moon_location = document.getElementById("scmoons");
const apps_location = document.getElementById("solsticeclanapprentices");
const kits_location = document.getElementById("sckits");
const elder_location = document.getElementById("scelders");
const gallery_location = document.getElementById("scgallery");
const thisclanname = "SolsticeClan";


// Create a Cat Object
function Cat(timestamp, name, rper, physical, traits, characterimage, rank, zodiac, status, parent1, parent2, bloodtype, power, hybrid, malady) {
    this.timestamp = timestamp,
    this.name = name,
    this.rper = rper,
    this.physical = physical,
    this.traits = traits,
    this.characterimage = characterimage,
    this.rank = rank,
    this.zodiac = zodiac,
    this.status = status,
    this.parent1 = parent1,
    this.parent2 = parent2,
    this.bloodtype = bloodtype,
    this.power = power,
    this.hybrid = hybrid,
    this.magicmalady = malady
}


//Function used to load characters
function loadARank(loc, current_rank, catlist) {
  loc.innerHTML = catfilter(catlist, current_rank);
}


//Function used to load characters to the gallery
function loadAGallery(loc, catlist) {
  loc.innerHTML = catgallery(catlist);
}


//This creates new Cat objects from the spreadsheet, and sends them to display on the page
function getText(cats) {
  cats = cats.split(',');
  for (i = 15; i < cats.length; i += 15) {
  chars.push(new Cat(cats[i], cats[i + 1], cats[i + 2], cats[i + 3], cats[i + 4], cats[i + 5], cats[i + 6], cats[i + 7], cats[i + 8], cats[i + 9], cats[i + 10], cats[i + 11], cats[i + 12], cats[i + 13], cats[i + 14]));
  }
    priest_chars = catfilterarray(chars, 'Priest');
    app_chars = catfilterarray(chars, 'Apprentice');
    sun_chars = catfilterarray(chars, 'Sun Warrior');
    moon_chars = catfilterarray(chars, 'Moon Warrior');
    kit_chars = catfilterarray(chars, 'Kit');
    elder_chars = catfilterarray(chars, 'Elder');
    gallery_chars = catfilterarray(chars, "")
    archive_chars = catfilterarray(chars, '', '', '', 'Archived');

      loadARank(priest_location, "Priest", priest_chars);
      loadARank(apps_location, "Apprentice", app_chars);
      loadARank(sun_location, "Sun Warrior", sun_chars);
      loadARank(moon_location, "Moon Warrior", moon_chars);
      loadARank(kits_location, "Kit", kit_chars);
      loadARank(elder_location, "Elder", elder_chars);
      loadAGallery(gallery_location, chars);

  countCats();
}


//This function tells the page how to display the cat objects
function catfilter(cha, r = "", user = "", zodiac = "", status = "") {
  l = "";
  tempchars = cha;
  cha = [];
  for (i = 0; i < tempchars.length; i++) {
    if (
      (tempchars[i].rper == user || user == "") &&
      (tempchars[i].rank == r || r == "") &&
      (tempchars[i].zodiac == zodiac || zodiac == "") &&
      (tempchars[i].status != "Archived")
    ) {
      l +=
        onclick=\"displaycatonclick('" +
        tempchars[i].charactername +
        "')\" + "class='character-name-button' >" +
        tempchars[i].name +
        "</button>" +
        " rp'd by " +
        tempchars[i].rper +
        " - " +
        tempchars[i].bloodtype +
        "<br>" +
        tempchars[i].physical +
        "<br>" +
        tempchars[i].traits +
        "<br>Zodiac: " +
        tempchars[i].zodiac +
        "<br><br>";
      cha.push(tempchars[i]);
    } else if (status == "Archived" && tempchars[i].status == "Archived") {
      l +=
        "<button onclick=\"displaycatonclick('" +
        tempchars[i].charactername +
        "') + "class='character-name-button' >" +
        tempchars[i].name +
        "</button>" +
        " rp'd by " +
        tempchars[i].rper +
        " - " +
        tempchars[i].bloodtype +
        "<br>" +
        tempchars[i].physical +
        "<br>" +
        tempchars[i].traits +
        "<br>Zodiac: " +
        tempchars[i].zodiac +
        "<br><br>";
      cha.push(tempchars[i]);
    }
  }
  return l;
}


//This function
function catfilterarray(
  tempchars,
  r = "",
  user = "",
  zodiac = "",
  status = ""
) {
  l = [];
  char = [];
  for (i = 0; i < tempchars.length; i++) {
    if (
      (tempchars[i].rper == user || user == "") &&
      (tempchars[i].rank == r || r == "") &&
      (tempchars[i].zodiac == zodiac || zodiac == "") &&
      tempchars[i].status != "Archived" &&
      status != "Archived"
    ) {
      l +=
        tempchars[i].name +
        " rp'd by " +
        tempchars[i].rper +
        " - " +
        tempchars[i].bloodtype +
        "<br>" +
        tempchars[i].physical +
        "<br>" +
        tempchars[i].traits +
        "<br>Zodiac: " +
        tempchars[i].zodiac +
        "<br><br>";
      char.push(tempchars[i]);
    } else if (status == "Archived" && tempchars[i].status == "Archived") {
      l +=
        tempchars[i].name +
        " rp'd by " +
        tempchars[i].rper +
        " - " +
        tempchars[i].bloodtype +
        "<br>" +
        tempchars[i].physical +
        "<br>" +
        tempchars[i].traits +
        "<br>Zodiac: " +
        tempchars[i].zodiac +
        "<br><br>";
      char.push(tempchars[i]);
    }
  }
  return char;
}


//This function tells the page how to display cats in the gallery
function catgallery(cha, user = "", zodiac = "", status = "") {
  l = "";
  tempchars = cha;
  cha = [];
  for (i = 0; i < tempchars.length; i++) {
    if (tempchars[i].status == "Pending" && (status = "Pending")) {
      l +=
        "<div class= 'gallery-images' onclick=displaycatonclick('" +
        tempchars[i].name +
        "')  style='background-image:url(" +
        '"https://wallpaperaccess.com/full/3932353.jpg");' +
        "'></div>";
    } else if (
      (tempchars[i].rper == user || user == "") &&
      (tempchars[i].zodiac == zodiac || zodiac == "") &&
      tempchars[i].status != "Archived" &&
      status != "Archived"
    ) {
      l +=
        "<div class= 'gallery-images' onclick=displaycatonclick('" +
        tempchars[i].name +
        "')  style='background-image:url(" +
        tempchars[i].characterimage +
        ");'>" +
        "</div>";
    }
  }
  return l;
}


// Alphabetizing characters on the page from a->z and z->a
function alphabet(loc, chars, rank = "", viewName = "") {
  chars.sort(function (x, y) {
    let a = x.name.toUpperCase();
    b = y.name.toUpperCase();
    return a == b ? 0 : a > b ? 1 : -1;
  });

  chars.sort(function (x, y) {
    return x.name - y.name;
  });

  if (viewName == "allegiances") {
    loc.innerHTML = catfilter(chars, rank);
  } else if (viewName == "gallery") {
    loc.innerHTML = catgallery(chars, rank);
  } else {
    console.log("help");
  }
}

function sortRev(loc, chars, rank = "", viewName = "") {
  chars.sort(function (x, y) {
    let a = x.name.toUpperCase();
    b = y.name.toUpperCase();
    return a == b ? 0 : a > b ? 1 : -1;
  });

  chars.sort(function (x, y) {
    return x.name - y.name;
  });

  if (viewName == "allegiances") {
    chars.reverse();
    loc.innerHTML = catfilter(chars, rank);
  } else if (viewName == "gallery") {
    chars.reverse();
    loc.innerHTML = catgallery(chars, rank);
  } else {
    console.log("help");
  }
}


// function for the alphabetizing characters on click
function allsort() {
  alphabet(priest_location, priest_chars, "Priest", "allegiances");
  alphabet(apps_location, app_chars, "Apprentice", "allegiances");
  alphabet(sun_location, sun_chars, "Sun Warrior", "allegiances");
  alphabet(moon_location, moon_chars, "Moon Warrior", "allegiances");
  alphabet(kits_location, kit_chars, "Kit", "allegiances");
  alphabet(elder_location, elder_chars, "Elder", "allegiances");
  alphabet(gallery_location, chars, "", "gallery");
}

function allrevsort() {
  sortRev(priest_location, priest_chars, "Priest", "allegiances");
  sortRev(apps_location, app_chars, "Apprentice", "allegiances");
  sortRev(sun_location, sun_chars, "Sun Warrior", "allegiances");
  sortRev(moon_location, moon_chars, "Moon Warrior", "allegiances");
  sortRev(kits_location, kit_chars, "Kit", "allegiances");
  sortRev(elder_location, elder_chars, "Elder", "allegiances");
  sortRev(gallery_location, chars, "", "gallery");
}


//Counting # of chars
function countCats() {
  $("priestcount").text(priest_chars.length);
  $("appcount").text(app_chars.length);
  $("mooncount").text(moon_chars.length);
  $("suncount").text(sun_chars.length);
  $("kitcount").text(kit_chars.length);
  $("eldercount").text(elder_chars.length);
  $("totalcount").text(chars.length);

  bloods = sumBloods();

  $("dcount").text(
    String(bloods[0]) +
      " cats - " +
      String(
        Math.round(
          (bloods[0] / (bloods[0] + bloods[1] + bloods[2] + bloods[3])) * 100
        )
      ) +
      "%"
  );
  $("ecount").text(
    String(bloods[1]) +
      " cats - " +
      String(
        Math.round(
          (bloods[1] / (bloods[0] + bloods[1] + bloods[2] + bloods[3])) * 100
        )
      ) +
      "%"
  );
  $("acount").text(
    String(bloods[2]) +
      " cats - " +
      String(
        Math.round(
          (bloods[2] / (bloods[0] + bloods[1] + bloods[2] + bloods[3])) * 100
        )
      ) +
      "%"
  );
  $("aacount").text(
    String(bloods[3]) +
      " cats - " +
      String(
        Math.round(
          (bloods[3] / (bloods[0] + bloods[1] + bloods[2] + bloods[3])) * 100
        )
      ) +
      "%"
  );
}

function sumBloods() {
  d = 0;
  e = 0;
  a = 0;
  aa = 0;

  for (i = 0; i < chars.length; i++) {
    switch (chars[i].bloodtype) {
      case "Diamond Blood":
        d += 1;
        break;

      case "Emerald Blood":
        e += 1;
        break;

      case "Amethyst Blood":
        a += 1;
        break;

      case "Amber Blood":
        aa += 1;
        break;
    }
  }

  return [d, e, a, aa];
}


//Sorting by Zodiac Signs
function sortZodiac(loc, chars, rank, viewName) {
  chars.sort(function (x, y) {
    let a = x.zodiac.toUpperCase();
    b = y.zodiac.toUpperCase();
    return a == b ? 0 : a > b ? 1 : -1;
  });
  chars.sort(function (x, y) {
    return x.zodiac - y.zodiac;
  });
  if (viewName == "allegiances") {
    loc.innerHTML = catfilter(chars, rank);
  } else if (viewName == "gallery") {
    loc.innerHTML = catgallery(chars, rank);
  } else {
    console.log("help");
  }
}

function sortallZodiac() {
  sortZodiac(priest_location, priest_chars, "Priest", "allegiances");
  sortZodiac(apps_location, app_chars, "Apprentice", "allegiances");
  sortZodiac(sun_location, sun_chars, "Sun Warrior", "allegiances");
  sortZodiac(moon_location, moon_chars, "Moon Warrior", "allegiances");
  sortZodiac(kits_location, kit_chars, "Kit", "allegiances");
  sortZodiac(elder_location, elder_chars, "Elder", "allegiances");
  sortZodiac(gallery_location, chars, "", "gallery");
}

//flags this character as pending
function flagStatus() {
  for (i = 0; i < chars.length; i++) {
    console.log("hello world");
    if (chars[i].status.toLowerCase() == "pending") {
      chars[i].name = "<pending>" + chars[i].name + "</pending>";
      chars[i].characterimage =
        "https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
    }
  }
}

//Joining Form- Submit a Character
const form = document.forms["SolsticeClanJoining"];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const bt = callme();
  document.getElementById("blood1type").value = bt;
  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
    mode: "no-cors"
  })
    .then((response) =>
      alert(
        "Character submitted! \n \n Your character's blood type is " +
          bt +
          " ^^",
        response
      )
    )
    .catch((error) => alert("Error!", error.message));
});


// Username Search
function submituser() {
  var user = document.getElementById("username1").value;

  priest_chars = catfilterarray(priest_chars, "Priest", user);
  priest_location.innerHTML = catfilter(priest_chars, "Priest");

  app_chars = catfilterarray(app_chars, "Apprentice", user);
  apps_location.innerHTML = catfilter(app_chars, "Apprentice");

  kit_chars = catfilterarray(kit_chars, "Kit", user);
  kits_location.innerHTML = catfilter(kit_chars, "Kit");

  sun_chars = catfilterarray(sun_chars, "Sun Warrior", user);
  sun_location.innerHTML = catfilter(sun_chars, "Sun Warrior");

  moon_chars = catfilterarray(moon_chars, "Moon Warrior", user);
  moon_location.innerHTML = catfilter(moon_chars, "Moon Warrior");

  elder_chars = catfilterarray(elder_chars, "Elder", user);
  elder_location.innerHTML = catfilter(elder_chars, "Elder");

  gallery_chars = catfilterarray(chars, "", user);
  gallery_location.innerHTML = catgallery(gallery_chars, "");
}


// Reset all sort/filters
function resetCats() {
  var cats = $(hiddenelement).text();
  cats = cats.split(",");
  chars = [];

  for (i = 15; i < cats.length; i += 15) {
    chars.push(
      new Cat(
        cats[i],
        cats[i + 1],
        cats[i + 2],
        cats[i + 3],
        cats[i + 4],
        cats[i + 5],
        cats[i + 6],
        cats[i + 7],
        cats[i + 8],
        cats[i + 9],
        cats[i + 10],
        cats[i + 11],
        cats[i + 12],
        cats[i + 13],
        cats[i + 14]
      )
    );
  }

  priest_chars = catfilterarray(chars, "Priest");
  app_chars = catfilterarray(chars, "Apprentice");
  sun_chars = catfilterarray(chars, "Sun Warrior");
  moon_chars = catfilterarray(chars, "Moon Warrior");
  kit_chars = catfilterarray(chars, "Kit");
  elder_chars = catfilterarray(chars, "Elder");
  archive_chars = catfilterarray(chars, "", "", "", (status = "Archived"));

  loadARank(priest_location, "Priest", priest_chars);
  loadARank(apps_location, "Apprentice", app_chars);
  loadARank(sun_location, "Sun Warrior", sun_chars);
  loadARank(moon_location, "Moon Warrior", moon_chars);
  loadARank(kits_location, "Kit", kit_chars);
  loadARank(elder_location, "Elder", elder_chars);

  loadAGallery(gallery_location, chars);
}

  $.ajax({
    crossOrigin: true,
    url: scriptURL,
    success: function(data) {
      getText(data);
      console.log('AJAX request completed successfully onload and information has been fetched from HG Database.')

    },
    dataType: 'text'
  });
});


//Character Archive
var yourcats = [];

function showArchive() {
  const you = document.getElementById("upperusername").innerText;
  document.getElementById("archiveexplanation").style.display = "none";

  for (i = 0; i < archive_chars.length; i++) {
    if (archive_chars[i].rper.toUpperCase() == you.toUpperCase()) {
      yourcats.push(archive_chars[i]);
    }
  }
  for (i = 0; i < yourcats.length; i++) {
    document.getElementById("archivechars").innerHTML +=
      yourcats[i].name +
      " rp'd by " +
      yourcats[i].rper +
      " - " +
      yourcats[i].bloodtype +
      "<br>" +
      yourcats[i].physical +
      "<br>" +
      yourcats[i].traits +
      "<br>Zodiac: " +
      yourcats[i].zodiac +
      "<br><br>";
    document.getElementById("archivechars").innerHTML +=
      "<button onclick=\"reviveCharacter('" +
      String(yourcats[i].name) +
      "' )\"> Re-Add Cat </button>" +
      "<br><br>";
  }

  
  // hide current cats and show the archived cats
  document.getElementById("archivechars").style.display = "block";
  document.getElementById("archivechars").style.margin = "0px 0px 0px 0px";
}

function hideArchive() {
  document.getElementById("archivechars").style.display = "none";
}

var archive = false;

function toggleArchive() {
  if (archive == false) {
    showArchive();
    archive = true;
  } else {
    archive = false;
    hideArchive();
  }
}


// Blood Types Calculator 
const diamondParent = [15, 45, 75, 1.3];
const emeraldParent = [15, 35, 85, 0.99];
const amethystParent = [15, 70, 95, 1.05];
const amberParent = [45, 70, 85, 0.95];
const unknownParent = [25, 50, 75, 1];

var random;
var max;
var max = 99;

function callme() {
  parentOne = document.getElementById("parentOne").value;
  parentTwo = document.getElementById("parentTwo").value;

  function randomRoll() {
    random = Math.floor(Math.random() * max);
    return random;
  }

  function parentBlood(parentOne) {
    if (parentOne == "Diamond") {
      return diamondParent;
    } else if (parentOne == "Emerald") {
      return emeraldParent;
    } else if (parentOne == "Amethyst") {
      return amethystParent;
    } else if (parentOne == "Amber") {
      return amberParent;
    } else {
      return unknownParent;
    }
  }

  function parentBlood2(parentTwo) {
    if (parentTwo == "Diamond") {
      return diamondParent;
    } else if (parentTwo == "Emerald") {
      return emeraldParent;
    } else if (parentTwo == "Amethyst") {
      return amethystParent;
    } else if (parentTwo == "Amber") {
      return amberParent;
    } else {
      return unknownParent;
    }
  }

  y = randomRoll() * parentBlood(parentOne)[3] * parentBlood2(parentTwo)[3];

  function bloodType(y, parentOne, parentTwo) {
    if (y < (parentOne[0] + parentTwo[0]) / 2) {
      return "Amber Blood";
    } else if (y < (parentOne[1] + parentTwo[1]) / 2) {
      return "Amethyst Blood";
    } else if (y < (parentOne[2] + parentTwo[2]) / 2) {
      return "Emerald Blood";
    } else {
      return "Diamond Blood";
    }
  }

  const bloodtype = bloodType(
    y,
    parentBlood(parentOne),
    parentBlood(parentTwo)
  );

  return bloodtype;
}


//Page Tabs
function openView(evt, viewName) {
  var i, tabcontent, viewlinks;
  viewcharacters = document.getElementsByClassName("viewcharacters");
  for (i = 0; i < viewcharacters.length; i++) {
    viewcharacters[i].style.display = "none";
  }
  viewlinks = document.getElementsByClassName("viewlinks");
  for (i = 0; i < viewlinks.length; i++) {
    viewlinks[i].className = viewlinks[i].className.replace(" active", "");
  }
  document.getElementById(viewName).style.display = "block";
  evt.currentTarget.className += " active";

  if (viewName == "archive" || viewName == "sol-statistics") {
    document.getElementById("filter").style.display = "none";
    document.getElementById("username1").style.display = "none";
  }

  if (viewName == "allegiances" || viewName == "gallery") {
    document.getElementById("filter").style.display = "block";
    document.getElementById("username1").style.display = "block";
  }
}


// Get the element with id="gallery" and click on it
document.getElementById("defaultopen").click();


//Display more  character information on click
function displaycatonclick(solscharactername) {
  for (i = 0; i < chars.length; i++) {
    if (
      chars[i].name.includes(solscharactername) &&
      chars[i].status == "Pending"
    ) {
      document.getElementById("current-character-name").innerHTML =
        chars[i].name;
      document.getElementById("current-character-bio").innerHTML =
        chars[i].physical;
      document.getElementById("current-character-traits").innerHTML =
        chars[i].traits;
      document.getElementById("current-character-username").innerHTML =
        chars[i].rper;
      document.getElementById("current-character-rank").innerHTML =
        chars[i].rank;
      document.getElementById("current-character-bloodtype").innerHTML =
        chars[i].bloodtype;
      document.getElementById("current-character-powers").innerHTML =
        chars[i].power;
      document.getElementById(
        "current-character"
      ).style.cssText += `background-image:url("https://wallpaperaccess.com/full/3932353.jpg")`;
    } else if (chars[i].name.includes(solscharactername)) {
      let currentimage = chars[i].characterimage;
      document.getElementById("current-character-name").innerHTML =
        chars[i].name;
      document.getElementById("current-character-bio").innerHTML =
        chars[i].physical;
      document.getElementById("current-character-traits").innerHTML =
        chars[i].traits;
      document.getElementById("current-character-username").innerHTML =
        chars[i].rper;
      document.getElementById("current-character-rank").innerHTML =
        chars[i].rank;
      document.getElementById("current-character-bloodtype").innerHTML =
        chars[i].bloodtype;
      document.getElementById("current-character-powers").innerHTML =
        chars[i].power;
      document.getElementById(
        "current-character"
      ).style.cssText += `background-image:url(${currentimage})`;
    }
  }
}

function openInNewTab(url) {
  window.open(url, "_blank").focus();
}





