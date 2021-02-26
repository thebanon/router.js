String.prototype.router = async function (a) {
  //auth.user() ?
  //document.body.dataset.uid = auth.user().uid :
  //(document.body.dataset.uid ? document.body.removeAttribute('uid') : null);
  var path = this.toString();
  var paths = rout.e(path);
  var root = paths.GOT[0];

  console.log('router:paths',{ paths });
  document.body.dataset.page = paths.page;
  document.body.dataset.path = paths.path;

  return new Promise(function (resolve, reject) {
    if (path) {
      m && m.v ? m.v(path)
        .then((state) => { //console.log(state.path,url);

          var m = window.location.origin;
          var url = new URL(state.path, m);
          var search = url.search;
          var path = url.pathname.replace(/\/?$/, "/");

          if (root) {
            document.body.dataset.root = root;
          } else {
            document.body.removeAttribute("data-root");
          }

          var hash = (url.hash ? url.hash : paths.page);
          var state = (url.search ? url.search : window.location.search) + hash;
          document.body.classList.contains("loading") ? document.body.classList.remove("loading") : null;

          if(window.location.protocol === "https:") {
            var state = path+state;
            history.pushState(state,document.head.find('title').textContent,state);
            rout.es.push(state);
          }
          else if(window.location.protocol === "file:") {
            localStorage.state = paths.path;
            var title = document.head.find('title').textContent;
            var state = '#'+paths.path;        
            history.pushState(state,title,state); //console.log({hash,title});
            rout.es.push(state);
          }
          
          $(document.querySelectorAll('.active[data-page]')).removeClass('active');
          var page = document.body.find('[data-page="'+paths.page+'"]');
          if(page) { 
            page.classList.add('active');
            page.dataset.path = paths.path;
          }
          window.GET = paths.GOT;
          resolve(paths);
        })
        .catch((e) => {
          //alert(404);
          console.log(404, e);
          reject(e);
        }) : resolve(paths);
    } else {
      reject({ code: 400, message });
    }
  });
};

window.rout = {};
window.rout.e = (state) => {
  //console.log({state});
  var GOT = rout.ed.dir(state, 2);
  var n = 0,
    arr1 = [],
    arr2 = rout.ed.dir(state);
  var root = GOT[0];
  if (GOT.length > 0) {
    do {
      var m = GOT[n];
      if (window.rout.ing(GOT, n)) {
        arr1[n] = "*";
      } else {
        arr1[n] = m;
      }
      n++;
    } while (n < GOT.length);
  }
  var data = {
    GOT: arr2,
    page: rout.ed.url(arr1),
    path: rout.ed.url(rout.ed.dir(state.replace("#", ""), 0))
  };
  return data;
};
window.rout.ed = {
  dir: (url, num, g = []) => {
    url.split("/").forEach((a, i) => {
      g[i] = a;
    });
    g[0] === "" ? g.shift() : null;
    g[g.length - 1] === "" ? g.pop() : null;
    return g;
  },
  url: (dir) => {
    return dir.length === 0 ? "/" : "/" + dir.join("/") + "/";
  }
};
window.rout.ing = (GOT, n) => {
  return false;
};
window.rout.es = [];
